# hotel-dashboard-app

## Description

This is a simple hotel dashboard app which pulls data from a csv file on server side and displays it on the client side in different types of responsive graphs using Chart.js and react-chartjs-2 libraries. The client side also has a date range selector which helps you to filter data according to the dates provided. It includes tests as well.

## Technologies Used:

- Node.js with Express framework for the backend
- React.js for the frontend

## Usage:

Clone the repository, open your terminal and run the following commands to start the backend server:

```
cd api
npm start
```

After that, open a new terminal and run the following command to start the client React app:
```
cd client
npm start
```
The app will be available at the following URL:
```
http://localhost:3000/
```

## Test:

The tests have been written using Jest. To run the unit tests for the chart components, run the following command:
```
cd client
npm test
```
