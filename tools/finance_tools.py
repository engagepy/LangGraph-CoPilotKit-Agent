import requests
from typing import Dict

def get_crypto_price(symbol: str = "bitcoin") -> Dict:
    """Get current cryptocurrency price.
    
    Args:
        symbol: Cryptocurrency symbol (bitcoin, ethereum, etc.)
    """
    try:
        # Using CoinGecko API (free, no API key required)
        url = f"https://api.coingecko.com/api/v3/simple/price?ids={symbol}&vs_currencies=usd,eur&include_24hr_change=true"
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if symbol in data:
                return {
                    "cryptocurrency": symbol,
                    "price_usd": f"${data[symbol]['usd']:,.2f}",
                    "price_eur": f"€{data[symbol]['eur']:,.2f}",
                    "change_24h": f"{data[symbol]['usd_24h_change']:.2f}%"
                }
            else:
                return {"error": f"Cryptocurrency '{symbol}' not found"}
        else:
            return {"error": f"Failed to get crypto price: {response.status_code}"}
    except Exception as e:
        return {"error": f"Error getting crypto price: {str(e)}"} 