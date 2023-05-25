for (var i = 1; i <= 66; i++) {
    var tableId = "table" + i;
    var currentImageId = getCookie(tableId + "State");
    if (currentImageId) {
        var currentImage = document.getElementById(tableId).querySelector("#" + currentImageId);
        var currentThumb = document.getElementById(tableId).querySelector("#" + currentImageId.replace("image", "thumb"));
        currentImage.style.display = "block";
        currentThumb.style.display = "none";
    }
}

window.addEventListener("beforeunload", function () {
    for (var i = 1; i <= 66; i++) {
        var tableId = "table" + i;
        var currentState = document.getElementById(tableId).querySelector(".image:not(.hidden)").id;
        setCookie(tableId + "State", currentState);
    }
});

function setCookie(name, value) {
    document.cookie = name + "=" + value + "; path=/";
}

function getCookie(name) {
    var cookies = document.cookie.split("; ");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].split("=");
        if (cookie[0] === name) {
            return cookie[1];
        }
    }
    return "";
}
