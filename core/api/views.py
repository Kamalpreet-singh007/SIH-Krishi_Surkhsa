# from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response as drfResponse
from utils.apis import get_wheather,get_soil_detail
from utils.ai_utils import get_crop_recomendation
from rest_framework import status 
# Create your views here.


class WheatherData(APIView):
    def post(self, request):
        lon =request.data.get('longitude')
        lat =request.data.get('latitude')
        try:
            data = get_wheather(lat, lon)
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