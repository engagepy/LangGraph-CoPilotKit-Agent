import requests
from typing import Dict, Any

def pincode_lookup(pincode: str) -> Dict[str, Any]:
    """
    Look up Indian pincode using postalpincode.in API.

    Args:
        pincode (str): The pincode to look up.

    Returns:
        Dict[str, Any]: Contains area, city, state, country, or error key if not found.
    """
    url = f"https://api.postalpincode.in/pincode/{pincode}"
    try:
        resp = requests.get(url, timeout=5)
        data = resp.json()
        if data and data[0]["Status"] == "Success":
            post = data[0]["PostOffice"][0]
            return {
                "area": post["Name"],
                "city": post["District"],
                "state": post["State"],
                "country": post["Country"]
            }
        else:
            return {"error": "Invalid pincode or not found."}
    except Exception as e:
        return {"error": str(e)} 