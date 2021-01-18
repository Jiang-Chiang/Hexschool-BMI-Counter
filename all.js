var submitButton = document.querySelector('#submitButton');
var heightField = document.querySelector('#heightField');
var weightField = document.querySelector('#weightField');
var bmiResultsList = document.querySelector('#bmiResultsList');
var storageArr = JSON.parse(localStorage.getItem('storageData')) || [];

submitButton.addEventListener('click', submitCalculation);

function submitCalculation(e) {
    e.preventDefault();

    let weight = weightField.value;
    let height = heightField.value;

    if (!!height && !!weight) {
        let bmi = (weight / Math.pow((height / 100), 2)).toFixed(2);
        let dateNow = new Date();
        let dateNowFormat = `${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()}`;

        let storageObj = {
            bmi: bmi,
            weight: weight,
            height: height,
            date: dateNowFormat
        }

        storageArr.push(storageObj);
        localStorage.setItem('storageData', JSON.stringify(storageArr));

        updateList();

    } else {
        alert('請完整填寫內容！')
    }

}

function updateList() {

}

function deleteSingleRow() {

}
