# 🚀 Welcome to Chera!

# ------> Setup Instructions

# Pre-installation Requirements

# 1. NodeJs version 19.9.0 must be installed on your machine and added as a PATH variable, you can test this by entering "which node" into your terminal, and it should print out the location of Node on your machine

# 2. You must have Github integrated with your Editor, and must be logged in. Git must also be added as a path variable. To test this, enter "which git" into your terminal. Same thing as Node.

# Initial Set Up Instructions

# 1. Open your machine's terminal, and navigate to the directory called "frontend-react-app"

# 2. Type "yarn install" and press enter -> Your console should begin installing the dependent Javascript libraries into a folder called "node_modules" in the frontend-react-app folder

# 3. When installation has completed, enter "yarn start" into your terminal, this will start the React application. To shut down the application, enter "ctrl" and "c" at the same time into the terminal, or close the terminal window. This is how you will start / shut down the application every time you begin working. It is best practice to start up and shut down the application each day. hello

# ------> Troubleshooting

# 1. Sometimes, your machine will not shutdown the application properly, and when you try to start the application with "npm start" you will receive an error message that the port 3000 is already being used by another application. If this happens, enter in this command "lsof -ti:3000 | xargs kill" and press enter. This is a bash command to tell your machine to shut down the process running on that port.

# ------> Miscellanious

# Docker Commands

build -> docker build --platform linux/amd64 -t pantry-frontend .
run -> docker run pantry-frontend --env PORT=4000 -d -p 3000:3000
