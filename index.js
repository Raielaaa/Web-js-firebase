// index.js

// Import necessary Firebase modules
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCzZQNV6vZIG_h_p1-AU-vM1NWxZUNchmA",
    authDomain: "qr-scanner-practice-3.firebaseapp.com",
    databaseURL: "https://qr-scanner-practice-3-default-rtdb.firebaseio.com",
    projectId: "qr-scanner-practice-3",
    storageBucket: "qr-scanner-practice-3.appspot.com",
    messagingSenderId: "818401297745",
    appId: "1:818401297745:web:e7721cfd8052765df7ff70",
    measurementId: "G-X1RFXKFD4B"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get a reference to the database
const database = getDatabase(app);

// Function to fetch and display data from Firebase
function fetchData() {
    // Reference to the 'Book-info' node in the database
    const booksRef = ref(database, 'Book-info');

    // Attach an event listener to listen for changes in the data
    onValue(booksRef, (snapshot) => {
        // Clear existing content
        document.getElementById('txtPlaceholder').innerHTML = '';

        // Iterate through the snapshot to get each book's data
        snapshot.forEach((childSnapshot) => {
            const bookData = childSnapshot.val();

            // Display the book data on the website
            document.getElementById('txtPlaceholder').innerHTML += `
                <p>Book Name: ${bookData.bookName}, Author: ${bookData.bookAuthor}</p>
            `;
            console.log("Book Name: ${bookData.bookName}, Author: ${bookData.bookAuthor}")
        });
    });
}

// Initial fetch when the page loads
fetchData();

// Function to automatically update the content when the database changes
function setupDatabaseListener() {
    const booksRef = ref(database, 'Book-info');
    
    // Listen for changes in the data
    onValue(booksRef, (snapshot) => {
        // Update the content whenever the data changes
        fetchData();
    });
}

// Set up the database listener
setupDatabaseListener();