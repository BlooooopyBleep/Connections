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
    document.getElementById("box" + (wordNum + 1)).innerHTML = data[wordNum];
    console.log(data[wordNum] + " loaded");
  }
}
   function resetGrid() {
      for (var wordNum = 1; wordNum <= 16; wordNum++) {
        document.getElementById("box" + wordNum).innerHTML = data[wordNum - 1];
      }
      for (var wordNum = 1; wordNum <= 16; wordNum++) {
        document.getElementById("num" + wordNum).innerHTML = "&nbsp";
      }
    } 




function handleTouchStart(event) {
  event.preventDefault();
  var touchedElement = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY);
  if (touchedElement && touchedElement.classList.contains('grid-item')) {
    selectedTextBox = touchedElement;
    highlightBox(selectedTextBox);
    selectedTextBox.style.transition = 'none';
    selectedTextBox.style.pointerEvents = 'none'; // Disable hitbox
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
