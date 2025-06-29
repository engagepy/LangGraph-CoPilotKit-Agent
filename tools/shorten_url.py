import re
import requests
from typing import Dict
from urllib.parse import urlparse

def shorten_url(url: str) -> Dict:
    """
    Shorten a URL using TinyURL API. Handles various input formats (with/without protocol, www).
    Always uses HTTPS for the shortened URL.
    """
    # Clean input: remove whitespace
    url = url.strip()

    # Parse URL
    parsed = urlparse(url if '://' in url else 'https://' + url)

    if not parsed.netloc:
        return {"error": "Invalid URL provided"}

    # Rebuild as https://domain/path...
    cleaned = parsed._replace(scheme='https').geturl()

    try:
        api_url = f"https://tinyurl.com/api-create.php?url={cleaned}"
        response = requests.get(api_url, timeout=10)
        if response.status_code == 200:
            short = response.text.strip()
            # Ensure result is https
            if short.startswith("http://"):
                short = "https://" + short[len("http://"):]
            return {"short_url": short}
        else:
            return {"error": f"Failed to shorten URL: {response.status_code}"}
    except Exception as e:
        return {"error": f"Error shortening URL: {str(e)}"}