// 讀取localStorage中的數據
var savedData = localStorage.getItem("imageData");
var defaultData = {};

//妮姬總數
var numTables = 70;
var numImagesPerTable = 12;

// 設置默認的圖片顯示狀態
for (var i = 1; i <= numTables; i++) {
  var tableData = {};
  for (var j = 1; j <= numImagesPerTable; j++) {
    var imageId = "image" + j;
    tableData[imageId] = (j === 1); // 設置第一個圖片爲可見，其他圖片爲隱藏
  }
  tableData["imagea"] = true; // 設置imagea爲可見
  var tableId = "table" + i;
  defaultData[tableId] = tableData;
}
var imageData = savedData ? JSON.parse(savedData) : defaultData;

// 恢復圖片顯示狀態
for (var tableId in imageData) {
  if (imageData.hasOwnProperty(tableId)) {
    var tableData = imageData[tableId];
    for (var imageId in tableData) {
      if (tableData.hasOwnProperty(imageId)) {
        var isVisible = tableData[imageId];
        var imageElement = document.getElementById(tableId).querySelector("#" + imageId);
        imageElement.style.display = isVisible ? "block" : "none";
      }
    }
  }
}

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

  // 將圖片顯示狀態儲存到本地存儲中
  var imageData = getImageData();
  localStorage.setItem("imageData", JSON.stringify(imageData));
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

  // 將圖片顯示狀態儲存到本地存儲中
  var imageData = getImageData();
  localStorage.setItem("imageData", JSON.stringify(imageData));

}

function getImageData() {
  var imageData = {};
  var tables = document.getElementsByClassName("image-table");
  for (var i = 0; i < tables.length; i++) {
    var table = tables[i];
    var tableId = table.id;
    var images = table.querySelectorAll("img");
    var tableData = {};
    for (var j = 0; j < images.length; j++) {
      var image = images[j];
      var imageId = image.id;
      var isVisible = image.style.display === "block";
      tableData[imageId] = isVisible;
    }
    imageData[tableId] = tableData;
  }
  return imageData;
}

// 設置下拉式選單的初始數值
function setInitialSelectValues() {
  for (var i = 1; i <= 3 * numTables; i++) {
    var selectId = "select" + i;
    var selectElement = document.getElementById(selectId);
    var savedValue = localStorage.getItem(selectId);
    if (savedValue !== null) {
      selectElement.value = savedValue;
    }
  }
}

// 保存下拉式選單的數值到localStorage
function saveSelectValue(selectId) {
  var selectElement = document.getElementById(selectId);
  var selectedValue = selectElement.value;
  localStorage.setItem(selectId, selectedValue);
}

// 監聽下拉式選單的change事件
function addSelectListeners() {
  for (var i = 1; i <= 3 * numTables; i++) {
    var selectId = "select" + i;
    var selectElement = document.getElementById(selectId);
    selectElement.addEventListener("change", function () {
      saveSelectValue(this.id);
    });
  }
}

// 在頁面載入時初始化下拉式選單
window.addEventListener("DOMContentLoaded", function () {
  setInitialSelectValues();
  addSelectListeners();
});

// 添加 resetImages 函數來重置所有資料
function resetalldata() {
  // 獲取所有表格中的圖片元素
  var images = document.querySelectorAll(".image-table img");
  for (var i = 1; i <= 3 * numTables; i++) {
    var selectId = "select" + i;
    var selectElement = document.getElementById(selectId);
    selectElement.selectedIndex = 0; // 將選擇設置為第一個選項
    localStorage.removeItem(selectId); // 刪除localStorage中的對應數據

  }

  // 將所有圖片顯示爲初始圖片
  images.forEach(function (image) {
    var tableId = image.closest(".image-table").id;
    var tableData = defaultData[tableId];
    var isVisible = tableData[image.id];
    image.style.display = isVisible ? "block" : "none";
  });

  // 保存圖片顯示狀態到localStorage
  var imageData = getImageData();
  localStorage.setItem("imageData", JSON.stringify(imageData));
  location.reload();
  if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
  }
}

// 禁止右鍵選單
document.addEventListener('contextmenu', function (event) {
  event.preventDefault();
});

