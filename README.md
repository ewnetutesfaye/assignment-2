# assignment-2
 Feature Flicks - The Cinema


 requirements

Requirements:
Node.js: Ensure Node.js is installed on your system as it comes with npm (Node Package Manager), which is needed to manage the dependencies.

React Version: The application is built on React version 18.2.0.

Additional Dependencies: The application relies on other libraries and tools such as axios for making HTTP requests, bootstrap and react-bootstrap for styling, react-router-dom for routing, and testing libraries like @testing-library/react.

Steps to Run the Application:
Clone the Repository: First, you need to clone the application repository to your local machine.

Navigate to the Project Directory: Use the command line to navigate into the project directory.

Install Dependencies: Run the command npm install to install all the dependencies listed in the provided JSON file.

Start the Development Server: Run the command npm start to start the development server. This will compile and serve the application, usually opening it in a new browser window at http://localhost:3000/.

Avoid CORS Conflicts: To handle CORS issues during development, you can install the Allow CORS: Access-Control-Allow-Origin extension for Chrome. Simply install it and turn it on to allow cross-origin requests.
I didn't have to modify the vite.config.js file, and instead, I managed to handle the CORS policy via a Chrome extension, which simplifies the process.


Overview
This project is a cinema booking system, where users can browse through a list of screenings, book tickets, and view a confirmation receipt. The components are built using React, and the styling is done using plain CSS and Bootstrap.

-------- Components ------
 BookingForm
This component allows users to book tickets for a screening. It includes a form with fields for entering the customer's first name, last name, age, and seat number. The available seats are dynamically generated, and the "Book" button is disabled if all fields are not filled out. Booked customers are listed below the form, and individual bookings can be removed.

Filter
A simple filter component designed to filter a list by categories. It's implemented as a drop-down select element that shows all categories plus an "All" option. The selected category is used to filter items elsewhere in the application, making this a reusable, flexible component for different parts of the site.

Receipt
A component for displaying the booking receipt. This includes information about the booking, though the specific details are not shown in the code snippet. It serves as a template to provide users with a summary of their booking and can be customized to show relevant details.

ScreeningsList
This component lists all the screenings available at the cinema. It includes a title, image, subtitle, text, and "BOOK" button for each screening. The posters' addresses are formed by combining a base URL with the posterImage of each movie. The user can click the "BOOK" button to proceed with booking a ticket for the selected screening.

Seat
The Seat component represents a clickable seat in a cinema auditorium. It takes the seat number and a callback function onSelect, which is called when the seat is clicked. This allows the user to select a specific seat when booking, and the component can be used to render a graphical representation of the seating arrangement.

------ tools -----------
utilizing axios to fetch data from the 'cinema-rest' API. All functions call a handleResponse function, which takes an endpoint and returns a Promise for the requested data. In the case of an error, the error is logged to the console, and the Promise is rejected. The functions cover a wide range of data fetching, from bookings and seats to movies and categories, thereby acting as a central data-fetching hub for various components in the application.


-------- views  ------
BookingPage:
The BookingPage component in React is designed for booking seats in a movie theater. It fetches data about occupied seats, auditoriums, and all seats, and displays them to the user. Users can add and remove people, select seats, and proceed with their booking. The page includes functions to calculate prices based on age, generate booking numbers, and navigate to a receipt page upon order completion.

Home:
The Home component acts as the main landing page, displaying a list of movie screenings. It fetches data about screenings, movies, auditoriums, and categories, allowing users to filter the screenings by category. If there's an error in fetching the data, an alert message is displayed. The use of react-bootstrap gives the component a structured layout.

ReceiptPage:
The ReceiptPage component shows the final booking confirmation, displaying details like movie name, date, time, auditorium, screening ID, total price, and booking number. It also lists all the customers booked with their corresponding seat numbers and prices. A note at the end informs the user that payment will be done at the cinema, instructing them to show their booking number upon arrival.
