from typing import Dict, Optional

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

def convert_land_unit(value: float, from_unit: str, to_unit: str, region: Optional[str] = None) -> Dict:
    """
    Convert Indian land units, supporting regional variations for bigha, biswa, katha, etc.
    Args:
        value: The numeric value to convert.
        from_unit: The unit to convert from (e.g., 'bigha', 'acre', 'sqft').
        to_unit: The unit to convert to (e.g., 'acre', 'sqft', 'bigha').
        region: The region/state for units with regional variation (e.g., 'up_west', 'punjab').
    Returns:
        A dictionary with the original value, units, region, and the converted result, or an error if unsupported.
    """
    # Standard units in sq ft
    unit_to_sqft = {
        "sqft": 1,
        "sqyd": 9,
        "sqm": 10.7639,
        "acre": 43560,
        "hectare": 107639,
        "cent": 435.6,
        "ground": 2400,
        "ankanam": 72,
        "guntha": 1089,
        "marla": 272.25,
        "kanal": 5445,
        "chatak": 180,
        "dhur_bihar": 68.0625,
        "dhur_tripura": 3.6,
        "lecha": 144,
        "katha_bengal": 720,
        "katha_bihar": 1361.25,
        "katha_assam": 2880,
        "katha_mp": 600,
    }
    # Add bigha for region
    if from_unit == "bigha":
        if not region or region not in bigha_sizes:
            return {"error": "Please specify a valid region for bigha (e.g., 'up_west', 'punjab', 'bengal', etc.)"}
        from_sqft = bigha_sizes[region]
    else:
        from_sqft = unit_to_sqft.get(from_unit)
    if to_unit == "bigha":
        if not region or region not in bigha_sizes:
            return {"error": "Please specify a valid region for bigha (e.g., 'up_west', 'punjab', 'bengal', etc.)"}
        to_sqft = bigha_sizes[region]
    else:
        to_sqft = unit_to_sqft.get(to_unit)
    if not from_sqft or not to_sqft:
        return {"error": f"Conversion from {from_unit} to {to_unit} not supported or region missing."}
    # Convert to sqft, then to target
    sqft = value * from_sqft
    result = sqft / to_sqft
    return {
        "value": value,
        "from": from_unit,
        "to": to_unit,
        "region": region,
        "result": result
    } 