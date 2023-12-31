const {
  ChatPromptTemplate,
  MessagesPlaceholder,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} = require('langchain/prompts');

const { LLMChain } = require('langchain/chains');
const { ChatOpenAI } = require('langchain/chat_models');
const { ConversationBufferMemory } = require('langchain/memory');

class GPTChatWrapper {
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
    this.memory = new ConversationBufferMemory({ max_history: 8 });
    this.conversation_history = [];
  }

  run() {
    const prompt = ChatPromptTemplate.from_messages([
      SystemMessagePromptTemplate.from_template(this._specify_system_message()),
      MessagesPlaceholder({ variable_name: "history" }),
      HumanMessagePromptTemplate.from_template(`${this.user_input}`)
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
  }

  _specify_system_message() {
    const exchange_counts_dict = {
      Short: { Conversation: 8, Debate: 4 },
      Long: { Conversation: 16, Debate: 8 }
    };
    const exchange_counts = this.session_length === 'Short' ? 8 : 16;

    console.log(this.name);

    let language_proficiency;

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
  }
}

// Extract parameters from command line arguments
const role = process.argv[2];
const name = process.argv[3];
const session_length = process.argv[4];
const language = process.argv[5];
const proficiency = process.argv[6];
const topic = process.argv[7];
const mode = process.argv[8];
const starter = process.argv[9];
const user_input = process.argv[10];

// Initialize GPTChatWrapper and run the conversation
const gpt_chat_wrapper = new GPTChatWrapper(role, name, session_length, language, proficiency, topic, mode, starter, user_input);
const response = gpt_chat_wrapper.run();

// Print the response or handle it as needed
console.log(response);