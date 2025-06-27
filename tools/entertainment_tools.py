import requests
from typing import Dict

def get_random_quote() -> Dict:
    """Get a random inspirational quote."""
    try:
        # Using Quotable API (free, no API key required)
        response = requests.get("https://api.quotable.io/random", timeout=10)
        if response.status_code == 200:
            data = response.json()
            return {
                "quote": data.get("content", ""),
                "author": data.get("author", ""),
                "tags": data.get("tags", [])
            }
        else:
            return {"error": f"Failed to get quote: {response.status_code}"}
    except Exception as e:
        return {"error": f"Error getting quote: {str(e)}"}

def get_joke() -> Dict:
    """Get a random joke."""
    try:
        # Using JokeAPI (free, no API key required)
        response = requests.get("https://v2.jokeapi.dev/joke/Any?safe-mode", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("type") == "single":
                return {
                    "joke": data.get("joke", ""),
                    "category": data.get("category", ""),
                    "type": "single"
                }
            else:
                return {
                    "setup": data.get("setup", ""),
                    "delivery": data.get("delivery", ""),
                    "category": data.get("category", ""),
                    "type": "twopart"
                }
        else:
            return {"error": f"Failed to get joke: {response.status_code}"}
    except Exception as e:
        return {"error": f"Error getting joke: {str(e)}"} 