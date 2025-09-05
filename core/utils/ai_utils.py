# import pinecone
from utils.apis import get_weather,get_soil_detail
import google.generativeai as genai
from django.conf import settings
from utils.prompts import prompt_builder
import re

GEMINI_API_KEY = settings.GEMINI_API_KEY
client = genai.configure(api_key =GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.5-flash")

def askAi(prompt):
    response = model.generate_content(prompt)
    raw_text = response.text

    # Remove ```json ... ``` wrappers if present
    cleaned_text = re.sub(r"^```json|```$", "", raw_text.strip(), flags=re.MULTILINE).strip()

    try:
        import json
        return json.loads(cleaned_text)  # Parse into real JSON
    except Exception:
        return cleaned_text  # Fallback if it's not valid JSON


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
      weather_data = get_weather(lat, lon)
      soil_data = get_soil_detail(lat, lon)
      return {**weather_data, **soil_data}


def context_builder(context_json):
    weather = context_json.get("weather", {})
    soil = context_json.get("soil", {})
    return (
        f"Weather conditions:\n"
        f"- Current Temp: {weather.get('temperature', {}).get('current')}°C\n"
        f"- Min Temp: {weather.get('temperature', {}).get('min')}°C\n"
        f"- Max Temp: {weather.get('temperature', {}).get('max')}°C\n"
        f"- Precipitation: {weather.get('precipitation')}\n\n"
        f"Soil Information:\n"
        f"- Dominant Soil Types: {soil.get('Dominant_Soil_Types')}\n"
        f"- District: {soil.get('district')}\n"
    )
