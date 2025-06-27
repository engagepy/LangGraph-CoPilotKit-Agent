# Import all tools from their respective modules
from .math_tools import add, multiply, divide
from .weather_tools import get_weather
from .news_tools import get_news
from .entertainment_tools import get_random_quote, get_joke
from .finance_tools import get_crypto_price
from .network_tools import get_ip_info
from .dictionary_tools import get_word_definition
from .tavily_search import web_search, search_news, search_academic

# Export all tools
__all__ = [
    'add',
    'multiply', 
    'divide',
    'get_weather',
    'get_news',
    'get_random_quote',
    'get_joke',
    'get_crypto_price',
    'get_ip_info',
    'get_word_definition',
    'web_search',
    'search_news',
    'search_academic'
] 