from django.conf import settings
import asyncio
from django.utils import timezone
from dateutil.relativedelta import relativedelta
from utils.district_utils import get_district_from_coordinates, get_district_info
import requests
WEATHER_API_KEY = settings.WEATHER_API_KEY



wheather_context ={}

async def get_weather_current(lat, lon):
  url = f'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={WEATHER_API_KEY}'
  response = requests.get(url)
  return response.json()

async def get_weather(lat, lon):
  
  current_time = timezone.now()
  past_time = current_time - relativedelta(months = 6) 
  global wheather_context
  if wheather_context     :
    return wheather_context
  
  url = f'https://archive-api.open-meteo.com/v1/archive?latitude={lat}&longitude={lon}&start_date={past_time.date()}&end_date={current_time.date()}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto'
  # url = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={WEATHER_API_KEY}&units=metric"
  Response =  requests.get(url)
  wheather_context = Response.json()
  return Response.json()
  


async def get_soil_detail(lat, lon):


  district = get_district_from_coordinates(lat, lon)
  data =  get_district_info(district)
  return data
    
    
    
    
    
    


