import os 
import openai

# over here we will be using the openai api to generate the chat
# we will be using the gpt-3.5-turbo engine to generate the chat
# we will then translate the chat to the language of the user
# we will then send the chat to the user

class GPTChat:
    
   def input(self, role, user_role, language, proficiency, topic, mode):
       self.role = role
       self.user_role = user_role
       self.language = language
       self.proficiency = proficiency
       self.topic = topic
       self.mode = mode
       
       print("role: " + self.role)