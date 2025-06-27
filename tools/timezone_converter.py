import requests
from typing import Dict

def get_current_timezone(timezone: str) -> Dict:
    """
    Get the full current time and timezone info for a given time zone using WorldTimeAPI.

    Args:
        timezone: The timezone name (e.g., 'Europe/London', 'Asia/Kolkata').

    Returns:
        The full JSON response from WorldTimeAPI for the timezone, including utc_offset, datetime, abbreviation, etc.
    """
    try:
        url = f"http://worldtimeapi.org/api/timezone/{timezone}"
        resp = requests.get(url, timeout=10)
        if resp.status_code == 200:
            return resp.json()
        else:
            return {"error": "Failed to get timezone info. Please check the timezone name (e.g., 'Europe/London')."}
    except Exception as e:
        return {"error": f"Error getting timezone info: {str(e)}"} 