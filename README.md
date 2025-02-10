# Google_flights
Google flights Responsive UI using Reactjs and Material UI .

# ✈️ Google Flights Clone

<img width="959" alt="Google_flights(1)" src="https://github.com/user-attachments/assets/686afb0a-6e7c-4baf-8948-ef860c117b27" />
  
  <img width="959" alt="Google_flights(2)" src="https://github.com/user-attachments/assets/1b750d85-5eab-4fbd-bb41-e0e216a7218f" />

  # LOOM Video DEMO
  https://www.loom.com/share/6089fa766be54fbe88d5ee81e0686873

# Features

- **Flight Search Interface**: Users can search for flights by origin, destination, trip type, flight type, and number of passengers.
- **Flight Results Accordion**: Results are displayed using an accordion UI component that shows the flight date and price, with detailed flight information available in the dropdown.
- **Optimized API Calls**: Memoization and efficient rendering strategies ensure minimal API requests and fast performance.
- **Fully Responsive Design**: Built with Material UI's latest version to ensure the app looks great on all devices.

## 🛠️ Tech Stack

- **React.js**: A JavaScript library for building user interfaces.
- **Material UI v6.1.1**: A popular React UI framework with customizable components.
- **Axios**: Promise-based HTTP client for API calls.
- **RapidAPI Sky Scraper API**: The flight search engine that powers the flight data in this app.

## 📝 How to Install

1. Clone the repository:

   ```bash
   git clone https://github.com/youshouldcodesomething/Google_flights.git
   cd Google_flights
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create an `.env` file in the root directory with your RapidAPI credentials:

   ```env
   REACT_APP_RAPIDAPI_KEY=your_rapidapi_key
   ```

4. Run the app locally:

   ```bash
   npm start/npm run dev
   ```

5. The app will be available at `http://localhost:3000` in your browser.

## 🔍 How It Works

1. **Flight Search**: The user inputs the necessary flight details (origin, destination, dates, etc.) via Material UI's `Autocomplete` and `TextField` components.
2. **API Integration**: Upon submitting the explore, `Axios` fetches flight data from the RapidAPI Sky Scraper API.
3. **Results Display**: The results are shown using Material UI's `Accordion`, where basic flight details (date, price) are shown first. Users can expand to view additional information like departure and arrival times, airline, and flight duration.
4. **Error Handling**: If there's an issue with the API call or data, a `Snackbar` displays an error message, preventing the app from crashing.


  ## ✨ Demo

🚧loom video is here 'https://www.loom.com/share/6089fa766be54fbe88d5ee81e0686873'

## 🤖 Available Scripts

- `npm start`: Runs the app in development mode.
- `npm build`: Builds the app for production.
- `npm test`: Runs unit tests (Jest and React Testing Library).

## 🧩 Project Structure

Here's an overview of the folder structure:

```
├── public
├── src
│   ├── components
│   │   └── FlightResults.tsx  // Accordion component for displaying flights
│   ├── services
│   │   └── api.ts                      // Axios API configuration
│   ├── pages
│   │   └── SearchFlights.tsx            // Main flight search component
│   ├── App.tsx                          // Main App entry point
│   └── index.tsx                        // React DOM entry point
├── .env                                 // API credentials
└── package.json
```

## 📬 Contact
 --- feel free to reach me out on LinkendIn 'https://www.linkedin.com/in/anu-ramesh-21ba501b8/'
 
 
 
