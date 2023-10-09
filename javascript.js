const form = document.getElementById('form');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const phone = document.getElementById('phone');

// What happens when we "submit" our form by clicking the button
form.addEventListener('submit', e => {
    // checks inputs and sets errors if needed
    checkInputs();

    // check if there are any error messages to stop the button from submitting
    const errorElements = document.querySelectorAll('.error');
    if (errorElements.length === 0) {
        //allows the form to submit if there is no errors
        return; 
    }
        // Prevent form submission if there are errors
        e.preventDefault(); 
});

function checkInputs() {
    // Getting values from the input and trim to remove whitespace
    const firstnameValue = firstname.value.trim();
    const lastnameValue = lastname.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();

    // Conditions and error messages sent when our conditions are not met
    if (firstnameValue === '') {
        setErrorFor(firstname, 'Name cannot be blank');
    } else if (!isValidFirstName(firstnameValue)) {
        setErrorFor(firstname, 'Invalid name [only letters allowed]');
    } else {
        setSuccessFor(firstname);
    }

    if (lastnameValue === '') {
        setErrorFor(lastname, 'Name cannot be blank');
    } else if (!isValidLastName(lastnameValue)) {
        setErrorFor(lastname, 'Invalid name [only letters allowed]');
    } else {
        setSuccessFor(lastname);
    }

    if (emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
    } else if (!isValidEmail(emailValue)) {
        setErrorFor(email, 'Invalid email address');
    } else {
        setSuccessFor(email);
    }

    if (phoneValue === '') {
        setErrorFor(phone, 'Phone cannot be blank');
    } else if (!isValidPhone(phoneValue)) {
        setErrorFor(phone, 'Invalid [min number of digits=9, max=15]');
    } else {
        setSuccessFor(phone);
    }
}

// Function to set error
function setErrorFor(input, message) {
    const information = input.parentElement; // Targets .info
    const small = information.querySelector('small');

    // Adds error message in our small tag
    small.innerText = message;

    //shows error(red color and exclamation mark)
    information.classList.remove('success');
    information.classList.add('error');
}

//shows success(green color and check) when condition met
function setSuccessFor(input) {
    const information = input.parentElement;
    information.classList.remove('error');
    information.classList.add('success');
}

function isValidFirstName(firstname) {
    return /^[a-zA-Z\s]+$/.test(firstname);
}

function isValidLastName(lastname) {
    return /^[a-zA-Z\s]+$/.test(lastname);
}

function isValidEmail(email) {
    //  regex for email validation
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
}

function isValidPhone(phone) {
    //  regex for phone validation (max 15 digits)
    return /^(\+\d{1,4}\s?)?(\d{9,15})$/.test(phone);
}
