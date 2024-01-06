var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
var selectedTextBox = null;
var data= ["","","","","","","","","","","","","","","",""];
xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
    data = this.responseText.slice(1,-1).split(",");
    console.log(data+" loaded");
    loadData(data);
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
      loadData(data);
    }
  });
  xhr.open("GET", "https://play.william-duan.games:8443/api/v1/dailypuzzle");
  xhr.send();
}
function loadData(data) {
  for (var wordNum = 1; wordNum <= 16; wordNum++) {
    document.getElementById("box" + wordNum).innerHTML = data[wordNum - 1];
    console.log(data[wordNum] + " loaded");
  }
}
function resetGrid() {
  document.querySelectorAll('.grid-item').forEach(function (item) {
    item.classList.remove('redx');
  });
  for (var wordNum = 1; wordNum <= 16; wordNum++) {
    document.getElementById("box" + wordNum).innerHTML = data[wordNum - 1];
  }
  for (var wordNum = 1; wordNum <= 16; wordNum++) {
    document.getElementById("num" + wordNum).innerHTML = "&nbsp;";
  }
}
document.querySelector('.buttonLeft').addEventListener('click', resetGrid());
document.querySelector('.buttonLeft').addEventListener('touchend', resetGrid());
function toggleRectangle(rectangleId) {
  var rectangle = document.getElementById(rectangleId);
  rectangle.style.display = rectangle.style.display === 'none' ? 'block' : 'none';
}
function closeRectangle(rectangleId) {
  var rectangle = document.getElementById(rectangleId);
  rectangle.style.display = 'none';
}
function changeBodyClass(className) {
      document.body.className = className;
    }
   
    
function handleDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}
function handleDrop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text/plain");
  var draggedElement = document.getElementById(data);
  if (draggedElement.classList.contains('redx')) {
  }
  var target = event.target;
  while (target && !target.classList.contains('redx')) {
    target = target.parentElement;
  }
  if (target && target.classList.contains('redx')) {
    return;
  }
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
    selectedTextBox.style.pointerEvents = 'none'; 
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
    selectedTextBox.style.transition = '';
    selectedTextBox.style.left = '';
    selectedTextBox.style.top = '';
    selectedTextBox.style.pointerEvents = 'auto'; 
    document.querySelectorAll('.grid-item').forEach(function (box) {
      box.classList.remove('highlighted');
    });
    var target = document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
    if (selectedTextBox.classList.contains('redx')) {
      selectedTextBox = null; 
      return;
    }

    if (target && target.classList.contains('redx')) {
      selectedTextBox = null; 
      return;
    }

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
function checkAndAddRedX() {
  document.querySelectorAll('.grid-item.non-empty-item').forEach(function (item) {
    if (item.innerHTML.trim() === '&nbsp;') {
      item.innerHTML = "X";
    item.classList.add('redx');
    } 
  });
}
function checkAndRemoveRedX() {
  document.querySelectorAll('.grid-item.non-empty-item').forEach(function (item) {
    if (item.classList.contains('redx') && item.innerHTML.trim() !== 'X') {
      item.classList.remove('redx');
    }
  });
}
setInterval(checkAndRemoveRedX,1);
setInterval(checkAndAddRedX, 1);
document.addEventListener('touchstart', handleTouchStart, { passive: false });
document.addEventListener('touchmove', handleTouchMove, { passive: false });
document.addEventListener('touchend', handleTouchEnd);
