from django.conf import settings
import requests
from datetime import datetime, date, timedelta
from utils.district_utils import get_district_from_coordinates, get_district_info
# WHEATHER_API_KEY = settings.WHEATHER_API_KEY

def get_weather(lat, lon):
    end_date = (datetime.utcnow().date() - timedelta(days=1)).isoformat()
    start_date = (datetime.utcnow().date() - timedelta(days=120)).isoformat()  # past 4 months

    url = (
        f"https://archive-api.open-meteo.com/v1/archive?"
        f"latitude={lat}&longitude={lon}"
        f"&start_date={start_date}&end_date={end_date}"
        f"&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto"
    )

    response = requests.get(url)
    data = response.json()

    forecast_list = []
    daily = data.get("daily", {})
    dates = daily.get("time", [])
    max_temps = daily.get("temperature_2m_max", [])
    min_temps = daily.get("temperature_2m_min", [])
    precipitation = daily.get("precipitation_sum", [])

    for i, date_str in enumerate(dates):
        date_obj = datetime.strptime(date_str, "%Y-%m-%d")
        day_name = date_obj.strftime("%A")
        forecast_list.append({
            "day": day_name,
            "min_temp": min_temps[i] if i < len(min_temps) else None,
            "max_temp": max_temps[i] if i < len(max_temps) else None,
            "precipitation": precipitation[i] if i < len(precipitation) else None,
            "description": "N/A"
        })

    # ✅ Find the latest valid index for current weather
    latest_index = len(dates) - 1
    while latest_index >= 0 and (
        max_temps[latest_index] is None or min_temps[latest_index] is None
    ):
        latest_index -= 1

    # Return UI-friendly JSON
    return {
        "location": {
            "latitude": lat,
            "longitude": lon
        },
        "weather": {
            "temperature": {
                "current": max_temps[latest_index] if latest_index >= 0 else None,
                "min": min_temps[latest_index] if latest_index >= 0 else None,
                "max": max_temps[latest_index] if latest_index >= 0 else None,
                "unit": "°C"
            },
            "description": "Weather data from Open-Meteo",
            "precipitation": precipitation[latest_index] if latest_index >= 0 else None
        },
        "forecast": forecast_list
    }



def get_soil_detail(lat, lon):
    # Get district name from coordinates
    district_name = get_district_from_coordinates(lat, lon)

    # Get soil info from district
    soil_info = get_district_info(district_name)
    return soil_info
