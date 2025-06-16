const inputSlider = document.querySelector("[data-lengthSlider]")
const lengthDisplay = document.querySelector("[data-lengthNumber]")
const passwordDisplay = document.querySelector("[data-passwordDisplay]")
const copyBtn = document.querySelector("[data-copy]")
const copyMsg = document.querySelector("[data-copyMsg]")
const uppercaseCheck = document.querySelector("#uppercase")
const lowercaseCheck = document.querySelector("#lowercase")
const numberCheck = document.querySelector("#number")
const symbolCheck = document.querySelector("#symbol")
const generateBtn = document.querySelector(".generate-button")
const allCheckBox = document.querySelectorAll("input[type=checkbox]")
const indicator = document.querySelector("[data-indicator]")
const symbols = '!@#$%^&*()_+{}:"<>?[];,./';

let password = "";
let passwordLength = 10;
let checkCount = 1;

handleSlider();
// console.log(getRandomInteger(10 , 20));

//Sets passwords length
function handleSlider(){

    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;

}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px ${color}`;
}

function getRandomInteger(min, max) {

    return Math.floor(Math.random() * (max - min)) + min;


}

function generateRandomNumber(){

    return getRandomInteger(0, 9);

}

function generateLowerCase(){

    return String.fromCharCode(getRandomInteger(97, 123)); // a-z
}

function generateUpperCase(){
    return String.fromCharCode(getRandomInteger(65, 91)); // A-Z
}

function generateSymbol(){
    return symbols.charAt(getRandomInteger(0, symbols.length));
}


function calcStrength() {
    let hasUpper = uppercaseCheck.checked;
    let hasLower = lowercaseCheck.checked;
    let hasNumber = numberCheck.checked;
    let hasSymbol = symbolCheck.checked;

    if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8) {
        setIndicator("#0f0"); // Green
    } else if ((hasUpper || hasLower) && (hasNumber || hasSymbol) && passwordLength >= 6) {
        setIndicator("#ff0"); // Yellow
    } else {
        setIndicator("#f00"); // Red
    }
}

async function copyContent(){
    try{

    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "Copied";
    }catch(e){
        copyMsg.innerText = "Failed ";
        console.log(e);
    }

    copyMsg.classList.add("active");
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);

}

function handleCheckBoxChange(){
    

}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckBoxChange => {
})})


inputSlider.addEventListener("input", (e) => {
    passwordLength = e.target.value;
    handleSlider();

});

copyBtn.addEventListener("click", () => {
    if (passwordDisplay.value) {
        copyContent();
    }
});

generateBtn.addEventListener("click", () => {


});