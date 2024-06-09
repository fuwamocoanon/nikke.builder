// 網頁加載完成後顯示妮姬圖像，並載入使用者的操作資料
// After loading the web page, it displays the image of Nikki and loads the user's operation data.
window.onload = function () {
//    refreshNikkeImages();
    displayNikkeImages1();
    generateInitialTables()
};

// 重設所有資料
// Reset all data
function resetalldata1() {

    location.reload();
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
}
