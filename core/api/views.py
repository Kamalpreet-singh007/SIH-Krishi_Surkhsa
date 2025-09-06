# from django.shortcuts import render
import asyncio
from rest_framework.views import APIView, View
from rest_framework.response import Response as drfResponse
from utils.apis import get_weather,get_soil_detail, get_weather_current
from utils.ai_utils import get_crop_recomendation

from utils.district_utils import get_district_from_coordinates, get_district_info

from rest_framework import status 
# Create your views here.

class CurrentWeather(APIView):
    def post(self, request):
        lon =request.data.get('longitude')
        lat =request.data.get('latitude')
        try:
            data = asyncio.run(get_weather_current(lat, lon))
        except Exception as e:
            return drfResponse({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return drfResponse(data, status=200)

class DistrictInfo(APIView):
    def post(self, request):
        lon = request.data.get('longitude')
        lat = request.data.get('latitude')

        try:
            # Step 1: Convert coordinates → district
            district_name = get_district_from_coordinates(float(lat), float(lon))


            # Step 2: Fetch district info
            data = get_district_info(district_name)

        except Exception as e:
            return drfResponse({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return drfResponse(data, status=200)

class WeatherData(APIView):
    def post(self, request):
        lon =request.data.get('longitude')
        lat =request.data.get('latitude')
        try:
            data = asyncio.run(get_weather(lat, lon))
        except Exception as e:
            return drfResponse({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return drfResponse(data, status=200)


class SoilData(APIView):
    def post(self, request ):
        lon =request.data.get('longitude')
        lat =request.data.get('latitude')
        try:
            data = get_soil_detail(lat, lon)
        except Exception as e:
            return drfResponse({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return drfResponse(data, status=200)

class CropRecommendation(APIView):
    def post(self, request):
        try:
            lon =request.data.get('longitude')
            lat =request.data.get('latitude')
            response =  get_crop_recomendation(user_query ="", prompt_type="CROP_RECOMMENDATION", lon=lon, lat=lat)
            return response
        except Exception as e:
            return drfResponse({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
