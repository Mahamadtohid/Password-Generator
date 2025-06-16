const inputSlider = document.querySelector("[data-lengthSlider]")
const lengthDisplay = document.querySelector("[data-lengthNumber]")
const passwordDisplay = document.querySelector("[data-passwordDisplay]")
const copyBtn = document.querySelector("[data-copy]")
const copyMsg = document.querySelector("[data-copyMsg]")
const uppercaseCheck = document.querySelector("#uppercase")
const lowercaseCheck = document.querySelector("#lowercase")
const numberCheck = document.querySelector("#numbers")
const symbolCheck = document.querySelector("#symbols")
const generateBtn = document.querySelector(".generate-button")
const allCheckBox = document.querySelectorAll("input[type=checkbox]")
const indicator = document.querySelector("[data-indicator]")
const symbols = '!@#$%^&*()_+{}:"<>?[];,./';

let password = "";
let passwordLength = 10;
let checkCount = 0;

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

    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;
    if(uppercaseCheck.checked) hasUpper=true;
    if(lowercaseCheck.checked) hasLower=true;
    if(numberCheck.checked) hasNumber=true;
    if(symbolCheck.checked) hasSymbol=true;

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

function shufflePassword(array){
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;

}

function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked) {
            checkCount++;
        }
    });


}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckBoxChange)
});

inputSlider.addEventListener("input", (e) => {
    passwordLength = e.target.value;
    handleSlider();

});

copyBtn.addEventListener("click", () => {
    if (passwordDisplay.value) {
        copyContent();
    }
});

console.log("Generate button going to clicked");

generateBtn.addEventListener("click", () => {

    console.log("Generate button clicked");

    if(checkCount == 0) return;

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
    console.log("Password length: " + passwordLength);


    password = "";

    let funcArr = [];
    console.log("Starting to pass generation")
    if (uppercaseCheck.checked) {
        funcArr.push(generateUpperCase);
    }
    
    if (lowercaseCheck.checked) {
        funcArr.push(generateLowerCase);
    }
    if (numberCheck.checked) {
        funcArr.push(generateRandomNumber);
    }
    if (symbolCheck.checked) {
        funcArr.push(generateSymbol);
    }

    for (let i = 0; i < funcArr; i++) {
        password += funcArr[i]();
        
    }

    for(let i=0 ; i<passwordLength - funcArr.length; i++){
        let randIndex = getRandomInteger(0, funcArr.length);
        password += funcArr[randIndex]();
    }


    
    password=shufflePassword(Array.from(password));
    passwordDisplay.value = password;
    console.log("Password generated: " + password);
    calcStrength();


});