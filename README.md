# README for Fridge Finder - Group 07 Software Internship

## Project Overview

### Project Name
Fridge Finder

# Description
Fridge Finder is a comprehensive household management tool designed to help users track groceries, input recipes, and determine which recipes can be prepared based on the available ingredients.

# Built With
This project leThis project utilizes several robust technologies and programming languages:
- **[React](https://reactjs.org/)** - A JavaScript library for creating user interfaces.
- **[Python](https://www.python.org/)** - Version 3.10, a versatile programming language suited for a variety of applications.
- **[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)** - Essential for adding dynamic and interactive elements to web pages.
- **[Node.js](https://nodejs.org/en/)** - Version 20, facilitates server-side JavaScript execution.

# Getting Started
## Installation
1. Get a API Key
2. Clone the repo
      ```sh
      git clone https://github.com/PalaBlood/Gruppe_7.git
      ```
3. Install requirements.txt
      ```sh
      pip install -r requirements.txt
      ```
4. Install React
      ```sh
      npm install react-scripts
      ```
4. Install Material-UI and Emotion
      ```sh
     npm install @mui/material @emotion/react @emotion/styled
      ```
5. **Install Node.js**: Visit [Node.js official website](https://nodejs.org/en) to download and install.
6. **Install Python**: Download and install Python by visiting the [Python Downloads page](https://www.python.org/downloads/).

## Set up Gcloud
### 1. Option
* **Set up your Gcloud account**: Follow the guidelines in the document ["Deployment on GCP WS 20-21"](URL-to-PDF) for detailed instructions.

### 2. Option
1. **Set up a new project**: Initialize a new project by visiting [Google Cloud Console](https://console.cloud.google.com).
2. **Install Gcloud SDK**: Follow the instructions on the [Gcloud SDK installation page](https://cloud.google.com/sdk/docs/install?hl=de) to install the SDK.
3. Connect your Google Account
4. Set up a database in Cloud SQL
5. Create database within database instance
6. Create an Bucket
7. import the database at "mysql/SQL-DUMP-v4.sql" to your bucket in Gcloud
8. Import SQL file into database instance
9. Connect to database with gcloud
      ```sh
     gcloud sql connect sopra-db-g07 --user=root --quiet
      ```
10. Activate "Cloud SQL"" API in Gcloud
11. Create an app in Gcloud App Engine
12. Install Gcloud components
      ```sh
      gcloud components install app-engine-python
      ```
13. Deploy your backend in "src"
      ```sh
      gcloud app deploy
      ```
14. Open your backend in Browser
      ```sh
      gcloud app browse
      ```
15. copy your backend url
16. Go to frontend/src/API/SmartFridgeAPI.js and replace "https://smartfridge-428113.ey.r.appspot.com" with your backend URL
      ```sh
      fridgeserverbaseurl = 'https://smartfridge-428113.ey.r.appspot.com/fridge';
      ```
13. Deploy your frontend
      ```sh
      gcloud app deploy
      ```
14. now it should work

