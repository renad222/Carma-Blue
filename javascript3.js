const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  
  const form = document.getElementById('form');
  const salary = document.getElementById('salary');
  const monthly = document.getElementById('monthly');
  const yearlyrent = document.getElementById('yearlyrent');
  const startdate = document.getElementById('startdate');
  
  form.addEventListener('submit', e => {
      e.preventDefault();
      checkInputs();
  
      // Check if there are any error messages to stop the button from submitting
      const errorElements = document.querySelectorAll('.error');
      if (errorElements.length === 0) {
          // Save the form data to Firebase if there are no errors
          saveFormData();
      }
  });

//using generic validation functions to make it easier unlike code before
// Getting values from the input and putting validation function as an argument too
function checkInputs() {
    validateInput(salary, 'Salary', isValidAmount);
    validateInput(monthly, 'Monthly Obligation', isValidAmount);
    validateInput(yearlyrent, 'Yearly Rent Amount', isValidAmount);
    validateInput(startdate, 'Rent Start Date', isValidDate);
}

// Checks for error and shows message if found and trims whitespace
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

function saveFormData() {
    const formDataRef = db.ref('form_data_second');

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

    formDataRef.push(formData);

    // Optionally, you can redirect to the next page after saving the data
    window.location.href = 'index4.html';
}

// Function to set error
function setErrorFor(input, message) {
    const information = input.parentElement;
    const small = information.querySelector('small');
    small.innerText = message;
    information.classList.remove('success');
    information.classList add('error');
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