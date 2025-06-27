import os
import requests
from typing import Dict

def get_weather(city: str, country_code: str = "US") -> Dict:
    """Get current weather information for a city.
    
    Args:
        city: City name (e.g., "New York", "London")
        country_code: Country code (e.g., "US", "GB")
    """
    try:
        # Using OpenWeatherMap API (free tier)
        weather_api_key = os.getenv("OPENWEATHERMAP_API_KEY")  # Get API key from environment variable
        if not weather_api_key:
            return {"error": "OPENWEATHERMAP_API_KEY not found in environment variables"}
        
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city},{country_code}&appid={weather_api_key}&units=metric"
        
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            data = response.json()
            return {
                "city": data["name"],
                "temperature": f"{data['main']['temp']}°C",
                "description": data["weather"][0]["description"],
                "humidity": f"{data['main']['humidity']}%",
                "wind_speed": f"{data['wind']['speed']} m/s"
            }
        else:
            return {"error": f"Failed to get weather data: {response.status_code}"}
    except Exception as e:
        return {"error": f"Error getting weather: {str(e)}"} 