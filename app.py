from flask import Flask, render_template, jsonify
import fetch_data

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/load_data', methods=['GET'])
def load_data():
    # Fetch crypto data
    data = fetch_data.fetch_crypto_data()
    if data:
        # Prepare a simple dictionary of coin prices for display
        prices = {coin['id']: coin['current_price'] for coin in data}
        return jsonify(prices)
    return jsonify({'error': 'No data available'})

if __name__ == '__main__':
    app.run(debug=True)
