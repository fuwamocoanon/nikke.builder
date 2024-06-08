// 禁止右鍵選單
// Disable right-click menu
document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

const nikketeamnum = {
  'Burst 1': [1, 5, 20, 29, 23, 78, 82, 35, 36, 38, 40, 41, 43, 45, 55, 51, 52, 49, 59, 50, 87, 57, 60, 84, 62, 64, 90, 98],
  'Burst 2': [3, 4, 8, 14, 12, 76, 73, 21, 31, 32, 25, 26, 27, 77, 28, 37, 39, 42, 44, 58, 24, 53, 47, 54, 86, 67, 69, 70, 89, 92, 93, 94],
  'Burst 3': [2, 6, 7, 9, 10, 13, 11, 16, 79, 15, 17, 18, 22, 30, 33, 19, 34, 46, 56, 48, 72, 83, 61, 63, 65, 66, 68, 80, 85, 71, 74, 75, 88, 91, 95, 96],
  'Burst 1~3': [81, 100],
};

const Burst = ['Burst 1', 'Burst 2', 'Burst 3', 'Burst 1~3'];
const BurstLen = Burst.length;

const nikketeam = {};

class NikkeTeamImage {
  constructor(imageUrl, width, height) {
    this.imageUrl = imageUrl;
    this.image = new Image();
    this.image.src = this.imageUrl;
    this.image.width = width;
    this.image.height = height;
    this.image.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', this.imageUrl);
      event.dataTransfer.effectAllowed = 'move';
    });
  }
}



function displayNikkeImages1() {
  const nikkeContainer = document.getElementById('nikke-images');

  for (let i = 0; i < BurstLen; i++) {
    const BurstDiv = document.createElement('div');
    BurstDiv.classList.add('BurstDiv');

    // 創建 Burst 標題元素
	// Creating the Burst header element
    const BurstTitle = document.createElement('h2');
    const BurstImage = document.createElement('img');
    BurstImage.src = `images/others/Burst${i}.webp`;
    BurstImage.width = 70;
    BurstImage.height = 70;
    BurstImage.draggable = false;
    BurstImage.title = Burst[i];
    BurstTitle.appendChild(BurstImage);

    // 將 Burst 標題元素添加到 BurstDiv
	// Adds the Burst heading element to the BurstDiv.
    BurstDiv.appendChild(BurstTitle);

    for (const num of nikketeamnum[Burst[i]]) {
      const imageNIKKEContainer = document.createElement('div');
      imageNIKKEContainer.classList.add('imageNIKKEContainer');

      const nikkeTeamImage = new NikkeTeamImage(`images/character/image${num}.webp`, 70, 70);

      imageNIKKEContainer.appendChild(nikkeTeamImage.image);

      BurstDiv.appendChild(imageNIKKEContainer);

      nikketeam[num] = nikkeTeamImage;
    }

    nikkeContainer.appendChild(BurstDiv);
    // 創建分隔符號 <hr>，並將其添加到 BurstContainer 後面
	// Create the separator <hr> and add it after the BurstContainer.
    if (i < BurstLen - 1) {
      const separator = document.createElement('hr');
      separator.classList.add('separator'); // 新增CSS類名 | Add CSS class name
      nikkeContainer.appendChild(separator);
    }
  }
}

function generateTable() {
  const teamImagesContainer = document.getElementById('team-images');

  const table = document.createElement('table');
  table.id = 'team'; // 設定表格的 ID | Setting the form ID
  table.style.borderCollapse = 'collapse'; // 合併邊框 | Merge Border

  const cells = []; // 用來儲存每個格子的狀態，是否已有圖片存在 | Used to store the status of each grid and whether a picture already exists.

  for (let row = 0; row < 1; row++) {
    const tableRow = document.createElement('tr');

    for (let col = 0; col < 5; col++) {
      const tableCell = document.createElement('td');
      tableCell.style.border = '3px solid gray'; // 設定邊框粗細為 1 像素 | Set the border thickness to 1 pixel
      tableCell.style.width = '90px'; // 設定每個格子寬度 | Setting the width of each grid
      tableCell.style.height = '90px'; // 設定每個格子高度 | Setting the height of each grid
      table.style.margin = '0 auto';
      table.style.backgroundColor = 'lightgray';
      table.style.marginBottom = '10px';


      cells.push({ occupied: false, image: null, cell: tableCell }); // 添加 image 屬性

      // 將可拖曳的圖像放置在表格格子中 | Placing a Drag-and-Drop Image in a Table Grid
      tableCell.addEventListener('dragover', (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
      });

      tableCell.addEventListener('drop', (event) => {
        event.preventDefault();

        if (!cells[col].occupied) {
          const imageUrl = event.dataTransfer.getData('text/plain');
          const imageNum = getImageNumFromUrl(imageUrl);

          if (!isImageInTeam(imageNum)) {
            const nikkeTeamImage = new NikkeTeamImage(imageUrl, 70, 70);
            tableCell.appendChild(nikkeTeamImage.image);
            cells[col].occupied = true;

            nikkeTeamImage.image.addEventListener('dragstart', (event) => {
              event.preventDefault();
            });

            nikkeTeamImage.image.addEventListener('click', () => {
              tableCell.removeChild(nikkeTeamImage.image);
              cells[col].occupied = false;
            });
          }
        }
      });

      tableRow.appendChild(tableCell);
    }

    table.appendChild(tableRow);
  }

  teamImagesContainer.appendChild(table);
}

generateTable();

const teamImagesContainer = document.getElementById('team'); // 取得具有 id 'team' 的 HTML 容器

// 當圖像被拖曳到容器上方時觸發的事件處理器
teamImagesContainer.addEventListener('dragover', (event) => {
  event.preventDefault(); // 阻止瀏覽器的預設放置操作
  event.dataTransfer.dropEffect = 'move'; // 設定拖放效果為 'move'
});

// 檢查圖像是否已存在於團隊圖像中的函數
function isImageInTeam(imageNum) {
  const allCells = document.querySelectorAll('td'); // 取得所有表格格子
  for (const cell of allCells) {
    const image = cell.querySelector('img');
    if (image) {
      const imageUrl = image.src;
      const num = getImageNumFromUrl(imageUrl);
      if (num === imageNum) {
        return true; // 圖像已經存在於團隊圖像中
      }
    }
  }
  return false; // 圖像不存在於團隊圖像中
}

// 從圖像網址中解析出圖像編號的函數
function getImageNumFromUrl(imageUrl) {
  const match = imageUrl.match(/image(\d+)\.webp/); // 使用正則表達式從網址中提取編號
  if (match && match[1]) {
    return parseInt(match[1]); // 將編號轉換為整數並返回
  }
  return -1; // 如果沒有找到編號，返回 -1
}

// 增加表格的函數
function addTeam() {
  if (document.querySelectorAll('table').length < 5) {
    generateTable();
    adjustTeamImagesContainerHeight(1);
  }
}

function removeTeam() {
  const tables = document.querySelectorAll('table');
  if (tables.length > 1) {
    const lastTable = tables[tables.length - 1];
    lastTable.remove();
    adjustTeamImagesContainerHeight(-1);
  }
}

function adjustTeamImagesContainerHeight(change) {
  const teamImagesContainer = document.getElementById('team-images');
  const currentHeight = parseInt(getComputedStyle(teamImagesContainer).height);
  const newHeight = currentHeight + change * 100;
  teamImagesContainer.style.height = newHeight + 'px' - 100 + 'px';
}

function generateInitialTables() {
  for (let i = 0; i < i; i++) {
    generateTable();
  }
}

generateInitialTables();

var menuTimeout;

function showMenu() {
  clearTimeout(menuTimeout);
  var menu = document.getElementById("menu");
  menu.style.display = "block";
}

function hideMenu() {
  menuTimeout = setTimeout(function () {
    var menu = document.getElementById("menu");
    menu.style.display = "none";
  });
}

function clearMenuTimeout() {
  clearTimeout(menuTimeout);
}

function enlargeHeader() {
  var header = document.querySelector(".fixed-header");
  header.style.transform = "scale(1.1)";
}

function resetHeader() {
  var header = document.querySelector(".fixed-header");
  header.style.transform = "scale(1)";
}