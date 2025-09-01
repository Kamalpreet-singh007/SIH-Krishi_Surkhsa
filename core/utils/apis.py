from django.conf import settings
# import requests
WHEATHER_API_KEY = settings.WHEATHER_API_KEY


def get_wheather(lat, lon):

    # url = "https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={WHEATHER_API_KEY}"

    # Response =  requests.get(url)
    # return Response.json()
    return {
  "location": {
    "city": "Chandigarh",
    "state": "Punjab",
    "country": "India",
    "latitude": 30.7333,
    "longitude": 76.7794
  },
  "weather": {
    "temperature": {
      "current": 32,
      "feels_like": 35,
      "min": 28,
      "max": 34,
      "unit": "°C"
    },
    "humidity": 65,
    "wind": {
      "speed": 10,
      "direction": "NE",
      "unit": "km/h"
    },
    "pressure": 1012,
    "visibility": 10,
    "uv_index": 7,
    "description": "Partly cloudy with a chance of rain"
  },
  "forecast": [
    {
      "day": "Monday",
      "min_temp": 27,
      "max_temp": 34,
      "description": "Sunny"
    },
    {
      "day": "Tuesday",
      "min_temp": 28,
      "max_temp": 33,
      "description": "Cloudy"
    },
    {
      "day": "Wednesday",
      "min_temp": 29,
      "max_temp": 35,
      "description": "Thunderstorms"
    }
  ]
}



def get_soil_detail(lat, lon):
    return {
  "location": {
    "city": "Chandigarh",
    "state": "Punjab",
    "country": "India",
    "latitude": 30.7333,
    "longitude": 76.7794
  },
  "soil_health": {
    "soil_type": "Loamy",
    "pH": 6.8,
    "organic_carbon": 0.75,
    "moisture": {
      "value": 25,
      "unit": "%"
    },
    "nutrients": {
      "nitrogen": {
        "value": 45,
        "unit": "kg/ha",
        "status": "Low"
      },
      "phosphorus": {
        "value": 18,
        "unit": "kg/ha",
        "status": "Medium"
      },
      "potassium": {
        "value": 210,
        "unit": "kg/ha",
        "status": "High"
      }
    },
    "salinity": {
      "ec": 0.8,
      "unit": "dS/m",
      "status": "Normal"
    },
    "recommendations": [
      "Add nitrogen-rich fertilizer",
      "Use organic compost to improve carbon levels",
      "Irrigate moderately to maintain moisture"
    ]
  }
}



