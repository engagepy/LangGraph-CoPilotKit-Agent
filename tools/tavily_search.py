import os
from typing import Dict, List, Optional, Any
from tavily import TavilyClient

def web_search(query: str, search_depth: str = "basic", include_domains: Optional[List[str]] = None, exclude_domains: Optional[List[str]] = None) -> Dict:
    """Perform a web search using Tavily API for any external information you need.
    
    Args:
        query: Search query string
        search_depth: Search depth - "basic" (faster) or "advanced" (more comprehensive)
        include_domains: List of domains to include in search results
        exclude_domains: List of domains to exclude from search results
    
    Returns:
        Dictionary containing search results with query, answer, and results
    """
    try:
        # Get API key from environment variables
        tavily_api_key = os.getenv("TAVILY_API_KEY")
        if not tavily_api_key:
            return {"error": "TAVILY_API_KEY not found in environment variables"}
        
        # Initialize Tavily client
        client = TavilyClient(tavily_api_key)
        
        # Prepare search parameters
        search_params: Dict[str, Any] = {
            "query": query,
            "search_depth": search_depth
        }
        
        # Add optional parameters if provided
        if include_domains:
            search_params["include_domains"] = include_domains
        if exclude_domains:
            search_params["exclude_domains"] = exclude_domains
        
        # Perform the search
        response = client.search(**search_params)
        
        # Extract and format the results
        formatted_results = []
        for result in response.get("results", []):
            formatted_results.append({
                "title": result.get("title", ""),
                "url": result.get("url", ""),
                "content": result.get("content", ""),
                "score": result.get("score", 0)
            })
        
        return {
            "query": response.get("query", query),
            "answer": response.get("answer"),
            "follow_up_questions": response.get("follow_up_questions"),
            "results": formatted_results,
            "response_time": response.get("response_time", 0),
            "total_results": len(formatted_results)
        }
        
    except Exception as e:
        return {"error": f"Error performing web search: {str(e)}"}

def search_news(query: str, include_domains: Optional[List[str]] = None) -> Dict:
    """Search for news articles using Tavily API.
    
    Args:
        query: News search query
        include_domains: List of news domains to include (e.g., ["cnn.com", "bbc.com"])
    
    Returns:
        Dictionary containing news search results
    """
    try:
        # Get API key from environment variables
        tavily_api_key = os.getenv("TAVILY_API_KEY")
        if not tavily_api_key:
            return {"error": "TAVILY_API_KEY not found in environment variables"}
        
        # Initialize Tavily client
        client = TavilyClient(tavily_api_key)
        
        # Prepare search parameters for news
        search_params: Dict[str, Any] = {
            "query": query,
            "search_depth": "basic",
            "include_domains": include_domains or ["cnn.com", "bbc.com", "reuters.com", "ap.org", "npr.org"]
        }
        
        # Perform the search
        response = client.search(**search_params)
        
        # Extract and format the results
        formatted_results = []
        for result in response.get("results", []):
            formatted_results.append({
                "title": result.get("title", ""),
                "url": result.get("url", ""),
                "content": result.get("content", ""),
                "score": result.get("score", 0)
            })
        
        return {
            "query": response.get("query", query),
            "answer": response.get("answer"),
            "results": formatted_results,
            "response_time": response.get("response_time", 0),
            "total_results": len(formatted_results)
        }
        
    except Exception as e:
        return {"error": f"Error searching news: {str(e)}"}

def search_academic(query: str, include_domains: Optional[List[str]] = None) -> Dict:
    """Search for academic papers and research using Tavily API.
    
    Args:
        query: Academic search query
        include_domains: List of academic domains to include (e.g., ["arxiv.org", "researchgate.net"])
    
    Returns:
        Dictionary containing academic search results
    """
    try:
        # Get API key from environment variables
        tavily_api_key = os.getenv("TAVILY_API_KEY")
        if not tavily_api_key:
            return {"error": "TAVILY_API_KEY not found in environment variables"}
        
        # Initialize Tavily client
        client = TavilyClient(tavily_api_key)
        
        # Prepare search parameters for academic content
        academic_domains = include_domains or [
            "arxiv.org", 
            "researchgate.net", 
            "scholar.google.com", 
            "sciencedirect.com",
            "ieee.org",
            "acm.org",
            "springer.com",
            "nature.com"
        ]
        
        search_params: Dict[str, Any] = {
            "query": query,
            "search_depth": "advanced",
            "include_domains": academic_domains
        }
        
        # Perform the search
        response = client.search(**search_params)
        
        # Extract and format the results
        formatted_results = []
        for result in response.get("results", []):
            formatted_results.append({
                "title": result.get("title", ""),
                "url": result.get("url", ""),
                "content": result.get("content", ""),
                "score": result.get("score", 0)
            })
        
        return {
            "query": response.get("query", query),
            "answer": response.get("answer"),
            "results": formatted_results,
            "response_time": response.get("response_time", 0),
            "total_results": len(formatted_results)
        }
        
    except Exception as e:
        return {"error": f"Error searching academic content: {str(e)}"} 