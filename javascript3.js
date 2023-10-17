import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
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

async function saveFormData() {
    const formDataRef = ref(database, 'form_data_second');

    const salaryValue = salary.value.trim();
    const monthlyValue = monthly.value.trim();
    const yearlyrentValue = yearlyrent.value.trim();
    const startdateValue = startdate.value.trim();

    const formData = {
        salary: salaryValue,
        monthly: monthlyValue,
        yearlyrent: yearlyrentValue,
        startdate: startdateValue
    };

    try {
        await push(formDataRef, formData);
        console.log('Data saved successfully');
    } catch (error) {
        console.error('Error saving data:', error);
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