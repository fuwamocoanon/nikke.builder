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

// 檢查是否存在之前保存的數據
function checkStoredData() {
  var storedData = getCookieValue('pageData');
  if (storedData) {
    // 恢復頁面數據
    var data = JSON.parse(storedData);
    // TODO: 使用恢復的數據進行相關操作
    console.log('恢復的數據:', data);
  } else {
    // 不存在保存的數據
    console.log('無保存的數據');
  }
}

// 保存頁面數據爲 cookie
function savePageData() {
  var data = {
    // TODO: 獲取需要保存的頁面數據
    // 例如：username: 'John', age: 25
  };

  var date = new Date();
  date.setTime(date.getTime() + (60 * 24 * 60 * 60 * 1000)); // 60 天后的日期
  var expires = date.toUTCString();

  // 將數據轉換爲字符串並設置爲 cookie
  document.cookie = 'pageData=' + JSON.stringify(data) + '; expires=' + expires + '; path=/';

  console.log('保存頁面數據成功');
}

// 獲取 cookie 值
function getCookieValue(cookieName) {
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.startsWith(cookieName + '=')) {
      return cookie.substring(cookieName.length + 1);
    }
  }
  return null;
}

// 頁面加載時檢查保存的數據
checkStoredData();
