

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

CROP_RECOMMENDATION_PROMPT = """
      i am giving you data about the weather and soil conditions of a location. Based on this data, you must recommend the best crops to grow in that location.
      {context}
      {query}
      The output must be in strict JSON format only. Do not include any text, comments, or symbols outside the JSON. 

    The JSON must be a list `[]` of crops. Each crop object must follow this exact structure:
heres an example of the list 
        
  "Id": (integer, unique crop identifier),
  "Name": (string, crop name),
  "Confidence": (percentage),
  "Description": (short string describing crop),
  "Pros": [list of strings, advantages],
  "Cons": [list of strings, disadvantages],
  "WaterRequirement": (string, e.g. "500-800 mm"),
  "SoilType": (string),
  "GrowthPeriod": (string, e.g. "90-120 days")
  "Icon":String name of icon similar to crop in Lucide set (example :lucide:wheat) 


        Rules:
        - Return only JSON.
        - The result must be valid and strictly parsable.
        - Do not include backticks, markdown, explanations, or any surrounding text — just the pure JSON array not even'`', "```json

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
