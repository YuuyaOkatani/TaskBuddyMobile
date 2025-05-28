# Demo


https://github.com/user-attachments/assets/0037fe45-7edf-40c4-9cb8-bfefd2fd2783



# Step-by-Step Guide to Use the Project

This guide outlines the necessary steps to run the project locally.

## Prerequisites

* [Git](https://git-scm.com/) installed on your computer.
* [Node.js](https://nodejs.org/) (LTS version recommended) and [npm](https://www.npmjs.com/) (installed with Node.js).
* [Expo CLI](https://docs.expo.dev/get-started/installation/) installed globally:
    ```bash
    npm install -g expo-cli
    ```
* A [Firebase](https://firebase.google.com/) account to obtain the configuration keys.

## Steps

1.  **Clone the repository:**
    Open your terminal or command prompt and navigate to the directory where you want to clone the project. Run the following command:
    ```bash
    git clone https://github.com/YuuyaOkatani/TaskBuddyMobile.git
    ```

2.  **Install dependencies:**
    Navigate to the project directory that was cloned:
    ```bash
    cd TaskBuddyMobile
    ```
    Then, install the project dependencies using npm:
    ```bash
    npm i --legacy-peer-deps
    ```
    This command will download and install all the libraries listed in the `package.json` file.

3.  **Configure Firebase keys:**
    Create a file named `.env` in the root of your project. Inside this file, you will need to add your Firebase project's configuration keys. The content of the `.env` file should look something like this (replace with your own keys):
    ```
    FIREBASE_API_KEY=YOUR_API_KEY
    FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
    FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
    FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
    FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
    FIREBASE_APP_ID=YOUR_APP_ID
    # Add other Firebase configurations as needed
    ```
    **Important:** Do not share your `.env` file and make sure it is listed in your `.gitignore` file to prevent the keys from being committed to the repository.

4.  **Start the Expo app for the web:**
    To run the application in your web browser, execute the following command:
    ```bash
    npx expo start --web
    ```
    This command will start the Expo development server and automatically open the application in your default web browser.

## Ready to Use!

With the steps above completed, your application should be running in your web browser. You can now start exploring and using the project!
