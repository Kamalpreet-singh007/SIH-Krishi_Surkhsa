from django.urls import path
from . import views

urlpatterns = [
    path('chatbot/', views.ChatBot.as_view(), name='chatbot'),
]