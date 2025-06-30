from typing import Dict, Optional

# Region-specific bigha sizes in sq ft
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

# Complete mapping in sq ft
unit_to_sqft = {
    # Imperial & US customary
    "sqin": 0.00694444, "squareinch": 0.00694444,
    "sqft": 1, "squarefoot": 1,
    "sqyd": 9, "squareyard": 9,
    "acre": 43560,
    # Additional Imperial area units
    "perch": 272.25, "pole": 272.25, "rod": 272.25,
    "squareperch": 272.25, "squarepole": 272.25, "squarerod": 272.25,
    "rood": 10890,
    "squarechain": 4356,
    "squarefurlong": 435600,
    "township": 1003622400,  # 36 square miles = 36 × 27878400
    "section": 27878400,  # 1 square mile
    "homestead": 6969600,  # 160 acres
    "hide": 4356000,  # approximately 100 acres
    "quartersection": 6969600,  # quarter section = 160 acres
    "board": 0.083333333,  # 1 in × 1 ft = 1/12 sq ft
    "circularinch": 0.005454154,  # π/4 ÷ 144 sq ft
    "circularmil": 0.000000005454,  # π/4 × (0.001²) ÷ 144 sq ft
    "squaremil": 0.000000006944,  # (0.001 in)² ÷ 144 sq ft
    "squarethousandth": 0.000000006944,  # same as square mil
    "barn": 1.07639e-27,  # nuclear physics unit
    "yardland": 1306800,  # 30 acres historical unit
    "barony": 174240000,  # 4000 acres historical unit
    "squaremile": 27878400,
    "sqmi": 27878400,
    "squaremillimeter": (1e-3)**2 * 10.7639104,
    "squarecentimeter": (1e-2)**2 * 10.7639104,
    "sqm": 10.7639104, "squaremeter": 10.7639104,
    "sqkm": (1e3)**2 * 10.7639104,
    "squarekilometer": (1e3)**2 * 10.7639104,
    # Popular Indian units
    "cent": 435.6,
    "ground": 2400, 
    "ankanam": 72,
    "guntha": 1089,
    "marla": 272.25,
    "kanal": 5445,            # 1 kanal = 5,445 sq ft  [oai_citation:0‡en.wikipedia.org](https://en.wikipedia.org/wiki/Bigha?utm_source=chatgpt.com) [oai_citation:1‡hextobinary.com](https://hextobinary.com/unit/area/from/cawnie/to/sqft?utm_source=chatgpt.com) [oai_citation:2‡hextobinary.com](https://hextobinary.com/unit/area/from/sqft/to/cawnie?utm_source=chatgpt.com) [oai_citation:3‡magicbricks.com](https://www.magicbricks.com/chatak-to-square-feet-pppfa?utm_source=chatgpt.com) [oai_citation:4‡areaconvert.com](https://www.areaconvert.com/2020/09/kani-to-square-feet-kani-to-acre.html?utm_source=chatgpt.com)
    "chatak": 45,             # 1 chatak = 45 sq ft ()
    "lecha": 144,
    "dhur_bihar": 68.0625,
    "dhur_tripura": 3.6,
    "katha_bengal": 720,
    "katha_assam": 2880,
    "katha_bihar": 1361.25,
    "katha_mp": 600,
    "cawnie": 57600,          # 1 cawnie = 57,600 sq ft ()
    "kani": 57600,            # alias for cawnie
}

# Linear length units in metres
linear_units_m = {
    "m": 1,
    "metre": 1, "meter": 1,
    "cm": 0.01, "centimetre": 0.01, "centimeter": 0.01,
    "mm": 0.001, "millimetre": 0.001, "millimeter": 0.001,
    "km": 1000, "kilometre": 1000, "kilometer": 1000,
    "mi": 1609.34, "mile": 1609.34, "miles": 1609.34,
    "ft": 0.3048, "foot": 0.3048, "feet": 0.3048,
    "in": 0.0254, "inch": 0.0254, "inches": 0.0254,
    "yd": 0.9144, "yard": 0.9144, "yards": 0.9144,
}


bigha_aliases = {"bigha", "bighas"}

def normalise_unit(u: str) -> str:
    return u.strip().lower().replace(" ", "").replace("_", "").replace(".", "")

def convert_land_unit(
    value: float,
    from_unit: str,
    to_unit: str,
    region: Optional[str] = None
) -> Dict:
    """
    Converts land measurements and distance/length between any supported units:
    - Distance/Length: mm, cm, m, km, in, ft, yd, mi (and their variations)
    - Imperial area (sqin, sqft, acre, sqmi)
    - Metric area (sqmm, sqcm, sqm, sqkm)
    - Indian units (kanal, marla, guntha, etc.)
    - Regional bigha (requires region parameter)
    
    For area conversions, returns {'value', 'from','to','region','result'} on success.
    For length conversions, returns {'value', 'from','to','result'} on success.
    Returns {'error'} on failure.
    """
    f_raw, t_raw = from_unit, to_unit
    f = normalise_unit(f_raw)
    t = normalise_unit(t_raw)

        # Handle linear length conversions if both units are linear
    if f in linear_units_m and t in linear_units_m:
        # convert value from from_unit to metres, then to to_unit
        result_val = round(value * linear_units_m[f] / linear_units_m[t], 6)
        return {
            "value": value,
            "from": f_raw,
            "to": t_raw,
            "result": result_val
        }

    # Resolve source unit
    if f in bigha_aliases:
        if not region or region not in bigha_sizes:
            return {"error": "Specify valid region for bigha (e.g., 'punjab', 'up_west')"}
        from_sqft = bigha_sizes[region]
    else:
        from_sqft = unit_to_sqft.get(f)

    # Resolve target unit
    if t in bigha_aliases:
        if not region or region not in bigha_sizes:
            return {"error": "Specify valid region for bigha (e.g., 'punjab', 'up_west')"}
        to_sqft = bigha_sizes[region]
    else:
        to_sqft = unit_to_sqft.get(t)

    # Unsupported checks
    if from_sqft is None or to_sqft is None:
        return {
            "value": value,
            "from": f_raw,
            "to": t_raw,
            "region": region,
            "error": f"Unsupported conversion from '{f_raw}' to '{t_raw}'"
        }

    # Perform conversion
    sqft_val = value * from_sqft
    result = round(sqft_val / to_sqft, 2)

    return {
        "value": value,
        "from": f_raw,
        "to": t_raw,
        "region": region,
        "result": result
    }