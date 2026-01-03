/*
todo js: try [login] with using localstorage not API :)
todo js : when i register the first time -> already set the inputs of the form of the logIn with the data 
todo js  : for password .. hide and show with an eye :)
*/
// ?================> Global <=========================

const inputs = document.querySelectorAll("input");//[input[0] , input[1] , .....]  // nodelist : not an array
//1- need to convert inputs -> array -> to use the array methods i need :)
const inputsArray = Array.from(inputs);
const formElement = document.querySelector("form");
let isValid = false;



// !================> when start <=========================


// *================> Events <=========================

formElement.addEventListener("submit", function (event) {
    event.preventDefault(); // prevent reloading of the form ^^

    if (isValid) {
        setForm();
    }
});
formElement.addEventListener("input", function (e) {

    generalValidate(e.target);//one time for each input i write in + the [invalid-feedback] msg will appear f0r the input i write in onlyyyyy :)

    //for check [all inputs] are validated or no
    // isValid = Array.from(inputs).every((input)=>generalValidate(input));//wrong .. the call will happen else
    isValid = inputsArray.every((input) => input.classList.contains("is-valid"));// generalValidate will be called once above only 
});


// !================> functions <=========================
function setForm() {
    const user = {
        "email": inputs[0].value,
        "password": inputs[1].value

    }
    console.log(user);
    login(user);

}
async function login(userData) {
    showLoader();
    const option = {
        method: "post",
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }

    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`, option);
        const data = await response.json();

        if ( data.statusMsg !== "fail" || data.message === "success") {
            localStorage.setItem('user-token', data.token);
            location.href = "./home.html";
        }
        else {
            showError(data.message || 'Login failed');
        }

    } catch (error) {
        showError('Network error');
        console.error(error);
    } finally {
        hideLoader(); // always hides
    }
}

function showError(message) {
    document.getElementById("login-msg").innerHTML = message;
}

// ===================
function showLoader() {
    document.querySelector(".loading").classList.remove("d-none");

}
function hideLoader() {
    document.querySelector(".loading").classList.add("d-none");

}

// ================> validation <=========================
const Regexes = {
    "email": /^[a-zA-Z0-9.-_]+@[a-zA-Z]+\.com$/, //nora.azab135@gmail.com
    "password": /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z@#$%&-_\d]{8,}$/,//Minimum eight characters, at least one letter and one number:

}
function generalValidate(input) {

    // console.log(input.getAttribute("id"));
    const regexName = input.getAttribute("id");

    // console.log(input.value);
    // console.count("validate called")

    //const .... because  new execution context will each timewill be created :)
    const isValidated = Regexes[regexName].test(input.value.trim());// T|F
    if (regexName === "password") {
        const msgInvalid = `invalid-msg-${regexName}`;
        document.getElementById(`${msgInvalid}`).classList.toggle("d-none", isValidated)

    }
    input.classList.toggle("is-invalid", !isValidated); // if validated -> by force delete (is-invalid , false)
    input.classList.toggle("is-valid", isValidated);

    return isValidated;

}
