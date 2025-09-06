from django.urls import path
from . import views

urlpatterns = [
    path('wheather/', views.WeatherData.as_view(), name='get_wheather_data'),
    path('soil', views.SoilData.as_view(), name='get_soil_data'),
    path('crops', views.CropRecommendation.as_view(), name='get_crop_recommendation'), 
    path('wheather/current', views.CurrentWeather.as_view(), name = 'get_current_wheather_data')

]