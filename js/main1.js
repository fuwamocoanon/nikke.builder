// 禁止右鍵選單
// Disable right click menu
document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

const nikkenum = {
  'Elysion': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13, 14, 11, 16, 12, 76, 79, 15, 73, 88, 90, 104],
  'Missilis': [17, 18, 20, 21, 22, 29, 30, 31, 32, 33, 19, 25, 26, 27, 23, 77, 78, 82, 28, 89, 95, 96, 103, 109, 110],
  'Tetra': [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 55, 56, 58, 24, 51, 52, 53, 49, 59, 47, 48, 50, 54, 86, 87, 57, 60, 72, 83, 84, 93, 97, 98, 99, 100, 101, 102, 108],
  'Pilgrim': [61, 62, 63, 65, 66, 67, 68, 69, 64, 80, 81, 85, 94],
  'Abnormal': [70, 71, 74, 75, 91, 92, 105, 106, 107],
};

// 使用解構賦值將容器長度儲存到相對應的變數中
// Use the deconstructed value to store the container length in the corresponding variable.
const { Elysion, Missilis, Tetra, Pilgrim, Abnormal } = nikkenum;
const ElysionLen = Elysion.length;
const MissilisLen = Missilis.length;
const TetraLen = Tetra.length;
const PilgrimLen = Pilgrim.length;
const AbnormalLen = Abnormal.length;
const allnikkeLen = ElysionLen + MissilisLen + TetraLen + PilgrimLen + AbnormalLen;

const MFR = ['Elysion', 'Missilis', 'Tetra', 'Pilgrim', 'Abnormal'];
const MFRLen = MFR.length;

const nikke = {};

let clknum = 0;
let starnum = 0;
let collectnum = 0;
/*let Elysionnum = 0;
let Missilisnum = 0;
let Tetranum = 0;
let Pilgrimnum = 0;
let Abnormalnum = 0;*/

class NikkeImage {
  constructor(imageUrl, width, height) {
    this.imageUrl = imageUrl;
    this.image = new Image();
    this.image.src = this.imageUrl;
    this.image.width = width; // 設定圖像寬度 | Set image width
    this.image.height = height; // 設定圖像高度 | Set image height
    this.clickCount = 0;
    this.image.draggable = false;
  }

  toggleStarImage(starImage) {
    if (this.clickCount === 11) {
      clknum = clknum - 11;
    }
    else {
      clknum++;
    }

    if (this.clickCount === 3) {
      starnum = starnum + 1;
    }
    else if (this.clickCount === 11) {
      starnum = starnum - 1;
    }

    if (this.clickCount === 0) {
      collectnum = collectnum + 1;
    }
    else if (this.clickCount === 11) {
      collectnum = collectnum - 1;
    }

    this.clickCount = (this.clickCount + 1) % 12;
    const imagePath = `images/others/star${this.clickCount}.webp`;
    starImage.src = imagePath;

    // 解鎖或鎖定相應的下拉式選單
	// Unlock or lock the corresponding drop-down menus
    const imageStarContainer = starImage.parentElement;
    const selectElements = imageStarContainer.querySelectorAll('select');
    for (const selectElement of selectElements) {
      selectElement.disabled = this.clickCount === 0;
      if (this.clickCount === 0) {
        selectElement.value = '1'; // 將下拉式選單的值設為預設值(1) | Set the value of the drop-down menu to the default value (1)
      }
    }
  }
  toggleStarImageM(starImage) {
    if (this.clickCount === 0) {
      clknum = clknum + 11;
    }
    else {
      clknum--;
    }

    this.clickCount = (this.clickCount - 1 + 12) % 12;
    const imagePath = `images/others/star${this.clickCount}.webp`;
    starImage.src = imagePath;

    if (this.clickCount === 3) {
      starnum = starnum - 1;
    }
    else if (this.clickCount === 11) {
      starnum = starnum + 1;
    }

    if (this.clickCount === 0) {
      collectnum = collectnum - 1;
    }
    else if (this.clickCount === 11) {
      collectnum = collectnum + 1;
    }

    // 解鎖或鎖定相應的下拉式選單
	// Unlock or lock the corresponding drop-down menus
    const imageStarContainer = starImage.parentElement;
    const selectElements = imageStarContainer.querySelectorAll('select');
    for (const selectElement of selectElements) {
      selectElement.disabled = this.clickCount === 0;
      if (this.clickCount === 0) {
        selectElement.value = '1'; // 將下拉式選單的值設為預設值(1) |  Set the value of the drop-down menu to the default value (1)
      }
    }
  }

  updateImageURL(num) {
    if (this.clickCount === 0) {
      this.imageUrl = `images/character/image${num}b.webp`;
    } else {
      this.imageUrl = `images/character/image${num}.webp`;
    }
    this.image.src = this.imageUrl;
  }
}

function displayNikkeImages() {
  const nikkeContainer = document.getElementById('nikke-images');

  for (let i = 0; i < MFRLen; i++) {
    const MFRDiv = document.createElement('div');
    MFRDiv.classList.add('MFRDiv');

    // Create MFR Header Element
    const MFRTitle = document.createElement('h2');
    const MFRImage = document.createElement('img');
    MFRImage.src = `images/others/MFR${i}.webp?v=1.0`;
    MFRImage.width = 70;
    MFRImage.height = 70;
    MFRImage.title = MFR[i];
    MFRImage.draggable = false;
    MFRTitle.appendChild(MFRImage);

    // Add MFR header element to MFRDiv
    MFRDiv.appendChild(MFRTitle);

    for (const num of nikkenum[MFR[i]]) {
      const imageStarContainer = document.createElement('div');
      imageStarContainer.classList.add('imageStarContainer');

      const nikkeImage = new NikkeImage(`images/character/image${num}b.webp?v=1.0`, 70, 70);
      const starImage = new Image();
      starImage.classList.add('starImage');
      starImage.src = "images/others/star0.webp?v=1.0";
      starImage.alt = "star";
      starImage.draggable = false;

      imageStarContainer.appendChild(nikkeImage.image);
      imageStarContainer.appendChild(starImage);

      // Create a drop-down menu
      const selectElement = document.createElement('select');
      for (let optionValue = 1; optionValue <= 10; optionValue++) {
        const option = document.createElement('option');
        option.value = optionValue;
        option.textContent = optionValue;
        selectElement.appendChild(option);
      }

      // Setting the lock status of a drop-down menu
      selectElement.disabled = nikkeImage.clickCount === 0;

      // Add three drop-down menus to the imageStarContainer.
      for (let j = 0; j < 3; j++) {
        imageStarContainer.appendChild(selectElement.cloneNode(true));
      }

      MFRDiv.appendChild(imageStarContainer);

      nikkeImage.image.addEventListener('click', (event) => {
        if (reverseCheckbox.checked) {
          nikkeImage.toggleStarImageM(starImage);
        } else {
          nikkeImage.toggleStarImage(starImage);
        }
        nikkeImage.updateImageURL(num);
      });

      nikkeImage.image.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        if (reverseCheckbox.checked) {
          nikkeImage.toggleStarImage(starImage);
        } else {
          nikkeImage.toggleStarImageM(starImage);
        }
        nikkeImage.updateImageURL(num);
      });

      nikke[num] = nikkeImage;
    }

    nikkeContainer.appendChild(MFRDiv);

    // Create a separator <hr> and add it to the back of the MFRContainer.
    if (i < MFRLen - 1) {
      const separator = document.createElement('hr');
      separator.classList.add('separator');
      nikkeContainer.appendChild(separator);
    }
  }
}

// 反轉功能提示視窗
// Reverse Function Alert Window
const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000,
  onOpen: toast => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

var reverseCheckbox = document.getElementById('reverseCheckbox');
reverseCheckbox.addEventListener('change', function () {
  if (reverseCheckbox.checked) {
    // 被勾選時顯示警告視窗
	// Show warning window when checked
    Toast.fire({
      icon: 'warning',
      title: 'Reversed left and right click'
    });
  } else {
    // 未勾選時顯示普通視窗
	// Show warning window when checked
    Toast.fire({
      icon: 'warning',
      title: 'Reversing left and right click has been disabled.'
    });
  }
});

//顯示統計資料
//Display Statistics
function showdata() {
  Swal.fire({
    icon: 'info',
    title: 'Collection Progress',
    html: 'Total SSR Pulled：' + clknum + '<br><br>Units LB3 or Higher：' + starnum + '<br><br>Total Owned：' + collectnum + '／' + allnikkeLen + '<br><br>',
    buttonsStyling: false, // 關閉按鈕自訂樣式開關 | Off Button Custom Style Switch
    customClass: {
      closeButton: 'swal2-close', // 設定關閉按鈕的樣式為自訂樣式 | Set the style of the Close button to a customized style.
    }
  });
}

/*function showdata() {
  Swal.fire({
    icon: 'info',
    title: '收藏進度',
    html: 'SSR數量：' + clknum + '<br><br>突破三以上：' + starnum + '<br><br>已擁有比例：' + collectnum + '／' + allnikkeLen +
      '<br><br>極樂淨土：' + Elysionnum + '／' + ElysionLen + '<br><br>米西利斯：' + Missilisnum + '／' + MissilisLen + '<br><br>泰特拉：' + Tetranum + '／' + TetraLen +
      '<br><br>朝聖者：' + Pilgrimnum + '／' + PilgrimLen + '<br><br>反常：' + Abnormalnum + '／' + AbnormalLen,
    buttonsStyling: false, // 關閉按鈕自訂樣式開關 | Off Button Custom Style Switch
    customClass: {
      closeButton: 'swal2-close', // 設定關閉按鈕的樣式為自訂樣式 | Set the style of the Close button to a customized style.
    }
  });
}*/

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

function refreshNikkeImages() {
  const nikkeContainer = document.getElementById('nikke-images');
  nikkeContainer.innerHTML = ''; // Clear previous content
}