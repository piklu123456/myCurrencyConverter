// const baseUrl1 = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/inr.json`;
const baseUrl = `https://api.fastforex.io/fetch-one?from=USD&to=EUR&api_key=YOUR_API_KEY`;
let apiKey = "e4a3643352-6ce16f4caf-sfopwy";
const dropdowns = document.querySelectorAll('.dropdown select');
const btn = document.querySelector("form button");
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const msg = document.querySelector('.msg');

// for(let code in countryList){
//     console.log(code,countryList[code]);
// }

for (let select of dropdowns) {
    for (let curcode in countryList) {
        let newOption = document.createElement('option');
        newOption.innerText = curcode;
        newOption.value = curcode;
        if (select.name === "from" && curcode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && curcode === "INR") {
            newOption.selected = "selected";
        }
        select.appendChild(newOption);
    }
    select.addEventListener('change', (event) => {
        updateFlag(event.target);
    })
}


const updateFlag = (element) => {
    // console.log(element);
    let curCode = element.value;
    // console.log(curCode);
    let countryCode = countryList[curCode];
    newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let image = element.parentElement.querySelector('img');
    image.src = newSrc;
}

btn.addEventListener('click', async (event) => {
    event.preventDefault();
    let amount = document.querySelector('.amount input');
    let amountValue = amount.value;
    // console.log(amountValue);
    if (amountValue == "" || amountValue < 1) {
        amountValue = 1;
        amount.value = "1";
    }

    // console.log(fromCurr.value,toCurr.value);
    try {
        const URL = `https://api.fastforex.io/fetch-one?from=${fromCurr.value.toLowerCase()}&to=${toCurr.value.toLowerCase()}&api_key=${apiKey}`;

        let response = await fetch(URL);
        let data = await response.json();

        console.log(data);

        let rate = data['result'];
        let key = "";
        for (let i in rate) {
            key = i;
            rate = data['result'][key];
            console.log(rate);
            let finalAmount = amountValue * rate;
            msg.innerText = `${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
        }



    } catch (error) {
        alert("No such currency supported...");
    }

})