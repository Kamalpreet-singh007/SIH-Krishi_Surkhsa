from django.urls import path
from . import views

urlpatterns = [
    path('wheather/', views.getWheatherData, name='get_wheather_data'),
    path('soil', views.getSoilData, name='get_soil_data'),
    path('crops', views.getCropRecommendation, name='get_crop_recommendation'), 

]