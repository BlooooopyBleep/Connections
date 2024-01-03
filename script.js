var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
var selectedTextBox = null;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
    var split = this.responseText.slice(1,-1).split(",");
    loadData(split);
  }
});

xhr.open("GET", "https://play.william-duan.games:8443/api/v1/dailypuzzle");

xhr.send();

function test() {
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  var selectedTextBox = null;

  xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      console.log(this.responseText);
      var split = this.responseText.slice(1,-1).split(",");
      loadData(split);
    }
  });

  xhr.open("GET", "https://play.william-duan.games:8080/api/v1/dailypuzzle");

  xhr.send();
}

function loadData(data) {
  for (var wordNum = 0; wordNum < data.length; wordNum++) {
    var gridItem = document.createElement('div');
    gridItem.className = 'grid-item';
    gridItem.draggable = true;
    gridItem.textContent = data[wordNum];
    document.getElementById('gridContainer').appendChild(gridItem);
    console.log(data[wordNum] + " loaded");
  }
}

function resetGrid() {
  for (var wordNum = 1; wordNum <= 16; wordNum++) {
    document.getElementById("box" + wordNum).innerHTML = data[wordNum - 1];
  }
  for (var wordNum = 1; wordNum <= 16; wordNum++) {
    document.getElementById("num" + wordNum).innerHTML = "&nbsp;";
  }
}

function toggleRectangle(rectangleId) {
  var rectangle = document.getElementById(rectangleId);
  rectangle.style.display = rectangle.style.display === 'none' ? 'block' : 'none';
}

function closeRectangle(rectangleId) {
  var rectangle = document.getElementById(rectangleId);
  rectangle.style.display = 'none';
}

function handleDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

function handleDrop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text/plain");
  var draggedElement = document.getElementById(data);

  if (event.target.classList.contains('grid-item') && !event.target.classList.contains('selected')) {
    var targetText = event.target.innerHTML;
    event.target.innerHTML = draggedElement.innerHTML;
    draggedElement.innerHTML = targetText;
  }
}

function handleDragOver(event) {
  event.preventDefault();
}

var gridItems = document.querySelectorAll('.grid-item');
gridItems.forEach(function (item) {
  item.setAttribute('draggable', true);
  item.addEventListener('dragstart', handleDragStart);
});

document.addEventListener('dragover', handleDragOver);
document.addEventListener('drop', handleDrop);


function openMenu(menuId) {
  var menu = document.getElementById(menuId);
  menu.style.display = 'block';
}

function closeMenu() {
  var menus = document.getElementsByClassName('menu');
  for (var i = 0; i < menus.length; i++) {
    menus[i].style.display = 'none';
  }
}


var selectedTextBox = null;

function handleTouchStart(event) {
  event.preventDefault();
  var touchedElement = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY);
  if (touchedElement && touchedElement.classList.contains('grid-item')) {
    selectedTextBox = touchedElement;
    highlightBox(selectedTextBox);
    selectedTextBox.style.transition = 'none';
    selectedTextBox.style.pointerEvents = 'none'; // Disable hitbox
    selectedTextBox.style.pointerEvents = 'none'; 
  }
}

function handleTouchMove(event) {
  event.preventDefault();
  if (selectedTextBox) {
    var rect = selectedTextBox.getBoundingClientRect();
    var offsetX = rect.width / 2;
    var offsetY = rect.height / 2;
    var scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    selectedTextBox.style.left = event.touches[0].clientX - offsetX + scrollX + 'px';
    selectedTextBox.style.top = event.touches[0].clientY - offsetY + scrollY + 'px';
  }
}
function handleTouchEnd(event) {
  event.preventDefault();
  if (selectedTextBox) {
    selectedTextBox.style.transition = ''; // Reset transition
    selectedTextBox.style.left = '';
    selectedTextBox.style.top = '';
    selectedTextBox.style.pointerEvents = 'auto'; // Enable hitbox
    document.querySelectorAll('.grid-item').forEach(function (box) {
      box.classList.remove('highlighted');
    });
    var target = document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
    if (target && target.classList.contains('grid-item') && !target.classList.contains('selected')) {
      var data = selectedTextBox.innerHTML;
      selectedTextBox.innerHTML = target.innerHTML;
      target.innerHTML = data;
    }
    selectedTextBox = null;
  }
}
function highlightBox(touchedTextBox) {
  document.querySelectorAll('.grid-item').forEach(function (box) {
    box.classList.remove('highlighted');
  });
  if (touchedTextBox.classList.contains('grid-item') && !touchedTextBox.classList.contains('selected')) {
    touchedTextBox.classList.add('highlighted');
  }
}
document.addEventListener('touchstart', handleTouchStart, { passive: false });
document.addEventListener('touchmove', handleTouchMove, { passive: false });
document.addEventListener('touchend', handleTouchEnd);
