import requests
from typing import Dict

def shorten_url(url: str) -> Dict:
    """
    Shorten a URL using TinyURL API.

    Args:
        url: The URL to shorten.

    Returns:
        A dictionary with the shortened URL.
    """
    try:
        api_url = f"https://tinyurl.com/api-create.php?url={url}"
        response = requests.get(api_url, timeout=10)
        if response.status_code == 200:
            return {"short_url": response.text}
        else:
            return {"error": f"Failed to shorten URL: {response.status_code}"}
    except Exception as e:
        return {"error": f"Error shortening URL: {str(e)}"} 