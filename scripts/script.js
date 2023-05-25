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

// 恢复所有表格的图片切换状态
for (var i = 1; i <= 66; i++) {
  var tableId = "table" + i;
  var tableState = JSON.parse(localStorage.getItem(tableId + "State"));
  if (tableState) {
    var currentImageId = tableState.currentImage;
    var currentImage = document.getElementById(tableId).querySelector("#" + currentImageId);
    var currentThumb = document.getElementById(tableId).querySelector("#" + currentImageId.replace("image", "thumb"));
    currentImage.style.display = "block";
    currentThumb.style.display = "none";
  }
}

// 监听页面刷新事件，在页面刷新前保存所有表格的图片切换状态数据到本地存储
window.addEventListener("beforeunload", function () {
  for (var i = 1; i <= 66; i++) {
    var tableId = "table" + i;
    var currentState = {
      currentImage: document.getElementById(tableId).querySelector(".image:not(.hidden)").id
    };
    localStorage.setItem(tableId + "State", JSON.stringify(currentState));
  }
});
