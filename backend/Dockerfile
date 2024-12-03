# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Expose port 8000 for the FastAPI app
EXPOSE 8000

# Define environment variable
ENV NAME QAirline

# Run the FastAPI app
CMD ["uvicorn", "app.main:app", "--reload", "--log-level", "debug", "--host", "0.0.0.0", "--port", "8000"]