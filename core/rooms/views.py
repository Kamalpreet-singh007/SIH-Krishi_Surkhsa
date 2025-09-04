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

        try:
            response = get_chat_response(user_query, prompt_type, lon, lat)
        except Exception as e:
            return drfResponse.Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return drfResponse.Response({"response": response}, status=status.HTTP_200_OK)
