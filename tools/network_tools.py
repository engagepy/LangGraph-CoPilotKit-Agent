import requests
from typing import Dict

def get_ip_info() -> Dict:
    """Get information about the current IP address."""
    try:
        # Using httpbin.org (free, no API key required, more reliable)
        response = requests.get("https://httpbin.org/ip", timeout=10)
        if response.status_code == 200:
            data = response.json()
            ip_origin = data.get("origin", "")
            print(f"Debug - IP origin from httpbin: {ip_origin}")
            
            # Handle case where origin might be comma-separated (multiple IPs)
            if "," in ip_origin:
                ip = ip_origin.split(",")[0].strip()  # Take the first IP
            else:
                ip = ip_origin
            
            print(f"Debug - Using IP for geo lookup: {ip}")
            
            # Get additional location info using a different service
            try:
                geo_url = f"https://free.freeipapi.com/api/json/{ip}"
                print(f"Debug - Calling geo API: {geo_url}")
                geo_response = requests.get(geo_url, timeout=10)
                print(f"Debug - Geo API status: {geo_response.status_code}")
                
                if geo_response.status_code == 200:
                    geo_data = geo_response.json()
                    print(f"Debug - Geo API response: {geo_data}")
                    
                    if geo_data and isinstance(geo_data, dict):
                        info = geo_data  # API returns a single dict, not an array
                        return {
                            "ip": info.get("ipAddress", ip),
                            "ip_version": info.get("ipVersion", ""),
                            "city": info.get("cityName", "Unknown"),
                            "region": info.get("regionName", "Unknown"),
                            "country": info.get("countryName", "Unknown"),
                            "country_code": info.get("countryCode", "Unknown"),
                            "continent": info.get("continent", "Unknown"),
                            "continent_code": info.get("continentCode", "Unknown"),
                            "capital": info.get("capital", "Unknown"),
                            "latitude": info.get("latitude", "Unknown"),
                            "longitude": info.get("longitude", "Unknown"),
                            "timezone": ", ".join(info.get("timeZones", ["Unknown"])),
                            "currencies": ", ".join(info.get("currencies", ["Unknown"])),
                            "languages": ", ".join(info.get("languages", ["Unknown"])),
                            "asn": info.get("asn", "Unknown"),
                            "isp": info.get("asnOrganization", "Unknown"),
                            "phone_codes": ", ".join(map(str, info.get("phoneCodes", ["Unknown"])))
                        }
                    elif geo_data and isinstance(geo_data, list) and len(geo_data) > 0:
                        info = geo_data[0]  # Fallback for array format
                        return {
                            "ip": info.get("ipAddress", ip),
                            "ip_version": info.get("ipVersion", ""),
                            "city": info.get("cityName", "Unknown"),
                            "region": info.get("regionName", "Unknown"),
                            "country": info.get("countryName", "Unknown"),
                            "country_code": info.get("countryCode", "Unknown"),
                            "continent": info.get("continent", "Unknown"),
                            "continent_code": info.get("continentCode", "Unknown"),
                            "capital": info.get("capital", "Unknown"),
                            "latitude": info.get("latitude", "Unknown"),
                            "longitude": info.get("longitude", "Unknown"),
                            "timezone": ", ".join(info.get("timeZones", ["Unknown"])),
                            "currencies": ", ".join(info.get("currencies", ["Unknown"])),
                            "languages": ", ".join(info.get("languages", ["Unknown"])),
                            "asn": info.get("asn", "Unknown"),
                            "isp": info.get("asnOrganization", "Unknown"),
                            "phone_codes": ", ".join(map(str, info.get("phoneCodes", ["Unknown"])))
                        }
                    else:
                        return {
                            "ip": ip,
                            "message": "IP address retrieved successfully, but location details unavailable - unexpected response format"
                        }
                else:
                    # Fallback to basic IP info if geo lookup fails
                    return {
                        "ip": ip,
                        "message": f"IP address retrieved successfully, but location details unavailable due to API error: {geo_response.status_code}"
                    }
            except Exception as e:
                # Fallback to basic IP info if geo lookup fails
                return {
                    "ip": ip,
                    "message": f"IP address retrieved successfully, but location details unavailable due to error: {str(e)}"
                }
        else:
            return {"error": f"Failed to get IP info: {response.status_code}"}
    except Exception as e:
        return {"error": f"Error getting IP info: {str(e)}"} 