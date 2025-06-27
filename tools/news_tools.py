import os
import requests
from typing import Dict, List

def get_news(category: str = "general", country: str = "us") -> List[Dict]:
    """Get latest news articles.
    
    Args:
        category: News category (business, entertainment, general, health, science, sports, technology)
        country: Country code (us, gb, etc.)
    """
    try:
        # Using NewsAPI (free tier with API key)
        news_api_key = os.getenv("NEWS_API_KEY")  # Get API key from environment variable
        if not news_api_key:
            return [{"error": "NEWS_API_KEY not found in environment variables"}]
        
        url = f"https://newsapi.org/v2/top-headlines?country={country}&category={category}&apiKey={news_api_key}"
        
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            data = response.json()
            articles = []
            for article in data.get("articles", [])[:5]:  # Limit to 5 articles
                articles.append({
                    "title": article.get("title", ""),
                    "description": article.get("description", ""),
                    "url": article.get("url", ""),
                    "published_at": article.get("publishedAt", "")
                })
            return articles
        else:
            return [{"error": f"Failed to get news: {response.status_code}"}]
    except Exception as e:
        return [{"error": f"Error getting news: {str(e)}"}] 