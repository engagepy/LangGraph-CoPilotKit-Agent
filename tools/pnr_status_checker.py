import requests
from typing import Dict, Any

def pnr_status_checker(pnr: str) -> Dict[str, Any]:
    """
    Check Indian train PNR status using api.railwayapi.site.

    Args:
        pnr (str): The 10-digit PNR number to check.

    Returns:
        Dict[str, Any]: Contains status, train, from, to, seat, or error key. If API fails, returns mocked data.
    """
    url = f"https://api.railwayapi.site/api/v1/pnr-status/{pnr}"
    try:
        resp = requests.get(url, timeout=5)
        if resp.status_code == 200:
            data = resp.json()
            return {
                "status": data.get("status", "Unknown"),
                "train": data.get("train", "Unknown"),
                "from": data.get("from", "Unknown"),
                "to": data.get("to", "Unknown"),
                "seat": data.get("seat", "Unknown")
            }
        else:
            return {"error": "Invalid PNR or not found."}
    except Exception as e:
        # Mocked fallback
        return {"status": "Mocked: Chart not prepared", "train": "12345", "from": "NDLS", "to": "BCT", "seat": "S1-23"} 