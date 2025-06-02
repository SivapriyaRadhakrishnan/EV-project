# Summary

In this project, I developed a complete end-to-end web application for charging station management and location-based recommendations, integrating both visual UI and backend intelligence. The goal was to simplify the management of electric vehicle (EV) charging stations, while also delivering a smooth, user-friendly experience with real-time map visualization, filtering, and station tracking.On the frontend, I built a responsive single-page application using  Vue 3 and  Bootstrap 5, allowing users to register, log in, and manage charging stations through an intuitive interface. Key UI features include an interactive map powered by Leaflet.js and filter panels with support for connector types, power range, and station status.The backend is powered by Node.js and Express, featuring a secure JWT-based authentication system and RESTful APIs for station management. All user and station data is stored in  MongoDB Atlas, and the app was deployed using  Render.
# Live Website:
Anyone can visit and use the deployed application at https://ev-project-frontend.onrender.com without needing to set it up locally.
# Requirements

| Requirement                | Used For                                     |
| -------------------------- | -------------------------------------------- |
| **Node.js** `>= 16.x`      | Required for both frontend and backend       |
| **NPM** or **Yarn**        | For installing dependencies                  |
| **MongoDB Atlas**          | Cloud database (you’ll provide your own URI) |
| **Render.com account**     | For backend deployment                       |
| **AWS account** (optional) | For frontend deployment using S3/CloudFront  |
| **Git**                    | To clone the repository and track code       |
| **Vue CLI** (optional)     | If you're serving frontend locally           |

# Environment Variables

Make sure .env is created in charging-station-backend/ with:
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret_key

# Repository Structure

ev-charging-station/
├── charging-station-backend/       # Node.js + Express backend
│   ├── server.js                   # Main entry point
│   ├── models/                     # Mongoose models (User, Station)
│   ├── routes/                     # API routes (auth, stations)
│   ├── controllers/                # Business logic for each route
│   ├── middleware/                 # JWT authentication middleware
│   └── package.json                # Backend dependencies
│
├── charging-station-frontend/      # Vue 3 frontend
│   ├── src/
│   │   ├── components/             # Vue components (Login, MapView, ChargerList, etc.)
│   │   ├── router/                 # Vue Router configuration
│   │   └── App.vue                 # Main app component
│   ├── public/                     # Public assets and index.html
│   └── package.json                # Frontend dependencies
│
├── .gitignore                      # Ignore node_modules, .env, etc.
├── README.md                       # Project documentation


# Note:"The first load might take a few seconds as the server wakes up."

# Screenshot of Login page
![image alt](https://github.com/SivapriyaRadhakrishnan/EV-project/blob/9f315bef74224c646c5322e0bac0f22f8bf605ac/Screenshot%202025-06-02%20125427.png)
# Screenshot of Register
![image alt](https://github.com/SivapriyaRadhakrishnan/EV-project/blob/4c14227282e656540129684f108a461e91b75213/Screenshot%202025-06-02%20125447.png)
# Screenshot of Homepage
The Home Page displays a filter panel to search charging stations by status, connector type, and power output, along with a table listing all available charging stations and their details.
![image alt](https://github.com/SivapriyaRadhakrishnan/EV-project/blob/97a1ea1c9687c651fc36b4157e5f190ef2e92320/charging-station-backend/Screenshot%202025-06-01%20000736.png)
# Screenshot of View Map
The View Map page displays all onboarded charging stations on an interactive map, allowing users to visually explore their locations in real time.
![image alt](https://github.com/SivapriyaRadhakrishnan/EV-project/blob/626a13f3ae454bdc78c622a36cfec375d3d3b2b8/Screenshot%202025-06-01%20001426.png)
# Screenshot of Charging Station
The Charging Station page allows users to add, edit, or delete EV charging stations, and view all station details in a structured table format with a modern UI.
![image alt](https://github.com/SivapriyaRadhakrishnan/EV-project/blob/87a135487fd5ddf5c3bccc160a3ee19d248ba169/Screenshot%202025-06-02%20125401.png)



