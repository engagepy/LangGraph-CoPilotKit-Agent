import requests
from typing import Dict

def get_wikipedia_summary(query: str) -> Dict:
    """
    Get a summary for a topic from Wikipedia.

    Args:
        query: The topic or page title to search for (e.g., 'Python (programming language)').

    Returns:
        A dictionary with the title, summary, and URL of the Wikipedia page.
    """
    try:
        url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{query.replace(' ', '_')}"
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            data = response.json()
            return {
                "title": data.get("title", ""),
                "summary": data.get("extract", ""),
                "url": data.get("content_urls", {}).get("desktop", {}).get("page", "")
            }
        else:
            return {"error": f"Failed to get Wikipedia summary: {response.status_code}"}
    except Exception as e:
        return {"error": f"Error getting Wikipedia summary: {str(e)}"} 