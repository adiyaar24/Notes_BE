## Getting Started

To start with the Notes App we will need to follow the below steps 

## Steps
- Step 1 : Clone this Repository
- Step 2 : Lets start first by installing the required packages for this project . To make it easier we have a magical command that does this job for us . Here you go
  ```bash
  npm install
  ```
- Step 3 : Once the packages are installed , you will need to check my work so I can help you with that , Run the specially crafted command for this project 
 ```bash
  PORT=3001 npm start
  ```
- Step 4 : Start Docker ( the life saviour thing ) and run the below command to make sure you have the DB connected to the Backend of this application
 ```bash
  docker run -d -p 27015:27017 --name my-mongo-container mongo
  ```
- Step 5 : Now, now the most intresting part to see my code in action.. to do that you need to clone the BE Repo 😆
```bash
https://github.com/adiyaar24/notes_FE.git
```
- Step 6 : Follow Step 2 again by navigating to the directory 
- Step 7 : Run this unique command to see everything started 
```bash
npm run dev
```
