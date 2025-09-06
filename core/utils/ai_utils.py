# import pinecone
from utils.apis import get_soil_detail
import asyncio
from django.http import StreamingHttpResponse
import google.generativeai as genai
from django.conf import settings
from utils.prompts import prompt_builder
from utils.apis import get_weather


GEMINI_API_KEY = settings.GEMINI_API_KEY
client = genai.configure(api_key =GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.5-flash")

def askAi(prompt):
    def response_generator():
        # Initiate streaming from the AI model
        response_stream = model.generate_content(
            contents=prompt,
            stream = True
        )
        # Yield each chunk as soon as it arrives
        for chunk in response_stream:
            yield chunk.text

    return StreamingHttpResponse(response_generator(), content_type="text/plain")


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



def get_context_json(lat, lon):
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    weather_data, soil_data = loop.run_until_complete(
    asyncio.gather(
        get_weather(lat, lon),
        get_soil_detail(lat, lon)
    )
)
    print(soil_data)
    loop.close()
    return {**weather_data, **soil_data}
   

def context_builder(context_json):
     return str(context_json)
