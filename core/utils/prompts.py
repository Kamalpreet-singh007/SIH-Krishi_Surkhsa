

class PromptTypes:
    AGRI_CHATBOT = "AGRI_CHATBOT"
    CROP_RECOMMENDATION = "CROP_RECOMMENDATION"


AGRI_CHATBOT_PROMPT = """
      You are an agricultural chatbot for India. I will provide you with data about the weather and soil conditions of a location along with the user's query. Based on this data, you must give the best possible answer to the user's query.

Please respond in Hindi or English depending on the language of the user's query.

If the query is unrelated to agriculture, politely refuse to answer in the language of user's query
dont talk about like given data just say acc to weather in you location or something like that

{context}:
User query:
{query}


"""

CROP_RECOMMENDATION_PROMPT =CROP_RECOMMENDATION_PROMPT = """
I am giving you data about the weather and soil conditions of a location. Based on this data, you must recommend the best crops to grow in that location.
{context}

The output must be in strict JSON format only. Do not include any text, comments, or symbols outside the JSON.

The JSON must be a list [] of crop objects. Each crop object must follow this exact structure:

{{
  "Id": 1,
  "Name": "Example Crop(give hindi or desi names in brackets)",
  "Confidence": 95,
  "Description": "A short description of the crop.",
  "Pros": ["Advantage 1", "Advantage 2"],
  "Cons": ["Disadvantage 1", "Disadvantage 2"],
  "WaterRequirement": "500-800 mm",
  "SoilType": "Suitable soil type",
  "GrowthPeriod": "90-120 days",
  "Icon": "lucide:wheat",
  "Location": "Location name",
  "PriceTimeline": [
    {{"Date": "2025-09-01", "Price": 30.0}},
    {{"Date": "2025-09-15", "Price": 31.0}}
  ]
}}

Rules:
- Return only a valid JSON array (e.g. [ {{...}}, {{...}} ]).
- Do not include markdown, comments, explanations, or extra text.
- Ensure all numbers are actual numbers (not strings with %).
- Ensure the JSON is strictly parsable.
-  not even ```json .
- recommend atleast four crpos
"""


prompt_to_type_map = {
    PromptTypes.AGRI_CHATBOT: AGRI_CHATBOT_PROMPT,
    PromptTypes.CROP_RECOMMENDATION: CROP_RECOMMENDATION_PROMPT
}

def prompt_builder(context, memory, user_query, prompt_type):
    chosen_prompt = prompt_to_type_map.get(prompt_type)
    if not chosen_prompt:
        raise ValueError("Invalid prompt type")
    print("context in prompt",context)
        # // or use a base prompt
    return chosen_prompt.format(context=context, memory=memory, query=user_query)
