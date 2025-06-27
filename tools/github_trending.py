import requests
from typing import List, Dict
from datetime import datetime, timedelta

def get_trending_github_repos(language: str = "python") -> List[Dict]:
    """Get trending GitHub repositories for a given language (most starred in the last week)."""
    try:
        last_week = (datetime.utcnow() - timedelta(days=7)).strftime('%Y-%m-%d')
        query = f"language:{language} created:>={last_week}"
        url = f"https://api.github.com/search/repositories?q={query}&sort=stars&order=desc&per_page=5"
        headers = {}
        # Optionally add a GitHub token for higher rate limits
        # token = os.getenv('GITHUB_TOKEN')
        # if token:
        #     headers['Authorization'] = f'token {token}'
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code == 200:
            items = response.json().get('items', [])
            return [
                {
                    'name': repo['name'],
                    'full_name': repo['full_name'],
                    'html_url': repo['html_url'],
                    'description': repo['description'],
                    'stars': repo['stargazers_count'],
                    'language': repo['language'],
                    'created_at': repo['created_at']
                }
                for repo in items
            ]
        else:
            return [{"error": f"Failed to get trending repos: {response.status_code}"}]
    except Exception as e:
        return [{"error": f"Error getting trending repos: {str(e)}"}] 