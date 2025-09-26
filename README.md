# insight-hub
It provides a clean UI to monitor top coins and is optimized for scalability &amp; automation with GitHub Actions and Pytest

## Features

- **Real-time Data:** Fetch the top 10 high-volume cryptocurrencies.
- **Clean UI:** Built with React JS and Tailwind for a responsive, modern look.
- **BigQuery Integration:** Optionally insert fetched data into a Google BigQuery table.
- **Modular Design:** Separated modules for data fetching, BigQuery operations, and the web application.

## Prerequisites

- **Python 3.7+**
- **pip** (Python package installer)
- A **Google Cloud** account with a BigQuery project set up.
- A **Google Cloud Service Account Key** (downloaded as `key.json`) for BigQuery access.

## Installation

1. **Clone the Repository**
    ```bash
    git clone https://github.com/anooprp/insight-hub.git
    cd insight-hub
    ```

2. **Create a Virtual Environment**

    It's recommended to use a virtual environment to manage dependencies.
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows use: venv\\Scripts\\activate
    ```

3. **Install Dependencies**

    Install the required packages from `requirements.txt`:
    ```bash
    pip install -r requirements.txt
    ```

## Configuration

### Google Cloud Credentials

1. **Obtain a Service Account Key:**
   - Follow the [Google Cloud documentation](https://cloud.google.com/docs/authentication/getting-started) to create a service account and download the key as `key.json`.

2. **Place the Key Safely:**
   - Save the `key.json` file in a secure location outside your repository, or in the project root but add it to your `.gitignore` to avoid committing sensitive information.

3. **Set the Environment Variable:**
   - You can set the environment variable in your shell:
     ```bash
     export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/key.json"
     ```
   - Alternatively, create a `.env` file in the project root (make sure to add `.env` to your `.gitignore`) and use a package like [python-dotenv](https://github.com/theskumar/python-dotenv) to load it:
     ```ini
     # .env file
     GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/key.json
     ```

## Running the Application

1. **Start the Flask Application**

    Make sure your virtual environment is activated and run:
    ```bash
    python app.py
    ```

2. **View in Browser**

    Open your browser and navigate to [http://localhost:5000](http://localhost:5000) to see the dashboard.

3. **Load Data**

    Click the **"Load Crypto Data"** button on the homepage to fetch and display the latest crypto prices. The data is also inserted into BigQuery (if configured).

