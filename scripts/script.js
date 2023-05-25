function changeImage(tableId, index) {
  var currentImageId = "image" + index;
  var nextImageIndex = parseInt(index) + 1;
  if (nextImageIndex > 12) {
    nextImageIndex = 1;
  }
  var nextImageId = "image" + nextImageIndex;

  var currentImage = document.getElementById(tableId).querySelector("#" + currentImageId);
  var nextImage = document.getElementById(tableId).querySelector("#" + nextImageId);

  var currentThumbId = "image" + String.fromCharCode(97 + parseInt(index) - 1);
  var nextThumbIndex = String.fromCharCode(97 + nextImageIndex - 1);
  var nextThumbId = "image" + nextThumbIndex;

  var currentThumb = document.getElementById(tableId).querySelector("#" + currentThumbId);
  var nextThumb = document.getElementById(tableId).querySelector("#" + nextThumbId);

  currentImage.style.display = "none";
  nextImage.style.display = "block";
  currentThumb.style.display = "none";
  nextThumb.style.display = "block";
}

function prevImage(tableId, index) {
  var currentImageId = "image" + index;
  var prevImageIndex = parseInt(index) - 1;
  if (prevImageIndex < 1) {
    prevImageIndex = 12;
  }
  var prevImageId = "image" + prevImageIndex;

  var currentImage = document.getElementById(tableId).querySelector("#" + currentImageId);
  var prevImage = document.getElementById(tableId).querySelector("#" + prevImageId);

  var currentThumbId = "image" + String.fromCharCode(97 + parseInt(index) - 1);
  var prevThumbIndex = String.fromCharCode(97 + prevImageIndex - 1);
  var prevThumbId = "image" + prevThumbIndex;

  var currentThumb = document.getElementById(tableId).querySelector("#" + currentThumbId);
  var prevThumb = document.getElementById(tableId).querySelector("#" + prevThumbId);

  currentImage.style.display = "none";
  prevImage.style.display = "block";
  currentThumb.style.display = "none";
  prevThumb.style.display = "block";

}

// 禁止右鍵選單
document.addEventListener('contextmenu', function (event) {
  event.preventDefault();
});

// 保留資料
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const submitBtn = document.querySelector('input[type="submit"]');
const inputArea = document.querySelector('input[type="text"]');

//當localStorage沒有資料陣列，指定一個空陣列放入資料庫
if (localStorage.getItem('item') === null) {
    var storageArray = [];
    localStorage.setItem('item', JSON.stringify(storageArray));
//當localStorage已存在資料陣列，指定一個內容與陣列資料庫相同的陣列
} else {
    var storageArray = JSON.parse(localStorage.getItem('item'));
};

addItems.addEventListener('submit', addItem);

function addItem(event) {
    event.preventDefault();
    //取得輸入欄位的資料
    inputValue = inputArea.value;
    //建立一個符合我們需求的物件資料
    inputObject = { value: inputValue, done: false };
    //將新物件加入我們的陣列
    storageArray.push(inputObject);
    //將陣列修改成JSON字串
    stringJson = JSON.stringify(storageArray)
    //將處理後的JSON字串更新到資料庫中
    localStorage.setItem(`item`, stringJson);
    //將輸入欄位清空
    inputArea.value = '';
    //將資料呈現在頁面上
    createlist()
};

function createlist() {
    //將資料庫的陣列取出
    let arrayJason = JSON.parse(localStorage.getItem('item'));
    //假如資料庫內的陣列有內容存在，執行以下的程式碼
    if (arrayJason.length !== 0) {
        //先清空ul容器內的元素
        itemsList.innerHTML = '';
        //對陣列裡的每個元素執行函式
        arrayJason.forEach(function (item) {
            //在DOM上創造一個<li>元素
            let createLi = document.createElement('li');
            //在DOM上創造一個<input>元素
            let createInput = document.createElement('input');
            //將<input>元素加上 type="checkbox"這個屬性
            createInput.setAttribute('type', 'checkbox');
            //在DOM上創造一個<label>元素
            let createLabel = document.createElement('label');
            //將物件中的 done 值指定給 <label> 元素的 checked 屬性
            createInput.checked = item['done'];
            //將<input>元素加上監聽事件與觸發函式
            createLabel.addEventListener('click', checkStatus);
            //將物件中的 value 值指定給 <input> 元素的文字內容
            createLabel.textContent = item['value'];
            //將 <input> 元素加到 <li> 容器元素底下
            createLi.appendChild(createInput);
            //將 <label> 元素加到 <li> 容器元素底下
            createLi.appendChild(createLabel);
            //將 <li> 元素加到 <ul> 容器元素底下
            itemsList.appendChild(createLi);
        });
      //假如資料庫內的陣列有內容存在，執行以下的程式碼
      } else {
        itemsList.innerHTML = '<li>Loading Tapas...</li>';
    }
};

function checkStatus(event) {
    //將目前頁面中的所有 <label> 元素選出來
    let allLable = document.querySelectorAll('label');
    //將前一步中的 Nodelist 轉為陣列
    labelArray = Array.from(allLable);
    //取得觸發事件元素的 index
    let getIndex = labelArray.indexOf(event.target);
    //將資料庫中的陣列資料叫出來
    let arrayJason = JSON.parse(localStorage.getItem('item'));
    //當 click 事件觸發時，將 done 的屬性布林值改為相反
    arrayJason[getIndex]['done'] = !arrayJason[getIndex]['done'];
    //將新的資料陣列轉成 JSON string 結構
    stringJson = JSON.stringify(arrayJason);
    //將新的 JSON string 丟到資料庫中
    localStorage.setItem(`item`, stringJson);
    //重新將資料呈現在頁面上
    createlist();
    };
