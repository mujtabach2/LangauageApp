import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage, SystemMessage} from "langchain/schema";
import { SystemMessagePromptTemplate, HumanMessagePromptTemplate, ChatMessagePromptTemplate, ChatPromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

import * as dotenv from "dotenv";
dotenv.config();


export class GPTChatWrapper {

    constructor(role, name, session_length, language, proficiency, topic, mode, starter, input){
        
        this.role = role;
        this.name = name;
        this.session_length = session_length;
        this.language = language;
        this.proficiency = proficiency;
        this.topic = topic;
        this.mode = mode;
        this.starter = starter;
        this.input = input;

    }

    buildMessage(){
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
      
      
      
            switch (this.mode.toLowerCase()) {
              case 'conversation':
                prompt = `You are an AI that is good at role-playing.
                  You are simulating a typical conversation about ${this.topic}.
                  In this scenario, you are playing as an AI, speaking to a
                  ${this.name ? this.name : "Human"}.
                  Your conversation should only be conducted in ${this.language}. Do not translate.
                  This simulated conversation about ${this.topic} is designed for ${this.language} language learners to learn real-life
                  conversations in ${this.language}. You should assume the learners' proficiency level in
                  ${this.language} is ${this.proficiency}. Therefore, you should ${language_proficiency}.
                  You should finish the conversation within ${exchange_counts} exchanges with the ${this.name ? this.name : "Human"}.
                  Make your conversation with ${this.name ? this.name : "Human"} natural and typical in the considered scenario in
                  ${this.language} culture. Keep the conversation going and try to avoid dead-ends. Maximum 25 words per exchange. Your conversation should only be conducted in ${this.language}. Do not translate.`;
                break;
              case "debate":
                prompt = `${this.role} is a ${this.name ? this.name : "john"} who is ${language_proficiency} in ${this.language} and wants to debate about ${this.topic}, max 30 words per exchange Your conversation should only be conducted in ${this.language}. Do not translate.`;
                break;
              default:
                throw new Error(`Invalid mode: ${this.mode}`);
            }
      
            
            return  prompt ;
          }catch (error) {
            console.error("Error in GPTChatWrapper:", error.message);
            throw error; // Re-throw the error for handling at a higher level, if needed
          }
    }

    async run(){
        const model = new ChatOpenAI({
            temperature: 0.9,
            modelName: "gpt-3.5-turbo"
        });
        const Sysinput = this.buildMessage()

        const translatePrompt = ChatPromptTemplate.fromMessages([
            SystemMessagePromptTemplate.fromTemplate("{text}"),
            HumanMessagePromptTemplate.fromTemplate("{input}")
        ]);

        const chain = new LLMChain({
            prompt: translatePrompt,
            llm: model,
        });

        const res = chain.call({
            text: Sysinput,
            input: this.input
        })

       
        console.log(res);

        return res;

    }
}
