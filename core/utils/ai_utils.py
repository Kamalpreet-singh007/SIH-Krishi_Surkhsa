# import pinecone
from utils.apis import get_wheather,get_soil_detail
import google.generativeai as genai
from django.conf import settings
from utils.prompts import prompt_builder



GEMINI_API_KEY = settings.GEMINI_API_KEY
client = genai.configure(api_key =GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.5-flash")

def askAi(prompt):
    response = model.generate_content(prompt)
    print(response)
    return response.text


def get_crop_recomendation(user_query ,prompt_type,lon, lat):
      context_json = get_context_json(lon, lat)
      context = context_builder(context_json)
      memory = ""  # Placeholder for memory, can be expanded later
      prompt = prompt_builder(context, memory, user_query, prompt_type, lon, lat)
      # print(prompt)
      
      # stearm implement
      response={}
      response = askAi(prompt)
      return response

def get_chat_response(user_query, prompt_type, lon, lat):
     context_json = get_context_json(lon, lat)
     context = context_builder(context_json)
     memory = ""  # Placeholder for memory, can be expanded later
     prompt = prompt_builder(context, memory, user_query, prompt_type, lon, lat)
     response = askAi(prompt)
     return response



def get_context_json( lat, lon):
      weather_data = get_wheather(lat, lon)
      soil_data = get_soil_detail(lat, lon)
      return {**weather_data, **soil_data}
    
   
def context_builder(context_json):
     return str(context_json)
     