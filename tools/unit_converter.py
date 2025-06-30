from typing import Dict, Optional
import math

def convert_unit(value: float, from_unit: str, to_unit: str) -> Dict:
    """
    The ultimate unit converter - supports scientific, engineering, and everyday conversions.
    Covers: temperature, mass, speed, energy, pressure, volume, time, frequency, angles,
    astronomical distances, sound levels, heat/spice, electrical units, data, and more.

    Do not use for any land area conversions or distance, go to convert_land_unit instead.
    
    For distance/length and land area conversions, use convert_land_unit instead.

    Args:
        value: The numeric value to convert.
        from_unit: The unit to convert from.
        to_unit: The unit to convert to.

    Returns:
        A dictionary with the original value, units, and the converted result, or an error.
    """
    
    # Normalize units (lowercase, no spaces/underscores)
    from_norm = from_unit.lower().replace(" ", "").replace("_", "").replace("-", "")
    to_norm = to_unit.lower().replace(" ", "").replace("_", "").replace("-", "")
    
    # TEMPERATURE CONVERSIONS
    temp_conversions = {
        ("celsius", "fahrenheit"): lambda x: (x * 9/5) + 32,
        ("fahrenheit", "celsius"): lambda x: (x - 32) * 5/9,
        ("celsius", "kelvin"): lambda x: x + 273.15,
        ("kelvin", "celsius"): lambda x: x - 273.15,
        ("fahrenheit", "kelvin"): lambda x: (x - 32) * 5/9 + 273.15,
        ("kelvin", "fahrenheit"): lambda x: (x - 273.15) * 9/5 + 32,
        ("celsius", "rankine"): lambda x: (x + 273.15) * 9/5,
        ("rankine", "celsius"): lambda x: (x * 5/9) - 273.15,
        ("fahrenheit", "rankine"): lambda x: x + 459.67,
        ("rankine", "fahrenheit"): lambda x: x - 459.67,
    }
    
    # MASS/WEIGHT CONVERSIONS (to grams base)
    mass_to_grams = {
        "g": 1, "gram": 1, "grams": 1,
        "kg": 1000, "kilogram": 1000, "kilograms": 1000,
        "mg": 0.001, "milligram": 0.001, "milligrams": 0.001,
        "μg": 0.000001, "microgram": 0.000001, "micrograms": 0.000001,
        "t": 1000000, "tonne": 1000000, "tonnes": 1000000, "metricton": 1000000,
        "lb": 453.592, "pound": 453.592, "pounds": 453.592, "lbs": 453.592,
        "oz": 28.3495, "ounce": 28.3495, "ounces": 28.3495,
        "stone": 6350.29, "stones": 6350.29,
        "ton": 907185, "shortton": 907185, "ustons": 907185,
        "longton": 1016047, "imperialton": 1016047,
        "grain": 0.0647989, "grains": 0.0647989,
        "carat": 0.2, "carats": 0.2,
        "slug": 14593.9, "slugs": 14593.9,
        "atomicmassunit": 1.66054e-24, "amu": 1.66054e-24, "u": 1.66054e-24,
    }
    
    # SPEED CONVERSIONS (to m/s base)
    speed_to_ms = {
        "ms": 1, "m/s": 1, "mps": 1, "meterpersecond": 1,
        "kmh": 0.277778, "km/h": 0.277778, "kph": 0.277778, "kilometerperhour": 0.277778,
        "mph": 0.44704, "milesperhour": 0.44704, "mi/h": 0.44704,
        "fps": 0.3048, "ft/s": 0.3048, "footpersecond": 0.3048, "feetpersecond": 0.3048,
        "knot": 0.514444, "knots": 0.514444, "kt": 0.514444, "nauticalmilesperhour": 0.514444,
        "mach": 343, "speedofsound": 343,
        "c": 299792458, "speedoflight": 299792458, "lightspeed": 299792458,
        "cms": 0.01, "cm/s": 0.01, "centimeterpersecond": 0.01,
        "mms": 0.001, "mm/s": 0.001, "millimeterpersecond": 0.001,
        "ips": 0.0254, "inchpersecond": 0.0254, "in/s": 0.0254,
    }
    
    # ENERGY CONVERSIONS (to joules base)
    energy_to_joules = {
        "j": 1, "joule": 1, "joules": 1,
        "kj": 1000, "kilojoule": 1000, "kilojoules": 1000,
        "mj": 1000000, "megajoule": 1000000, "megajoules": 1000000,
        "cal": 4.184, "calorie": 4.184, "calories": 4.184, "smallcalorie": 4.184,
        "kcal": 4184, "kilocalorie": 4184, "kilocalories": 4184, "largecalorie": 4184, "foodcalorie": 4184,
        "btu": 1055.06, "britishthermalunit": 1055.06,
        "wh": 3600, "watthour": 3600, "watthours": 3600,
        "kwh": 3600000, "kilowatthour": 3600000, "kilowatthours": 3600000,
        "erg": 1e-7, "ergs": 1e-7,
        "ftlb": 1.35582, "footpound": 1.35582, "ftlbf": 1.35582,
        "therm": 105506000, "therms": 105506000,
        "ev": 1.602176634e-19, "electronvolt": 1.602176634e-19, "electronvolts": 1.602176634e-19,
        "tnt": 4184000000, "tonoftnt": 4184000000,
    }
    
    # POWER CONVERSIONS (to watts base)
    power_to_watts = {
        "w": 1, "watt": 1, "watts": 1,
        "kw": 1000, "kilowatt": 1000, "kilowatts": 1000,
        "mw": 1000000, "megawatt": 1000000, "megawatts": 1000000,
        "hp": 745.7, "horsepower": 745.7, "mechanicalhorsepower": 745.7,
        "metrichp": 735.5, "metrichorsepower": 735.5, "ps": 735.5,
        "electricalhp": 746, "electricalhorsepower": 746,
        "boilerhp": 9809.5, "boilerhorsepower": 9809.5,
        "btus": 1055.06, "btupersecond": 1055.06,
        "caloriepersecond": 4.184, "cals": 4.184,
        "ftlbs": 1.35582, "footpoundpersecond": 1.35582,
    }
    
    # PRESSURE CONVERSIONS (to pascals base)
    pressure_to_pascals = {
        "pa": 1, "pascal": 1, "pascals": 1,
        "kpa": 1000, "kilopascal": 1000, "kilopascals": 1000,
        "mpa": 1000000, "megapascal": 1000000, "megapascals": 1000000,
        "bar": 100000, "bars": 100000,
        "mbar": 100, "millibar": 100, "millibars": 100,
        "atm": 101325, "atmosphere": 101325, "atmospheres": 101325, "standardatmosphere": 101325,
        "psi": 6894.76, "poundpersquareinch": 6894.76, "psig": 6894.76,
        "psf": 47.8803, "poundpersquarefoot": 47.8803,
        "torr": 133.322, "mmhg": 133.322, "millimeterofmercury": 133.322,
        "inhg": 3386.39, "inchofmercury": 3386.39,
        "mmh2o": 9.80665, "millimeterofwater": 9.80665,
        "inh2o": 249.089, "inchofwater": 249.089,
        "dyn": 0.1, "dynepersquarecentimeter": 0.1,
    }
    
    # VOLUME CONVERSIONS (to liters base)
    volume_to_liters = {
        "l": 1, "liter": 1, "liters": 1, "litre": 1, "litres": 1,
        "ml": 0.001, "milliliter": 0.001, "milliliters": 0.001, "millilitre": 0.001, "millilitres": 0.001,
        "cl": 0.01, "centiliter": 0.01, "centiliters": 0.01,
        "dl": 0.1, "deciliter": 0.1, "deciliters": 0.1,
        "gal": 3.78541, "gallon": 3.78541, "gallons": 3.78541, "usgallon": 3.78541,
        "imperialgal": 4.54609, "imperialgallon": 4.54609, "ukgallon": 4.54609,
        "qt": 0.946353, "quart": 0.946353, "quarts": 0.946353, "usquart": 0.946353,
        "imperialqt": 1.13652, "imperialquart": 1.13652, "ukquart": 1.13652,
        "pt": 0.473176, "pint": 0.473176, "pints": 0.473176, "uspint": 0.473176,
        "imperialpt": 0.568261, "imperialpint": 0.568261, "ukpint": 0.568261,
        "cup": 0.236588, "cups": 0.236588, "uscup": 0.236588,
        "floz": 0.0295735, "fluidounce": 0.0295735, "fluidounces": 0.0295735, "usfloz": 0.0295735,
        "imperialfloz": 0.0284131, "ukfloz": 0.0284131,
        "tbsp": 0.0147868, "tablespoon": 0.0147868, "tablespoons": 0.0147868,
        "tsp": 0.00492892, "teaspoon": 0.00492892, "teaspoons": 0.00492892,
        "cbm": 1000, "cubicmeter": 1000, "cubicmeters": 1000, "m3": 1000,
        "cbcm": 0.001, "cubiccentimeter": 0.001, "cubiccentimeters": 0.001, "cm3": 0.001, "cc": 0.001,
        "cbft": 28.3168, "cubicfoot": 28.3168, "cubicfeet": 28.3168, "ft3": 28.3168,
        "cbin": 0.0163871, "cubicinch": 0.0163871, "cubicinches": 0.0163871, "in3": 0.0163871,
        "cbyd": 764.555, "cubicyard": 764.555, "cubicyards": 764.555, "yd3": 764.555,
        "barrel": 158.987, "barrels": 158.987, "bbl": 158.987, "oilbarrel": 158.987,
    }
    
    # TIME CONVERSIONS (to seconds base)
    time_to_seconds = {
        "s": 1, "sec": 1, "second": 1, "seconds": 1,
        "ms": 0.001, "millisecond": 0.001, "milliseconds": 0.001,
        "μs": 0.000001, "microsecond": 0.000001, "microseconds": 0.000001, "us": 0.000001,
        "ns": 1e-9, "nanosecond": 1e-9, "nanoseconds": 1e-9,
        "min": 60, "minute": 60, "minutes": 60,
        "hr": 3600, "hour": 3600, "hours": 3600, "h": 3600,
        "day": 86400, "days": 86400, "d": 86400,
        "week": 604800, "weeks": 604800, "wk": 604800,
        "month": 2629746, "months": 2629746, "mo": 2629746,  # Average month
        "year": 31556952, "years": 31556952, "yr": 31556952, "y": 31556952,  # Julian year
        "decade": 315569520, "decades": 315569520,
        "century": 3155695200, "centuries": 3155695200,
        "millennium": 31556952000, "millennia": 31556952000,
    }
    
    # FREQUENCY CONVERSIONS (to Hz base)
    frequency_to_hz = {
        "hz": 1, "hertz": 1,
        "khz": 1000, "kilohertz": 1000,
        "mhz": 1000000, "megahertz": 1000000,
        "ghz": 1000000000, "gigahertz": 1000000000,
        "thz": 1000000000000, "terahertz": 1000000000000,
        "rpm": 1/60, "revolutionsperminute": 1/60, "revpermin": 1/60,
        "rps": 1, "revolutionspersecond": 1, "revpersec": 1,
        "cps": 1, "cyclespersecond": 1,
        "cpm": 1/60, "cyclesperminute": 1/60,
        "bpm": 1/60, "beatsperminute": 1/60,
    }
    
    # ANGLE CONVERSIONS (to degrees base)
    angle_to_degrees = {
        "deg": 1, "degree": 1, "degrees": 1, "°": 1,
        "rad": 180/math.pi, "radian": 180/math.pi, "radians": 180/math.pi,
        "grad": 0.9, "gradian": 0.9, "gradians": 0.9, "gon": 0.9,
        "turn": 360, "turns": 360, "revolution": 360, "revolutions": 360,
        "arcmin": 1/60, "arcminute": 1/60, "arcminutes": 1/60, "'": 1/60,
        "arcsec": 1/3600, "arcsecond": 1/3600, "arcseconds": 1/3600, '"': 1/3600,
        "mil": 0.05625, "mils": 0.05625, "milliradian": 180/(math.pi*1000),
    }
    
    # ASTRONOMICAL DISTANCE CONVERSIONS (to meters base)
    astro_to_meters = {
        "au": 149597870700, "astronomicalunit": 149597870700, "astronomicalunits": 149597870700,
        "ly": 9460730472580800, "lightyear": 9460730472580800, "lightyears": 9460730472580800,
        "pc": 3.0857e16, "parsec": 3.0857e16, "parsecs": 3.0857e16,
        "kpc": 3.0857e19, "kiloparsec": 3.0857e19, "kiloparsecs": 3.0857e19,
        "mpc": 3.0857e22, "megaparsec": 3.0857e22, "megaparsecs": 3.0857e22,
        "solarsystem": 5.9e12,  # Approximate diameter
        "lightminute": 17987547480, "lightmin": 17987547480,
        "lightsecond": 299792458, "lightsec": 299792458,
        "lighthour": 1079252848800, "lighthr": 1079252848800,
        "lightday": 25902068371200, "ld": 25902068371200,
    }
    
    # DATA/INFORMATION CONVERSIONS (to bits base)
    data_to_bits = {
        "bit": 1, "bits": 1, "b": 1,
        "byte": 8, "bytes": 8, "B": 8,
        "kb": 1000, "kilobit": 1000, "kilobits": 1000,
        "kib": 1024, "kibibit": 1024, "kibibits": 1024,
        "mb": 1000000, "megabit": 1000000, "megabits": 1000000,
        "mib": 1048576, "mebibit": 1048576, "mebibits": 1048576,
        "gb": 1000000000, "gigabit": 1000000000, "gigabits": 1000000000,
        "gib": 1073741824, "gibibit": 1073741824, "gibibits": 1073741824,
        "tb": 1000000000000, "terabit": 1000000000000, "terabits": 1000000000000,
        "tib": 1099511627776, "tebibit": 1099511627776, "tebibits": 1099511627776,
        "pb": 1000000000000000, "petabit": 1000000000000000, "petabits": 1000000000000000,
        "pib": 1125899906842624, "pebibit": 1125899906842624, "pebibits": 1125899906842624,
        "kB": 8000, "kilobyte": 8000, "kilobytes": 8000,
        "KiB": 8192, "kibibyte": 8192, "kibibytes": 8192,
        "mB": 8000000, "megabyte": 8000000, "megabytes": 8000000,
        "MiB": 8388608, "mebibyte": 8388608, "mebibytes": 8388608,
        "gB": 8000000000, "gigabyte": 8000000000, "gigabytes": 8000000000,
        "GiB": 8589934592, "gibibyte": 8589934592, "gibibytes": 8589934592,
        "tB": 8000000000000, "terabyte": 8000000000000, "terabytes": 8000000000000,
        "TiB": 8796093022208, "tebibyte": 8796093022208, "tebibytes": 8796093022208,
    }
    
    # ELECTRICAL CONVERSIONS (context sensitive - basic ones only)
    electrical_basic = {
        ("mv", "v"): lambda x: x / 1000,
        ("v", "mv"): lambda x: x * 1000,
        ("kv", "v"): lambda x: x * 1000,
        ("v", "kv"): lambda x: x / 1000,
        ("ma", "a"): lambda x: x / 1000,
        ("a", "ma"): lambda x: x * 1000,
        ("ka", "a"): lambda x: x * 1000,
        ("a", "ka"): lambda x: x / 1000,
        ("mohm", "ohm"): lambda x: x / 1000,
        ("ohm", "mohm"): lambda x: x * 1000,
        ("kohm", "ohm"): lambda x: x * 1000,
        ("ohm", "kohm"): lambda x: x / 1000,
    }
    
    # SOUND LEVEL - Decibels (logarithmic scale - special handling)
    if from_norm == "db" and to_norm == "bel":
        return {"value": value, "from": from_unit, "to": to_unit, "result": value / 10}
    elif from_norm == "bel" and to_norm == "db":
        return {"value": value, "from": from_unit, "to": to_unit, "result": value * 10}
    
    # HEAT/SPICE LEVEL - Scoville Scale (linear conversions only)
    scoville_conversions = {
        ("shu", "scoville"): lambda x: x,
        ("scoville", "shu"): lambda x: x,
        ("scovilleheatunit", "scoville"): lambda x: x,
        ("scoville", "scovilleheatunit"): lambda x: x,
    }
    
    # ACCELERATION/GRAVITY CONVERSIONS (to m/s² base)
    acceleration_to_mss = {
        "ms2": 1, "m/s2": 1, "meterpersquaresecond": 1, "mps2": 1,
        "g": 9.80665, "gforce": 9.80665, "earthgravity": 9.80665, "standardgravity": 9.80665,
        "gal": 0.01, "galileo": 0.01,  # Used in geophysics
        "fps2": 0.3048, "ft/s2": 0.3048, "footpersquaresecond": 0.3048,
        "kmhs": 0.277778, "km/h/s": 0.277778,
        "mphs": 0.44704, "mi/h/s": 0.44704,
    }
    
    # Try to find conversion in respective category
    categories = [
        (temp_conversions, None),
        (electrical_basic, None),
        (scoville_conversions, None),
        (mass_to_grams, mass_to_grams),
        (speed_to_ms, speed_to_ms),
        (energy_to_joules, energy_to_joules),
        (power_to_watts, power_to_watts),
        (pressure_to_pascals, pressure_to_pascals),
        (volume_to_liters, volume_to_liters),
        (time_to_seconds, time_to_seconds),
        (frequency_to_hz, frequency_to_hz),
        (angle_to_degrees, angle_to_degrees),
        (astro_to_meters, astro_to_meters),
        (data_to_bits, data_to_bits),
        (acceleration_to_mss, acceleration_to_mss),
    ]
    
    # Check direct conversions first (temperature, electrical, scoville)
    direct_key = (from_norm, to_norm)
    reverse_key = (to_norm, from_norm)
    
    for category, base_dict in categories:
        if base_dict is None:  # Direct conversion category
            if direct_key in category:
                try:
                    result = category[direct_key](value)
                    return {"value": value, "from": from_unit, "to": to_unit, "result": result}
                except Exception as e:
                    return {"error": f"Conversion error: {str(e)}"}
            elif reverse_key in category:
                try:
                    result = 1 / category[reverse_key](1/value) if value != 0 else 0
                    return {"value": value, "from": from_unit, "to": to_unit, "result": result}
                except Exception as e:
                    return {"error": f"Conversion error: {str(e)}"}
        else:  # Base unit conversion category
            if from_norm in base_dict and to_norm in base_dict:
                try:
                    # Convert to base unit, then to target unit
                    base_value = value * base_dict[from_norm]
                    result = base_value / base_dict[to_norm]
                    # Round appropriately based on magnitude
                    if abs(result) >= 1000 or abs(result) <= 0.001:
                        result = round(result, 6)
                    else:
                        result = round(result, 8)
                    return {"value": value, "from": from_unit, "to": to_unit, "result": result}
                except Exception as e:
                    return {"error": f"Conversion error: {str(e)}"}
    
    # If no conversion found
    return {
        "error": f"Conversion from '{from_unit}' to '{to_unit}' not supported. "
                f"Supported categories: temperature, mass, speed, energy, power, pressure, volume, "
                f"time, frequency, angles, astronomical distances, data/storage, electrical basics, "
                f"acceleration/gravity, sound (dB), and heat/spice (Scoville). "
                f"For distance/length conversions, use convert_land_unit."
    }