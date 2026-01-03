/*
todo js: try [register] and [login] with using localstorage not API :)
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
        "name": inputs[0].value,
        "email": inputs[1].value,
        "password": inputs[2].value,
        "rePassword": inputs[3].value,
        "phone": inputs[4].value

    }
    console.log(user);
    register(user);

}
async function register(userData) {

    showLoader();
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signup`,
        {
            method: "post",
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

    if (response.ok) {
        const data = await response.json();
        if (data.message === "success") {

            location.href = "./index.html";//login page 
        }
    }
    else{
            document.getElementById("register-msg").innerHTML = `Account Already Exists`;
    }
    hideLoader();

}
function showLoader(){
    document.querySelector(".loading").classList.remove("d-none");

}
function hideLoader(){
    document.querySelector(".loading").classList.add("d-none");

}

// ================> validation <=========================
const Regexes = {
    "name": /^(?:[a-zA-Z0-9&$#\s_]|[\u0600-\u06FF]){2,50}$/, 
    "email": /^[a-zA-Z0-9.-_]+@[a-zA-Z]+\.com$/, //nora.azab135@gmail.com
    "password": /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z@#$%&-_\d]{8,}$/,//Minimum eight characters, at least one letter and one number:
    "repassword": /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z@#$%&-_\d]{8,}$/,//Minimum eight characters, at least one letter and one number:
    // "age": /^(?:[1-7][0-9]|80)$/,//[10-80] allowed only this range ^^        =>   [10:79] & 80
    "phone" : /^((\+20)?|0)(?:10|11|12|15)[0-9]{8}$/

}
function generalValidate(input) {

    // console.log(input.getAttribute("id"));
    const regexName = input.getAttribute("id");

    // console.log(input.value);
    // console.count("validate called")

    // ===============
    //// if (Regexes[regexName].test(input.value.trim())) {
    ////     input.classList.remove("is-invalid");
    ////     input.classList.add("is-valid");
    ////     return true;

    //// }
    //// else {
    ////     input.classList.remove("is-valid");
    ////     input.classList.add("is-invalid");
    ////     return false;

    //// }
    // ===============
    // will make it cleaner :)
    const isValidated = Regexes[regexName].test(input.value.trim());// T|F


    if(regexName === "password" || regexName === "repassword"){
        const msgInvalid = `invalid-msg-${regexName}`;
        document.getElementById(`${msgInvalid}`).classList.toggle("d-none" , isValidated)

    }
    input.classList.toggle("is-invalid" ,!isValidated ); // if validated -> by force delete (is-invalid , false)
    input.classList.toggle("is-valid" , isValidated);

    return isValidated;

}
