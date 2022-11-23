* Our project consists of two member Egert Arr and Hegert Taresalu.
* The project is called RMK-API.


* Our application currently lets users do CRUD operations to hikers,hikes and trails
    
* Application uses node.js with some packages to help make development smooth as possible.
* Project also uses mongoDB, make sure its correctly installed and the service is working

    # Setting up
    * To set up and run the project you need to create the ".env" file in both Backend and Frontend.
    * Follow the ".env.example" file for the correct setup of ".env" files.
    * Find and open the rest-client.js file. Add the correct api_base
    * Find and open the index.js file in the frontend folder and change the port to the backend port in places with "// Here"
    * When successfully configured open the project with the terminal in both frontend and backend, then install packages with "npm i".
    * Then start with "npm start"

    # Backend documentation
    * To see the documentation you first need to set up the app.
    * After the app has been correctly set up, run the app.
    * The documentation is on the address "https://localhost:{BackendPort}/docs/".

    # Frontend documentation
    * to get access to the main page you will need to have finished setting up the project
    * on your browser go to "http://localhost:{BackendPort}/"

    
    # Debugging
    * If "connect ECONNREFUSED" error shows up, make sure mongo is working
    * If it doesnt work then change every field from "localhost" to 0.0.0.0(except rest-client.js)