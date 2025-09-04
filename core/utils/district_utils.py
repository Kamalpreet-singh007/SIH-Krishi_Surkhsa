import os
import pandas as pd
import requests

# Path to CSV
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(BASE_DIR, "..", "data", "jharkhand_district_soil_types.csv")
CSV_PATH = os.path.normpath(CSV_PATH)

# Load CSV file once
df = pd.read_csv(CSV_PATH)

def get_district_from_coordinates(lat: float, lon: float) -> str:
    """Reverse geocode lat/lon into district name using OpenStreetMap Nominatim API."""
    url = f"https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=json"
    res = requests.get(url, headers={"User-Agent": "SIH-KrishiSurkhsa-App"})
    data = res.json()
    return (
        data.get("address", {}).get("state_district")
        or data.get("address", {}).get("county")
        or data.get("address", {}).get("state")
        or "Unknown District"
    )

def get_district_info(district_name: str):
    """Fetch soil info for a given district name (case-insensitive)."""
    district_name = district_name.strip().lower()
    result = df[df[df.columns[0]].str.lower() == district_name]  # assuming first col = district
    if not result.empty:
        return result.to_dict(orient="records")[0]
    else:
        return {"error": f"No data found for district: {district_name}"}
