import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "@langchain/core/prompts";

import { LLMChain } from 'langchain/chains';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { ChatMessageHistory } from 'langchain/memory';

export class GPTChatWrapper {
  constructor(role, name, session_length, language, proficiency, topic, mode, starter, user_input) {
    this.gpt_chat = new ChatOpenAI({
      model_name: "gpt-3.5-turbo",
      temperature: 0.7
    });
    this.role = role;
    this.name = name;
    this.session_length = session_length;
    this.language = language;
    this.proficiency = proficiency;
    this.topic = topic;
    this.mode = mode;
    this.starter = starter;
    this.user_input = user_input;
    this.memory = new ChatMessageHistory({ max_history: 8 });
    this.conversation_history = [];
  }

  run() {
    try {
        console.log("_specify_system_message():", this._specify_system_message());
        console.log("user_input:", this.user_input)
        console.log("conversation_history:", this.conversation_history);

        const prompt = ChatPromptTemplate.fromMessages([
            SystemMessagePromptTemplate.fromTemplate(this._specify_system_message()),
            new MessagesPlaceholder({ variable_name: "history" }),
            HumanMessagePromptTemplate.fromTemplate(this.user_input.toString())
        ]);

        const conversation_input = {
            history: this.conversation_history,
            input: this.user_input
        };

        const conversation = new LLMChain({
            prompt: prompt,
            llm: this.gpt_chat,
            verbose: false
        });

        const response = conversation.predict(conversation_input);

        this.conversation_history.push({ role: this.role, message: this.user_input });

        return response;
    } catch (error) {
        console.error("Error in GPTChatWrapper:", error.message);
        throw error; // Re-throw the error for handling at a higher level, if needed
    }
}

  _specify_system_message() {
    try {
    const exchange_counts_dict = {
      Short: { Conversation: 8, Debate: 4 },
      Long: { Conversation: 16, Debate: 8 }
    };
    const exchange_counts = this.session_length === 'Short' ? 8 : 16;

    console.log(this.name);

    let language_proficiency;
    console.log(this.proficiency)
    switch (this.proficiency) {
      case "Beginner":
        language_proficiency = "Please express this idea using simple words and sentences, and avoid using idioms, slang, or complicated grammar.";
        break;
      case "Intermediate":
        language_proficiency = "Please use a broader selection of words and mix up your sentence structures. Feel free to include some idioms and casual expressions, but steer clear of overly technical language or intricate literary expressions.";
        break;
      case "Amateur":
        language_proficiency = "Please use advanced vocabulary, intricate sentence structures, idioms, colloquial expressions, and technical language when suitable.";
        break;
      default:
        throw new Error("Proficiency not found");
    }

    let prompt;

    switch (this.mode) {
      case 'Conversation':
        prompt = `You are an AI that is good at role-playing.
          You are simulating a typical conversation happened ${this.topic}.
          In this scenario, you are playing as a ${this.role[0]} ${this.role[1]}, speaking to a
          ${this.name["name"]}.
          Your conversation should only be conducted in ${this.language}. Do not translate.
          This simulated ${this.topic} is designed for ${this.language} language learners to learn real-life
          conversations in ${this.language}. You should assume the learners' proficiency level in
          ${this.language} is ${this.proficiency}. Therefore, you should .
          You should finish the conversation within ${exchange_counts} exchanges with the ${this.name["name"]}.
          Make your conversation with ${this.name["name"]} natural and typical in the considered scenario in
          ${this.language} cultural. Keep the conversation going and try to avoid dead-end. maximum 25 words per exchange. Your conversation should only be conducted in ${this.language}. Do not translate.`;
        break;
      case "Debate":
        prompt = `${this.role} is a ${this.name} who is ${language_proficiency} in ${this.language} and wants to debate about ${this.topic}, max 30 words per exchange Your conversation should only be conducted in ${this.language}. Do not translate.`;
        break;
      case "Quiz":
        prompt = `${this.role} is a ${this.name} who is ${language_proficiency} in ${this.language} and wants to quiz about ${this.topic}`;
        break;
      case "Translation":
        prompt = `${this.role} is a ${this.name} who is ${language_proficiency} in ${this.language} and wants to translate ${this.topic}`;
        break;
      default:
        throw new Error("Topic not found");
    }

    if (this.starter) {
      prompt += `You are leading the ${this.topic}`;
    } else {
      prompt += `Wait for ${this.name['name']}'s statement.`;
    }

    return prompt;
  } catch (error) {
    console.error("Error in GPTChatWrapper:", error.message);
    throw error; // Re-throw the error for handling at a higher level, if needed
  }
}
}

