 
let num = document.querySelectorAll('.one');
let inputvalyuta1 = document.querySelectorAll('.mezenne1 input');
let inputvalyuta2 = document.querySelectorAll('.mezenne2 input');

let placeholder1 = "";
let placeholder2 = "";
let conversionRates = {};

valyuta();

async function valyuta() {
    let res = await fetch('currency.json');
    let json = await res.json();
    conversionRates = json.results;

    inputvalyuta1.forEach(input => {
        input.addEventListener('click', function() {
            placeholder1 = this.getAttribute('placeholder');
            highlightSelected(inputvalyuta1, input);
            calculateConverted();
        });
    });

    inputvalyuta2.forEach(input => {
        input.addEventListener('click', function() {
            placeholder2 = this.getAttribute('placeholder');
            highlightSelected(inputvalyuta2, input);
            calculateConverted();
        });
    });

    num.forEach(input => {
        input.addEventListener('input', function() {
            calculateConverted();
        })
    });
}

function calculateConverted() {
    let inputValue = Number(num[0].value);
    if (!placeholder1 || !placeholder2 || isNaN(inputValue)) return; 
    let conversionRate = conversionRates[placeholder1][placeholder2];
    let convertedValue = inputValue * conversionRate;
    showConvertedValue(convertedValue, conversionRate);
}

function showConvertedValue(value, conversionRate) {
    let resultElement = document.querySelector('.ceviri');
    let num2 = document.querySelector('.valyuta2 .num');
    resultElement.innerHTML = `1 ${placeholder1} : ${conversionRate} ${placeholder2}`;
    num2.innerText = value.toFixed(2);
}

function highlightSelected(inputs, selectedInput) {
    inputs.forEach(input => {
        if (input === selectedInput) {
            input.style.backgroundColor = '#833AE0';  
            input.style.color='white'
        } else {
            input.style.backgroundColor = 'white'; 
            
        }
    });
}









