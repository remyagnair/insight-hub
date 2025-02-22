from google.cloud import bigquery
from datetime import datetime
import os
import json

# Load Google Cloud credentials from GitHub Secret
gcp_credentials = os.getenv("GCP_CREDENTIALS")
if gcp_credentials:
    credentials_path = "/tmp/key.json"
    with open(credentials_path, "w") as key_file:
        key_file.write(gcp_credentials)
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = credentials_path
else:
    raise ValueError("GCP_CREDENTIALS environment variable is missing!")

# Initialize BigQuery client
client = bigquery.Client()

# Get dataset ID from GitHub Secrets (set it in your repository)
DATASET_ID = os.getenv("GCP_DATASET_ID")  # <-- This now comes from GitHub Secrets
if not DATASET_ID:
    raise ValueError("GCP_DATASET_ID environment variable is missing!")

# Define table ID
TABLE_ID = f"{DATASET_ID}.crypto_data.crypto_prices`"

def insert_data_to_bigquery(coins):
    """
    Inserts cryptocurrency price data into BigQuery.
    """
    rows_to_insert = []
    for coin in coins:
        row = {
            "timestamp": datetime.utcnow().isoformat(),
            "coin_name": coin["name"],
            "symbol": coin["symbol"].upper(),
            "price": coin["current_price"]
        }
        rows_to_insert.append(row)

    errors = client.insert_rows_json(TABLE_ID, rows_to_insert)
    if errors:
        print(f"Error inserting rows: {errors}")
    else:
        print("Data inserted successfully.")

