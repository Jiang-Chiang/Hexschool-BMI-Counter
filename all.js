var submitButton = document.querySelector('#submitButton');
var heightField = document.querySelector('#heightField');
var weightField = document.querySelector('#weightField');
var bmiResultsList = document.querySelector('#bmiResultsList');
var deleteAllButton = document.querySelector('#deleteAllButton');
var storageArr = JSON.parse(localStorage.getItem('storageData')) || [];

submitButton.addEventListener('click', submitCalculation);
bmiResultsList.addEventListener('click', deleteSingleRow);
deleteAllButton.addEventListener('click', deleteWholeList);

updateResultsList();

function submitCalculation(e) {
    e.preventDefault();

    let weight = weightField.value;
    let height = heightField.value;

    if (!!height && !!weight) {
        let status;
        let bmi = (weight / Math.pow((height / 100), 2)).toFixed(2);
        let dateNow = new Date();
        let dateNowFormat = `${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()}`;

        switch (!!bmi) {
            case (bmi < 18.5):
                status = '過輕';
                break;
            case (bmi >= 18.5 && bmi < 24):
                status = '理想';
                break;
            case (bmi >= 24 && bmi < 27):
                status = '過重';
                break;
            case (bmi >= 27 && bmi < 30):
                status = '輕度肥胖';
                break;
            case (bmi >= 30 && bmi < 35):
                status = '中度肥胖';
                break;
            case (bmi > 35):
                status = '重度肥胖';
                break;
        }

        let storageObj = {
            status: status,
            bmi: bmi,
            weight: weight,
            height: height,
            date: dateNowFormat
        }

        storageArr.push(storageObj);
        localStorage.setItem('storageData', JSON.stringify(storageArr));

        document.querySelector('#heightField').value = '';
        document.querySelector('#weightField').value = '';

        updateResultsList();

    } else {
        alert('請完整填寫內容！')
    }

}

function updateResultsList() {
    let ResultsList = '';

    for (let i = 0; i < storageArr.length; i++) {
        ResultsList += `
            <li data-index="0" class="resultRow">
                <div class="status">
                    ${storageArr[i].status}
                </div>
                <div class="dataBlock">
                    <div class="dataItem">
                        <div class="dataTitle">BMI</div>${storageArr[i].bmi}
                    </div>
                    <div class="dataItem">
                        <div class="dataTitle">weight</div>${storageArr[i].weight}
                    </div>
                    <div class="dataItem">
                        <div class="dataTitle">height</div>${storageArr[i].height}
                    </div>
                </div>
                <div id="dateBlock">
                    ${storageArr[i].date}
                </div>
                <a href="#">刪除本列</a>
            </li>`
    }

    bmiResultsList.innerHTML = ResultsList;
}

function deleteSingleRow(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'A') { return; }

    let selectedIndex = e.target.dataset.index;
    storageArr.splice(selectedIndex, 1);

    localStorage.setItem('storageData', JSON.stringify(storageArr));
    updateResultsList();
}

function deleteWholeList() {
    storageArr = [];
    localStorage.removeItem('storageData');
    updateResultsList();
}
