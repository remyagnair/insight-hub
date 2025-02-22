# Use the official Python image
FROM python:3.9

# Set the working directory inside the container
WORKDIR /app

# Copy the application files
COPY . /app

# Install dependencies
RUN pip install --upgrade pip && pip install -r requirements.txt

# Set environment variables (Cloud Run will inject these)
ENV GOOGLE_APPLICATION_CREDENTIALS="/tmp/key.json"

# Expose the application port (Cloud Run uses 8080)
EXPOSE 8080

# Start the application
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "app:app"]
