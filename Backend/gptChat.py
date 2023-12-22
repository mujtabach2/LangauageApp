import os 
import openai
from langchain.prompts import(
    ChatPromptTemplate,
    MessagesPlaceholder,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)
from langchain.chains import ConversationChain
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
import sys
from dotenv import load_dotenv
load_dotenv()

# over here we will be using the openai api to generate the chat
# we will be using the gpt-3.5-turbo engine to generate the chat
# we will then translate the chat to the language of the user
# we will then send the chat to the user

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

   def instruction(self, role, user_role, language, proficiency, topic, mode, starter):
       self.role = role
       self.user_role = user_role
       self.language = language
       self.proficiency = proficiency
       self.topic = topic
       self.mode = mode
       self.starter = starter
       
       
       prompt = ChatPromptTemplate.from_messages([
            SystemMessagePromptTemplate.from_template(self._specify_system_message()),
            MessagesPlaceholder(variable_name="history"),
            HumanMessagePromptTemplate.from_template("""{input}""")
       ])
       
       self.conversation = ConversationChain(memory = self.memory, prompt = prompt,
                                             llm = self.llm,verbose = False)
       
       
   def _specify_system_message(self):
       if self.proficiency == "Beginner":
           language_proficiency = """"""
       elif self.proficiency == "Intermediate":
           language_proficiency = """"""
       elif self.proficiency == "Advanced":
           language_proficiency = """"""
       else:
           raise KeyError("Proficiency not found")
        
       if self.topic == "Conversation":
            prompt = """{role} is a {user_role} who is {language_proficiency} in {language} and wants to talk about {topic}"""
       elif self.topic == "Debate":
            prompt = """{role} is a {user_role} who is {language_proficiency} in {language} and wants to debate about {topic}"""
       elif self.topic == "Quiz": 
           prompt = """{role} is a {user_role} who is {language_proficiency} in {language} and wants to quiz about {topic}"""
       elif self.topic == "Translation":
              prompt = """{role} is a {user_role} who is {language_proficiency} in {language} and wants to translate {topic}"""
       else:
              raise KeyError("Topic not found")
          
       if self.starter:
              prompt += f'You are the leading the {self.topic}'
       else:
              prompt += f"Wait for the {self.user_role['name']}'s statement."
              
       print(prompt)
       return prompt 
   
def main(role, user_role, language, proficiency, topic, mode, starter, user_input):
    # Instantiate the GPTChat class with the OpenAI engine
    chatbot = GPTChat(engine="OpenAI")

    # Provide instructions to the chatbot
    chatbot.instruction(role, user_role, language, proficiency, topic, mode, starter)

    # Simulate a conversation round
    response = chatbot.conversation.predict(input=user_input)

    # Return the conversation output
    return response

