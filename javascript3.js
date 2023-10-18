import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDDd4fWG6CTtjRcbsP-MDBKAToM2ya9IUs",
    authDomain: "carma-blue-6991e.firebaseapp.com",
    projectId: "carma-blue-6991e",
    storageBucket: "carma-blue-6991e.appspot.com",
    messagingSenderId: "288486090590",
    appId: "1:288486090590:web:b05a34e6fdecee9fd891cf"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
  
  const form = document.getElementById('form');
  const salary = document.getElementById('salary');
  const monthly = document.getElementById('monthly');
  const yearlyrent = document.getElementById('yearlyrent');
  const startdate = document.getElementById('startdate');
  
  form.addEventListener('submit', e => {
    e.preventDefault();
    checkInputs();

    if (document.querySelectorAll('.error').length === 0) {
        saveFormData()
            .then(() => {
                window.location.href = 'index4.html';
            })
            .catch(error => {
                console.error('Error saving data:', error);
            });
    }
});

function checkInputs() {
    validateInput(salary, 'Salary', isValidAmount);
    validateInput(monthly, 'Monthly Obligation', isValidAmount);
    validateInput(yearlyrent, 'Yearly Rent Amount', isValidAmount);
    validateInput(startdate, 'Rent Start Date', isValidDate);
}

function validateInput(input, fieldName, validator) {
    const inputValue = input.value.trim();
    if (inputValue === '') {
        setErrorFor(input, `${fieldName} cannot be blank`);
    } else if (!validator(inputValue)) {
        setErrorFor(input, `Invalid ${fieldName}.`);
    } else {
        setSuccessFor(input);
    }
}

async function saveFormData() {
    const formData = {
        salary: salary.value.trim(),
        monthly: monthly.value.trim(),
        yearlyrent: yearlyrent.value.trim(),
        startdate: startdate.value.trim()
    };

    const dataRef = ref(database, 'form2Responses'); // Path for the second form

    try {
        await push(dataRef, formData);
        console.log('Data saved successfully');
    } catch (error) {
        throw error;
    }
}

// Function to set error
function setErrorFor(input, message) {
    const information = input.parentElement;
    const small = information.querySelector('small');
    small.innerText = message;
    information.classList.remove('success');
    information.classList.add('error');
}

// Shows success (green color and check) when the condition is met
function setSuccessFor(input) {
    const information = input.parentElement;
    information.classList.remove('error');
    information.classList.add('success');
}

// Regex conditions
function isValidAmount(amount) {
    return /^(\w{3}\s?)?(\$|€|£|¥)?\s?(\d+(?:,\d{3})*(?:\.\d{1,2})?)$/.test(amount);
}

function isValidDate(date) {
    const inputDate = new Date(date);
    if (isNaN(inputDate.getTime())) {
        return false; // Invalid date format
    }

    const minimumDate = new Date('2023-01-01');
    return inputDate >= minimumDate;
}