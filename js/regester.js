
// ?================> Global <=========================

const inputs = document.querySelectorAll("input");//[input[0] , input[1] , .....]
const formElement = document.querySelector("form");
let isValid = false;



// !================> when start <=========================


// *================> Events <=========================

formElement.addEventListener("submit", function (event) {
    event.preventDefault(); // prevent reloading of the form ^^

    if(isValid){
        setForm();
    }
});
formElement.addEventListener("input", function (e) {
    //as long as the first validation become true  , will call the next validate [not good]
    // if (GeneralValidate(inputs[0]) &&
    //     GeneralValidate(inputs[1]) &&
    //     GeneralValidate(inputs[2]) &&
    //     GeneralValidate(inputs[3]) &&
    //     GeneralValidate(inputs[4])) {
    // }
    // to only trigger the validation of what i write in  ^_^
    if (GeneralValidate(e.target) && //fname
        GeneralValidate(e.target) && //lname
        GeneralValidate(e.target) && //email
        GeneralValidate(e.target) && //password
        GeneralValidate(e.target)) { // age

        isValid = true;
    }
    else
        isValid = false;
});


// !================> functions <=========================
function setForm() {
    const user = {
        "first_name": inputs[0].value,
        "last_name": inputs[1].value,
        "email": inputs[2].value,
        "password": inputs[3].value,
        "age": inputs[4].value

    }
    console.log("yoe set");
    console.log(user);
    // regestir(user);
}

// ================> validation <=========================
function GeneralValidate(input) {
    const Regexes = {
        "fname": /^(?:[a-zA-Z0-9&$#_]|[\u0600-\u06FF]){2,50}$/, //spaces not allowed 
        "lname": /^(?:[a-zA-Z0-9&$#_]|[\u0600-\u06FF]){2,50}$/, //spaces not allowed 
        "email": /^[a-zA-Z0-9.-_]+@[a-zA-Z]+\.com$/, //nora.azab135@gmail.com
        "password": /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,//Minimum eight characters, at least one letter and one number:
        "age": /^(?:[1-7][0-9]|80)$/,//[10-80] allowed only this range ^^        =>   [10:79] & 80
    }

    // console.log(input.getAttribute("id"));
    const regexName = input.getAttribute("id");


    if (Regexes[regexName].test(input.value)) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        return true;

    }
    else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;

    }
}
