from django.urls import path
from . import views
from .views import WeatherData, SoilData, CropRecommendation, DistrictInfo ,AgriChatBot

urlpatterns = [
    path('weather/', views.WeatherData.as_view(), name='get_weather_data'),
    path('soil/', views.SoilData.as_view(), name='get_soil_data'),
    path('crops/', views.CropRecommendation.as_view(), name='get_crop_recommendation'),
    path('chatbot/', views.AgriChatBot.as_view(), name="get_chat_response"),
    # path('district-info/', views.DistrictInfo.as_view(), name='get_district_info'),
]
