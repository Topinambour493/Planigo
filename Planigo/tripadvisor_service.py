import requests
from django.conf import settings

BASE_URL = settings.TRIPADVISOR_BASE_URL
API_KEY = settings.TRIPADVISOR_API_KEY

def fetch_attraction(location_id):
    url = f"{BASE_URL}/location/{location_id}/details"
    params = {"key": API_KEY}
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()

def fetch_photos(location_id):
    url = f"{BASE_URL}/location/{location_id}/photos"
    params = {"key": API_KEY}
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json().get("data", [])
