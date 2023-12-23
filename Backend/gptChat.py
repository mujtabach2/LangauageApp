import os
import sys
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

class GPTChat:
    def __init__(self, engine):
        try:
            if engine == "OpenAI":
                self.llm = ChatOpenAI(
                    model_name="gpt-3.5-turbo",
                    temperature=0.7
                )
            else:
                raise KeyError("Engine not found")

            self.memory = ConversationBufferMemory(return_messages=True)

        except Exception as e:
            print(f"An error occurred during GPTChat initialization: {e}")
            sys.exit(1)  # Exit the script with an error code

    def instruction(self, role, user_role ,session_length, language, proficiency, topic, mode, starter, user_input):
        self.role = role
        self.user_role = user_role
        self.language = language
        self.proficiency = proficiency
        self.topic = topic
        self.mode = mode
        self.starter = starter
        self.session_length = session_length
        self.user_input = user_input

        prompt = ChatPromptTemplate.from_messages([
            SystemMessagePromptTemplate.from_template(self._specify_system_message()),
            MessagesPlaceholder(variable_name="history"),
            HumanMessagePromptTemplate.from_template("""{input}""")
        ])

        self.conversation = ConversationChain(
            memory=self.memory,
            prompt=prompt,
            llm=self.llm,
            verbose=False
        )
        
        return self.conversation.predict(history=[], input=user_input)

# ...

    def _specify_system_message(self):
        
        exchange_counts_dict = {
            'Short': {'Conversation': 8, 'Debate': 4},
            'Long': {'Conversation': 16, 'Debate': 8}
        }
        exchange_counts = exchange_counts_dict[self.session_length][self.topic]
        
        # Determine number of arguments in one debate round
        argument_num_dict = {
            'Beginner': 4,
            'Intermediate': 6,
            'Advanced': 8
        }        
        if self.proficiency == "Beginner":
            language_proficiency = ""
        elif self.proficiency == "Intermediate":
            language_proficiency = ""
        elif self.proficiency == "Advanced":
            language_proficiency = ""
        else:
            raise KeyError("Proficiency not found")

        if self.topic == 'Conversation':
            prompt = f"""You are an AI that is good at role-playing. 
            You are simulating a typical conversation happened {self.topic}. 
            In this scenario, you are playing as a {self.role[0]} {self.role[1]}, speaking to a 
            {self.user_role["name"]}.
            Your conversation should only be conducted in {self.language}. Do not translate.
            This simulated {self.topic} is designed for {self.language} language learners to learn real-life 
            conversations in {self.language}. You should assume the learners' proficiency level in 
            {self.language} is {self.proficiency}. Therefore, you should .
            You should finish the conversation within {exchange_counts} exchanges with the {self.user_role["name"]}. 
            Make your conversation with {self.user_role["name"]} natural and typical in the considered scenario in 
            {self.language} cultural."""

            
        elif self.topic == "Debate":
            prompt = f"""{self.role} is a {self.user_role} who is {language_proficiency} in {self.language} and wants to debate about {self.topic}"""
        elif self.topic == "Quiz":
            prompt = f"""{self.role} is a {self.user_role} who is {language_proficiency} in {self.language} and wants to quiz about {self.topic}"""
        elif self.topic == "Translation":
            prompt = f"""{self.role} is a {self.user_role} who is {language_proficiency} in {self.language} and wants to translate {self.topic}"""
        else:
            raise KeyError("Topic not found")

        if self.starter:
            prompt += f'You are leading the {self.topic}'
        else:
            prompt += f"Wait for {self.user_role['name']}'s statement."

        return prompt

def main(role, user_role, language, session_length, proficiency, topic, mode, starter, user_input):
    chatbot = GPTChat(engine="OpenAI")

    # Create a list of messages for the 'history' key
    response = chatbot.instruction(role, user_role, session_length, language, proficiency, topic, mode, starter, user_input)

    print(response)
    # Get the chatbot's respons
    return response


if __name__ == "__main__":
    role = "Speaker"
    user_role = {"name": "Listener"}
    language = "English"
    proficiency = "Intermediate"
    session_length = "Short"
    topic = "Conversation"
    mode = "Interactive"
    starter = True
    user_input = "Hello, how are you?"
    learning_mode = "Conversation"

    response = main(role, user_role, language,session_length, proficiency, topic, mode, starter, user_input)

    print("Chatbot Response:", response)
