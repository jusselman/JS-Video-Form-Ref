const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPass = document.getElementById('confirmPass');

// If error occurs in input //
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// If success occurs //
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check email with Regex //
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Invalid Email');
    }
}

// Check if passwords match //
function checkPassMatch(password1, password2) {
    if (password1.value !== password2.value) {
        showError(password2, 'Passwords do not match');
    }
}

// Check required fields //
function checkRequired(inputArr) {
    inputArr.forEach((input) => {
        if (input.value.trim() === '') {
            showError(input, `${capitalFirst(input)} is required`);
        } else {
            showSuccess(input);
        }
    })
}

// Check input length //
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${capitalFirst(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${capitalFirst(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

// Fieldname function //
function capitalFirst(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


// Event Listeners //
form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkRequired([username, email, password, confirmPass]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 15);
    checkEmail(email);
    checkPassMatch(password, confirmPass);
});


