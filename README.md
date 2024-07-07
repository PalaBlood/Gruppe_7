# Fridge Finder - Group 07 Software Internship from the Hochschule der Medien

## Project Overview

### Project Name
Fridge Finder

### Description
Fridge Finder is a comprehensive household management tool designed to help users track groceries, input recipes, and determine which recipes can be prepared based on the available ingredients.

### Built With
This project utilizes several robust technologies and programming languages:
- **[React](https://reactjs.org/)** - A JavaScript library for creating user interfaces.
- **[Python](https://www.python.org/)** - Version 3.10, a versatile programming language suited for a variety of applications.
- **[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)** - Essential for adding dynamic and interactive elements to web pages.
- **[Node.js](https://nodejs.org/en/)** - Version 20, facilitates server-side JavaScript execution.

## Getting Started

### Prerequisites
Ensure you have the following installed and set up:
- **Git:** Ensure [Git](https://git-scm.com/downloads) is installed on your machine for version control.
- **Node.js and Python:** Both [Node.js](https://nodejs.org/en/) and [Python](https://www.python.org/downloads/) should be installed.


### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/PalaBlood/Gruppe_7.git
      ```
3. Install project dependencies:
      ```sh
      pip install -r requirements.txt
      npm install react-scripts
      ```
   
### Set up Gcloud & Firebase
Choose one of the following options to set up Gcloud:
#### 1. Option for gcloud
* **Set up your Gcloud account**: Follow the guidelines in the document ["Deployment on GCP WS 20-21"](URL-to-PDF) for detailed instructions.

#### 2. Option for gcloud and firebase
1. **Set up a new gcloud project**: Initialize a new project by visiting [Google Cloud Console](https://console.cloud.google.com).
2. **Install Gcloud SDK**: Follow the instructions on the [Gcloud SDK installation page](https://cloud.google.com/sdk/docs/install?hl=de) to install the SDK.
3. Connect your Google Account
4. Set up a database in Cloud SQL
5. Create database within the database instance
6. Create an Bucket.
7. import the dumnpfile at "mysql/SQL-DUMP-v4.sql" into your bucket in Gcloud
8. Import SQL file into database instance
9. Connect to database with gcloud
      ```sh
     gcloud sql connect sopra-db-g07 --user=root --quiet
      ```
10. Activate "Cloud SQL"" API in Gcloud
11. Create an app in Gcloud App Engine
12. Install necessary Gcloud components:
      ```sh
      gcloud components install app-engine-python
      ```
13. Deploy your backend from the "src" directory:
      ```sh
      gcloud app deploy
      ```
14. Open your backend in a browser:
      ```sh
      gcloud app browse
      ```
15. copy your backend URL.
16. **Set up a new firebase project**: Initialize a new project by visiting [Google Firebase Console](https://console.firebase.google.com/).
16. authorize your domain
16. Deploy your frontend:
      ```sh
      gcloud app deploy
      ```
17. Open your frontend in a browser:
      ```sh
      gcloud app browse
      ```
18. Deploy dispatch.yaml:
       ```sh
      gcloud app deploy dispatch.yaml
      ```
19. Verify that the application is running properly.

### Authors
Group 07 - Software Internship participants
- Michel Christian David Finger
- Kartal Ilker Güney
- Halil Cömert
- Tom Schönfeld
- Kudret Kilic
- Robin Krauß


