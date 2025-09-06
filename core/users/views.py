# from django.shortcuts import render
from rest_framework.response import Response as DRFResponse
from rest_framework.views import APIView
from .models import User
from rest_framework import status

# Create your views here.

class userCrateView(APIView):
    def post(self,request):
        email = request.data.get("email")
        username = request.data.get("username")
        password = request.data.get("password")

        if not all([email,password]):
            return DRFResponse({"error":"Please provide all the details"},status=400)
        if User.objects.filter(username = username).exists():
            return DRFResponse({"error":"Email already exists"},status=400)
        

        User.objects.create_user(
            email=email,
            password=password,
            username=username,
        )
        return DRFResponse(
            {"message": "User registered successfully!"}, status=status.HTTP_201_CREATED
        )
        