import requests
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from dotenv import load_dotenv
import os

load_dotenv()

API_KEY = os.getenv("REACT_APP_FOOTBALL_API")
MONGO_URI = os.getenv('MONGO_URI')
DATABASE_NAME = os.getenv("DATABASE_NAME")

# -------------- #
# Mongo Connect! #
# -------------- #
client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]

API_BASE_URL = "https://api.football-data.org/v4/competitions"

collections = [
    {"collection_name": "Bundesliga", "sportsId": 2002,
     },
     {"collection_name": "Championship", "sportsId": 2016,},
     {"collection_name": "La Liga", "sportsId": 2014,},
     {"collection_name": "Ligue 1", "sportsId": 2015,},
     {"collection_name": "PremierLeague", "sportsId": 2021,},
     {"collection_name": "Primeira Liga", "sportsId": 2017,},
     {"collection_name": "Serie A", "sportsId": 2019,},
]

def fetch_api_data(competition_id):
    api_url = f"{API_BASE_URL}/{competition_id}/teams"
    API_HEADERS = { "X-Auth-Token": API_KEY }
    try:
        response = requests.get(api_url, headers=API_HEADERS)
        response.raise_for_status()
        data = response.json()
        return data.get("teams", [])
    except requests.RequestException as e:
        print(f"Error fetching API data for competition {competition_id}: {e}")
        return None

# ------------------------------------------------------------------------- #
# Checks whether the previous year exists; for creating new documents in db #
# ------------------------------------------------------------------------- #
def year_exists(collection, competition_id, year):
    previous_year = year - 1
    query = {"sportsId": competition_id, "year": previous_year}
    return collection.find_one(query) is not None

# ---------------------------------------------------------- #
# Updates the collection, but also inserts if year DNE in DB #
# ---------------------------------------------------------- #
def update_mongo_teams(collection_name, competition_id, year):
    collection = db[collection_name]
    print(f"\nUpdating teams in collection {collection_name} for competition {competition_id} and year {year}")

    # If user tries to insert 2044 instead of 2024; return. Needs previous year to exist in order to update. #
    if not year_exists(collection, competition_id, year):
        print(f"Skipping update: Previous year ({year - 1}) does not exist for competition {competition_id}")
        return
    
    # If nothing was found with that competition ID #
    teams = fetch_api_data(competition_id)
    if not teams:
        print("No teams data received; update aborted")
        return
    
    # Updates / Inserts document into collection #
    query = {"sportsId": competition_id, "year": year}
    update = {"$set": {"teams": teams}}
    result = collection.update_one(query, update, upsert=True)

    # Lets user know wtf is going on #
    if result.matched_count > 0:
        print(f"Successfully updated document with sportsId {competition_id} in year {year}")
    elif result.upserted_id:
        print(f"Inserted a new document for sportsId {competition_id} in year {year}")
    else:
        print(f"No document found with sportsId {competition_id} in year {year}")

# --------------- #
# Our main honcho #
# --------------- #
if __name__ == "__main__":
    year = int(input("Enter the year to update (e.g. 2024): ").strip())
    print("\n")

    # Iterates through the collection object created at the top #
    for item in collections:
        collection_name = item["collection_name"]
        competition_id = item["sportsId"]

        if collection_name not in db.list_collection_names():
            print(f"Collection {collection_name} does not exist in the database")
        else:
            update_mongo_teams(collection_name, competition_id, year)

