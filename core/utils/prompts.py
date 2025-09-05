

class PromptTypes:
    AGRI_CHATBOT = "AGRI_CHATBOT"
    CROP_RECOMMENDATION = "CROP_RECOMMENDATION"


AGRI_CHATBOT_PROMPT = """
      You are an agricultural chatbot for India. I will provide you with data about the weather and soil conditions of a location along with the user's query. Based on this data, you must give the best possible answer to the user's query.

Please respond in Hindi or English depending on the language of the user's query.

If the query is unrelated to agriculture, politely refuse to answer in the language of user's query

{context}:
User query:
{query}

The user asked in Hindi, so respond only in Hindi.
Provide the crop recommendations in structured JSON format, but all field values (season, soil type, notes, etc.) should be in Hindi.

"""

CROP_RECOMMENDATION_PROMPT = """
      i am giving you data about the weather and soil conditions of a location. Based on this data, you must recommend the best crops to grow in that location.
      {context}
      {query}
    The user asked in Hindi, so respond only in Hindi.
    Provide the crop recommendations in structured JSON format, but all field values (season, soil type, notes, etc.) should be in Hindi.

      the data must be a list of crops of  format i am providing below.
      crop format:
        Crop Name: <name>
        season: <season>
        soil type: <soil type>
        temperature range: <temperature range>
        rainfall range: <rainfall range>
        additional notes: <additional notes>

        Respond only with a valid JSON array. Do not include any explanation or extra text.


"""

prompt_to_type_map = {
    PromptTypes.AGRI_CHATBOT: AGRI_CHATBOT_PROMPT,
    PromptTypes.CROP_RECOMMENDATION: CROP_RECOMMENDATION_PROMPT
}

def prompt_builder(context, memory, user_query, prompt_type, lon, lat):
    chosen_prompt = prompt_to_type_map.get(prompt_type)
    if not chosen_prompt:
        raise ValueError("Invalid prompt type")
        # // or use a base prompt
    return chosen_prompt.format(context=context, memory=memory, query=user_query)
