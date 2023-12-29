import os
import sys
import json
from dotenv import load_dotenv
from langchain.prompts import (
    ChatPromptTemplate,
    MessagesPlaceholder,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.chains import ConversationChain
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory




load_dotenv()

class GPTChatWrapper:
    def __init__(self, role, name, session_length, language, proficiency, topic, mode, starter, user_input):
        self.gpt_chat = ChatOpenAI(
                model_name="gpt-3.5-turbo",
                temperature=0.7)  
        self.role = role
        self.name = name
        self.session_length = session_length
        self.language = language
        self.proficiency = proficiency
        self.topic = topic
        self.mode = mode
        self.starter = starter
        self.user_input = user_input
        self.memory = ConversationBufferMemory(max_history=8)
        self.conversation_history = []

    def run(self):
        # Include history directly in the prompt
        prompt = ChatPromptTemplate.from_messages([
            SystemMessagePromptTemplate.from_template(self._specify_system_message()),
            MessagesPlaceholder(variable_name="history"),
            HumanMessagePromptTemplate.from_template(f"""{self.user_input}""")
        ])

        conversation_input = {
            'history': self.conversation_history,
            'input': self.user_input
        }


        conversation = LLMChain(
            prompt=prompt,
            llm=self.gpt_chat,
            verbose=False
        )

        response = conversation.predict(**conversation_input)

        # Update conversation history with the current interaction
        self.conversation_history.append({'role': self.role, 'message': self.user_input})
        
        return response

    



    def _specify_system_message(self):
        
        exchange_counts_dict = {
            'Short': {'Conversation': 8, 'Debate': 4},
            'Long': {'Conversation': 16, 'Debate': 8}
        }
        exchange_counts = 8 if self.session_length == 'Short' else 16
        
        print(self.name)
        
        # Determine number of arguments in one debate roun       
        if self.proficiency == "Beginner":
            language_proficiency = "Please express this idea using simple words and sentences, and avoid using idioms, slang, or complicated grammar."
        elif self.proficiency == "Intermediate":
            language_proficiency = "Please use a broader selection of words and mix up your sentence structures. Feel free to include some idioms and casual expressions, but steer clear of overly technical language or intricate literary expressions."
        elif self.proficiency == "Amateur":
            language_proficiency = "Please use advanced vocabulary, intricate sentence structures, idioms, colloquial expressions, and technical language when suitable."
        else:
            raise KeyError("Proficiency not found")

        if self.mode == 'Conversation':
            prompt = f"""You are an AI that is good at role-playing. 
            You are simulating a typical conversation happened {self.topic}. 
            In this scenario, you are playing as a {self.role[0]} {self.role[1]}, speaking to a 
            {self.name["name"]}.
            Your conversation should only be conducted in {self.language}. Do not translate.
            This simulated {self.topic} is designed for {self.language} language learners to learn real-life 
            conversations in {self.language}. You should assume the learners' proficiency level in 
            {self.language} is {self.proficiency}. Therefore, you should .
            You should finish the conversation within {exchange_counts} exchanges with the {self.name["name"]}. 
            Make your conversation with {self.name["name"]} natural and typical in the considered scenario in 
            {self.language} cultural. Keep the conversation going and try to avoid dead-end. maximum 25 words per exchange. Your conversation should only be conducted in {self.language}. Do not translate."""

            
        elif self.mode == "Debate":
            prompt = f"""{self.role} is a {self.name} who is {language_proficiency} in {self.language} and wants to debate about {self.topic}, max 30 words per exchange Your conversation should only be conducted in {self.language}. Do not translate."""
        elif self.mode == "Quiz":
            prompt = f"""{self.role} is a {self.name} who is {language_proficiency} in {self.language} and wants to quiz about {self.topic}"""
        elif self.mode == "Translation":
            prompt = f"""{self.role} is a {self.name} who is {language_proficiency} in {self.language} and wants to translate {self.topic}"""
        else:
            raise KeyError("Topic not found")

        if self.starter:
            prompt += f'You are leading the {self.topic}'
        else:
            prompt += f"Wait for {self.name['name']}'s statement."

        return prompt

if __name__ == "__main__":
    # Extract parameters from command line arguments
    role = sys.argv[1]
    name = sys.argv[2]
    session_length = sys.argv[3]
    language = sys.argv[4]
    proficiency = sys.argv[5]
    topic = sys.argv[6]
    mode = sys.argv[7]
    starter = sys.argv[8]
    user_input = sys.argv[9]

    
    # Initialize GPTChatWrapper and run the conversation
    gpt_chat_wrapper = GPTChatWrapper(role, name, session_length, language, proficiency, topic, mode, starter, user_input)
    response = gpt_chat_wrapper.run()
    
    # Print the response or handle it as needed
    print(response)

