import pytest
from app import app  # Your Flask app
import fetch_data  # The function that fetches crypto data


@pytest.fixture
def client():
    # Setup a test client for Flask
    with app.test_client() as client:
        yield client


def test_home(client):
    # Test the home route to check if the app loads correctly
    response = client.get('/')
    assert response.status_code == 200


def test_load_data(client):
    # Test the /load_data route that fetches real-time crypto data
    response = client.get('/load_data')

    # Check if the response status is 200 (OK)
    assert response.status_code == 200

    # Check if the response is a JSON object
    response_data = response.get_json()

    # Ensure that the response contains crypto data like Bitcoin and Ethereum
    assert "bitcoin" in response_data
    assert "ethereum" in response_data

    # Optionally check if the price values are present (you can set expected values)
    assert response_data["bitcoin"] > 0
    assert response_data["ethereum"] > 0

