import { ChatOpenAI } from 'langchain/chat_models/openai';
import { PromptTemplate, MessagesPlaceholder, SystemMessagePromptTemplate, HumanMessagePromptTemplate } from 'langchain/prompts';
import { LLMChain } from 'langchain/chains';
import { ChatMessageHistory } from 'langchain/memory';
import { ChatPromptTemplate } from 'langchain/prompts';



function formatConvHistory(messages) {
  return messages.map((message, i) => {
      if (i % 2 === 0){
          return `Human: ${message}`
      } else {
          return `AI: ${message}`
      }
  }).join('\n')
}

export class GPTChatWrapper {


  constructor( role, name, session_length, language, proficiency, topic, mode, starter, user_input) {
    // Initialize your GPT model and other necessary variables
    this.llm = new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY });
    this.conversationHistory = [];

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

  }

  async progressConversation(question) {
    try {
      // Add user message to conversation history
      this.addToConversationHistory('User', question);

      // Run the conversation logic
      const response = await this.runConversation(question);

      // Add AI response to conversation history
      this.addToConversationHistory('AI', response);

      // Return or do something with the response
      return response;
    } catch (error) {
      console.error("Error in GPTChatWrapper:", error.message);
      // Log additional details if needed
      console.log("Error details:", error);
      throw error; // Re-throw the error for handling at a higher level, if needed
    }
  }

  async runConversation(question) {
    // Build the prompt template for the conversation
    const conversationPrompt = this.buildConversationPrompt(question);

    // Run the conversation using the GPT model
    const result = await this.llm.predict(conversationPrompt);

    // Extract and return the AI response
    return result.answer; // Adjust this based on the actual structure of the response
  }


  buildConversationPrompt(question) {
    // Build the conversation prompt based on the user question
    const standaloneQuestionTemplate = `Given some conversation history (if any) and a question, convert the question to a standalone question. 
      conversation history: {conv_history}
      question: {question} 
      standalone question:`;

    const standaloneQuestionPrompt = PromptTemplate.fromTemplate(standaloneQuestionTemplate);

    // Return the constructed prompt
    return standaloneQuestionPrompt.toString({ conv_history: formatConvHistory(this.getConversationHistory()), question });
  }

  addToConversationHistory(role, message) {
    // Add a message to the conversation history
    this.getConversationHistory().push({ role, message });
  }

  getConversationHistory() {
    // Return the conversation history array
    return this.conversationHistory || (this.conversationHistory = []);
  }


   run(question) {
    // Build the conversation prompt based on the user question and system message
    const systemMessageTemplate = this._specify_system_message();
    const standaloneQuestionTemplate = `Given some conversation history (if any) and a question, convert the question to a standalone question. 
      conversation history: {conv_history}
      question: {question} 
      standalone question:`;

    const standaloneQuestionPrompt = PromptTemplate.fromTemplate(standaloneQuestionTemplate);

    // Return the constructed prompt
    return ChatPromptTemplate.fromMessages([
      systemMessageTemplate,
      new MessagesPlaceholder({ variable_name: "history" }),
      standaloneQuestionPrompt,
    ]).toString({ conv_history: formatConvHistory(this.getConversationHistory()), question });
  }


  _specify_system_message() {
    try {
      const exchange_counts_dict = {
        Short: { Conversation: 8, Debate: 4 },
        Long: { Conversation: 16, Debate: 8 }
      };
      const exchange_counts = this.session_length === 'Short' ? 8 : 16;

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
            In this scenario, you are playing as an AI, speaking to a
            ${this.name ? this.name : "Human"}.
            Your conversation should only be conducted in ${this.language}. Do not translate.
            This simulated ${this.topic} is designed for ${this.language} language learners to learn real-life
            conversations in ${this.language}. You should assume the learners' proficiency level in
            ${this.language} is ${this.proficiency}. Therefore, you should .
            You should finish the conversation within ${exchange_counts} exchanges with the ${this.name ? this.name : "Human"}.
            Make your conversation with ${this.name ? this.name : "Human"} natural and typical in the considered scenario in
            ${this.language} cultural. Keep the conversation going and try to avoid dead-end. maximum 25 words per exchange. Your conversation should only be conducted in ${this.language}. Do not translate.`;
          break;
        case "Debate":
          prompt = `${this.role} is a ${this.name ? this.name : "john"} who is ${language_proficiency} in ${this.language} and wants to debate about ${this.topic}, max 30 words per exchange Your conversation should only be conducted in ${this.language}. Do not translate.`;
          break;
        default:
          throw new Error("Topic not found");
      }

      return new SystemMessagePromptTemplate({ message: prompt });
    } catch (error) {
      console.error("Error in GPTChatWrapper:", error.message);
      throw error; // Re-throw the error for handling at a higher level, if needed
    }
  }
}

// Rest of the code remains the same
