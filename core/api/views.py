# from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response as drfResponse
from utils.apis import get_weather,get_soil_detail
from utils.ai_utils import get_crop_recomendation , get_chat_response
from rest_framework import status
from utils.district_utils import get_district_info, get_district_from_coordinates
from datetime import date , timedelta


# Create your views here.
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
            data = get_weather(float(lat), float(lon))
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
            response = get_crop_recomendation(user_query ="", prompt_type="CROP_RECOMMENDATION", lon=lon, lat=lat)
        except Exception as e:
            return drfResponse({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return drfResponse(response, status=status.HTTP_200_OK)

class AgriChatBot(APIView):
    def post(self, request):
        try:
            user_query = request.data.get("user_query")
            lat = request.data.get("latitude")
            lon = request.data.get("longitude")
            prompt_type = request.data.get("prompt_type", "AGRI_CHATBOT")

            if not user_query:
                return drfResponse({"error": "user_query is required"}, status=status.HTTP_400_BAD_REQUEST)

            response = get_chat_response(user_query, prompt_type, lon, lat)
            return drfResponse({"response": response}, status=status.HTTP_200_OK)

        except Exception as e:
            return drfResponse({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)