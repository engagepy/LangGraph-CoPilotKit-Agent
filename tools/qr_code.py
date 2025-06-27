from typing import Dict

def generate_qr_code(data: str) -> Dict:
    """
    Generate a QR code for the given data using goqr.me API.

    Args:
        data: The string to encode in the QR code.

    Returns:
        A dictionary with the URL to the generated QR code image.
    """
    try:
        url = f"https://api.qrserver.com/v1/create-qr-code/?data={data}&size=200x200"
        return {"qr_code_url": url}
    except Exception as e:
        return {"error": f"Error generating QR code: {str(e)}"} 