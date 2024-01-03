var xhr = new XMLHttpRequest;
xhr.withCredentials = !0;
var selectedTextBox = null;

function test() {
	var e = new XMLHttpRequest;
	e.withCredentials = !0, e.addEventListener("readystatechange", function() {
		4 === this.readyState && (console.log(this.responseText), loadData(this.responseText.slice(1, -1).split(",")))
	}), e.open("GET", "https://play.william-duan.games:8080/api/v1/dailypuzzle"), e.send()
}

function loadData(e) {
	for (var t = 0; t < e.length; t++) document.getElementById("box" + (t + 1)).innerHTML = e[t], console.log(e[t] + " loaded")
}

function resetGrid() {
	for (var e = 1; e <= 16; e++) document.getElementById("box" + e).innerHTML = e[e - 1];
	for (var e = 1; e <= 16; e++) document.getElementById("num" + e).innerHTML = "&nbsp;"
}
document.querySelector('.buttonLeft').addEventListener('click', resetGrid);
document.querySelector('.buttonLeft').addEventListener('touchend', resetGrid);

function toggleRectangle(e) {
	var t = document.getElementById(e);
	t.style.display = "none" === t.style.display ? "block" : "none"
}

function closeRectangle(e) {
	document.getElementById(e).style.display = "none"
}

function handleDragStart(e) {
	e.dataTransfer.setData("text/plain", e.target.id)
}

function handleDrop(e) {
	e.preventDefault();
	var t = e.dataTransfer.getData("text/plain"),
		n = document.getElementById(t);
	if (e.target.classList.contains("grid-item") && !e.target.classList.contains("selected")) {
		var l = e.target.innerHTML;
		e.target.innerHTML = n.innerHTML, n.innerHTML = l
	}
}

function handleDragOver(e) {
	e.preventDefault()
}
xhr.addEventListener("readystatechange", function() {
	4 === this.readyState && (console.log(this.responseText), loadData(this.responseText.slice(1, -1).split(",")))
}), xhr.open("GET", "https://play.william-duan.games:8443/api/v1/dailypuzzle"), xhr.send();
var gridItems = document.querySelectorAll(".grid-item");

function openMenu(e) {
	document.getElementById(e).style.display = "block"
}

function closeMenu() {
	for (var e = document.getElementsByClassName("menu"), t = 0; t < e.length; t++) e[t].style.display = "none"
}
gridItems.forEach(function(e) {
	e.setAttribute("draggable", !0), e.addEventListener("dragstart", handleDragStart)
}), document.addEventListener("dragover", handleDragOver), document.addEventListener("drop", handleDrop);
var selectedTextBox = null;

function handleTouchStart(e) {
	e.preventDefault();
	var t = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
	t && t.classList.contains("grid-item") && (highlightBox(selectedTextBox = t), selectedTextBox.style.transition = "none", selectedTextBox.style.pointerEvents = "none", selectedTextBox.style.pointerEvents = "none")
}

function handleTouchMove(e) {
	if (e.preventDefault(), selectedTextBox) {
		var t = selectedTextBox.getBoundingClientRect(),
			n = t.width / 2,
			l = t.height / 2,
			s = window.pageXOffset || document.documentElement.scrollLeft,
			a = window.pageYOffset || document.documentElement.scrollTop;
		selectedTextBox.style.left = e.touches[0].clientX - n + s + "px", selectedTextBox.style.top = e.touches[0].clientY - l + a + "px"
	}
}

function handleTouchEnd(e) {
	if (e.preventDefault(), selectedTextBox) {
		selectedTextBox.style.transition = "", selectedTextBox.style.left = "", selectedTextBox.style.top = "", selectedTextBox.style.pointerEvents = "auto", document.querySelectorAll(".grid-item").forEach(function(e) {
			e.classList.remove("highlighted")
		});
		var t = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
		if (t && t.classList.contains("grid-item") && !t.classList.contains("selected")) {
			var n = selectedTextBox.innerHTML;
			selectedTextBox.innerHTML = t.innerHTML, t.innerHTML = n
		}
		selectedTextBox = null
	}
}

function highlightBox(e) {
	document.querySelectorAll(".grid-item").forEach(function(e) {
		e.classList.remove("highlighted")
	}), e.classList.contains("grid-item") && !e.classList.contains("selected") && e.classList.add("highlighted")
}
document.addEventListener("touchstart", handleTouchStart, {
	passive: !1
}), document.addEventListener("touchmove", handleTouchMove, {
	passive: !1
}), document.addEventListener("touchend", handleTouchEnd);
