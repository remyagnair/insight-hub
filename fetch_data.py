import requests

def fetch_crypto_data():
    """
    Fetches real-time cryptocurrency prices for the top 10 high-volume coins using the CoinGecko API.
    """
    url = "https://api.coingecko.com/api/v3/coins/markets"
    # Comma-separated list of top 10 coins
    coin_list = "bitcoin,ethereum,solana,cardano,ripple,polkadot,dogecoin,shiba-inu,litecoin,ethereum-classic"
    params = {
        "vs_currency": "usd",
        "ids": coin_list,
        "order": "market_cap_desc",
        "per_page": 10,
        "page": 1,
        "sparkline": False
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching data: {response.status_code}")
        return None
