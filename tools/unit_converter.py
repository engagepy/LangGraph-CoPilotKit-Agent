from typing import Dict, Optional

def convert_unit(value: float, from_unit: str, to_unit: str) -> Dict:
    """
    Convert units (length, mass, temperature, land area, etc.). Supports a few common conversions.

    Args:
        value: The numeric value to convert.
        from_unit: The unit to convert from (e.g., 'meter', 'celsius').
        to_unit: The unit to convert to (e.g., 'kilometer', 'fahrenheit').

    Returns:
        A dictionary with the original value, units, and the converted result, or an error if unsupported.
    """
    conversions = {
        ("meter", "kilometer"): lambda x: x / 1000,
        ("kilometer", "meter"): lambda x: x * 1000,
        ("gram", "kilogram"): lambda x: x / 1000,
        ("kilogram", "gram"): lambda x: x * 1000,
        ("celsius", "fahrenheit"): lambda x: (x * 9/5) + 32,
        ("fahrenheit", "celsius"): lambda x: (x - 32) * 5/9,
        ("inch", "centimeter"): lambda x: x * 2.54,
        ("centimeter", "inch"): lambda x: x / 2.54,
        ("pound", "kilogram"): lambda x: x * 0.453592,
        ("kilogram", "pound"): lambda x: x / 0.453592,
    }
    key = (from_unit.lower(), to_unit.lower())
    if key in conversions:
        try:
            result = conversions[key](value)
            return {"value": value, "from": from_unit, "to": to_unit, "result": result}
        except Exception as e:
            return {"error": f"Conversion error: {str(e)}"}
    else:
        return {"error": f"Conversion from {from_unit} to {to_unit} not supported."}

# Regional bigha sizes (in sq ft)
bigha_sizes = {
    "up_west": 6806.25,
    "up_east": 27225,
    "haryana": 27225,
    "punjab": 9070,
    "rajasthan_pucca": 27225,
    "rajasthan_kachha": 17424,
    "himachal": 8712,
    "bengal": 14400,
    "assam": 14400,
    "gujarat": 17424,
    "mp": 12000,
    "bihar": 27220,
}

