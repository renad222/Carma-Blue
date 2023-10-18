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
const firstFormRef = database.ref("firstForm");

const form = document.getElementById('form');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const phone = document.getElementById('phone');

form.addEventListener('submit', e => {
    e.preventDefault();
    checkInputs();

    // After input validation, save the data and navigate to the next page if there are no errors
    if (document.querySelectorAll('.error').length === 0) {
        saveFormData()
            .then(() => {
                // Data saved successfully, navigate to the next page
                window.location.href = 'index3.html';
            })
            .catch(error => {
                // Handle errors here, e.g., display an error message to the user
                console.error('Error saving data:', error);
            });
    }
});

function checkInputs() {
    validateFirstName();
    validateLastName();
    validateEmail();
    validatePhone();
}

async function saveFormData() {
    const formData = {
        firstname: firstname.value.trim(),
        lastname: lastname.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim()
    };

    const dataRef = ref(database, 'formResponses');

    try {
        await push(dataRef, formData);
        console.log('Data saved successfully');
    } catch (error) {
        throw error;
    }
}

// Function to set error
function setErrorFor(input, message) {
    const information = input.parentElement; // Targets .info
    const small = information.querySelector('small');

    // Adds error message in our small tag
    small.innerText = message;

    // Shows error (red color and exclamation mark)
    information.classList.remove('success');
    information.classList.add('error');
}

// Shows success (green color and check) when condition met
function setSuccessFor(input) {
    const information = input.parentElement;
    information.classList.remove('error');
    information.classList.add('success');
}

function validateFirstName() {
    const firstnameValue = firstname.value.trim();
    if (firstnameValue === '') {
        setErrorFor(firstname, 'Name cannot be blank');
    } else if (!isValidFirstName(firstnameValue)) {
        setErrorFor(firstname, 'Invalid name [only letters allowed]');
    } else {
        setSuccessFor(firstname);
    }
}

function validateLastName() {
    const lastnameValue = lastname.value.trim();
    if (lastnameValue === '') {
        setErrorFor(lastname, 'Name cannot be blank');
    } else if (!isValidLastName(lastnameValue)) {
        setErrorFor(lastname, 'Invalid name [only letters allowed]');
    } else {
        setSuccessFor(lastname);
    }
}

function validateEmail() {
    const emailValue = email.value.trim();
    if (emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
    } else if (!isValidEmail(emailValue)) {
        setErrorFor(email, 'Invalid email address');
    } else {
        setSuccessFor(email);
    }
}

function validatePhone() {
    const phoneValue = phone.value.trim();
    if (phoneValue === '') {
        setErrorFor(phone, 'Phone cannot be blank');
    } else if (!isValidPhone(phoneValue)) {
        setErrorFor(phone, 'Invalid [min number of digits=9, max=15]');
    } else {
        setSuccessFor(phone);
    }

}

function isValidFirstName(firstname) {
    return /^[a-zA-Z\s]+$/.test(firstname);
}

function isValidLastName(lastname) {
    return /^[a-zA-Z\s]+$/.test(lastname);
}

function isValidEmail(email) {
    // Regex for email validation
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
}

function isValidPhone(phone) {
    // Regex for phone validation (max 15 digits)
    return /^(\+\d{1,4}\s?)?(\d{9,15})$/.test(phone);
}
