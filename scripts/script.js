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