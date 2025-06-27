import requests
from typing import Dict

def get_nasa_apod() -> Dict:
    """
    Get NASA Astronomy Picture of the Day (APOD) from NASA's public API.

    This tool does not require any arguments.

    Returns:
        The full JSON response from NASA APOD API, including title, date, explanation, image URL, and other metadata.
    """
    try:
        url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            return response.json()
        else:
            return {"error": f"Failed to get APOD: {response.status_code}"}
    except Exception as e:
        return {"error": f"Error getting APOD: {str(e)}"} 