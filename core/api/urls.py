from django.urls import path
from . import views

urlpatterns = [
    path('wheather/', views.WheatherData.as_view(), name='get_wheather_data'),
    path('soil', views.SoilData.as_view(), name='get_soil_data'),
    path('crops', views.CropRecommendation.as_view(), name='get_crop_recommendation'), 

]