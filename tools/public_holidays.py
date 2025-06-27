import requests
from typing import List, Dict, Optional
from datetime import datetime

def get_public_holidays(country_code: str, year: Optional[int] = None) -> List[Dict]:
    """
    Get public holidays for a country and year.

    Args:
        country_code: The 2-letter country code (e.g., 'US', 'IN').
        year: The year as a 4-digit integer (e.g., 2024). Defaults to current year if not specified.

    Returns:
        A list of dictionaries with public holiday information.
    """
    if year is None:
        year = datetime.now().year
    try:
        url = f"https://date.nager.at/api/v3/PublicHolidays/{year}/{country_code}"
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            return response.json()
        else:
            return [{"error": f"Failed to get public holidays: {response.status_code}"}]
    except Exception as e:
        return [{"error": f"Error getting public holidays: {str(e)}"}] 