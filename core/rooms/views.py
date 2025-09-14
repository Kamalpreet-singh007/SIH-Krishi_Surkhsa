from rest_framework import response as drfResponse
from rest_framework.views import APIView
from rest_framework import status
from utils.ai_utils import get_chat_response


class ChatBot(APIView):
    def post(self, request):
        user_query = request.data.get("user_query")
        lon = request.data.get("longitude")
        lat = request.data.get("latitude")
        prompt_type = "AGRI_CHATBOT"

        response = get_chat_response(user_query, prompt_type, lon, lat)
        return response
   


