from django.shortcuts import render
from rest_framework import ApiView
# Create your views here.


class getWheatherData(ApiView):
    def get(self, request):
        return render(request, 'wheather.html')

class getSoilData(ApiView):
    def get(self, request ):
        pass

class getCropRecommendation(ApiView):
    pass