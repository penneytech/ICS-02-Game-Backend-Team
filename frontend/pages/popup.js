// Popup display

// help button variables assigned to html div
var myButton = document.getElementById("myButton");
var popup = document.getElementById("popup");

// when button clicked, help text will appear
myButton.onclick = function () {
  popup.style.display = "block";
}

// if escape key pressed, help text is exited
document.onkeydown = function (evt) {
  evt = evt || window.event;
  if (evt.keyCode == 27) {
    popup.style.display = "none";
  }
};

// if pressed off screen or outside the popup, help text disappears
window.onclick = function (event) {
  if (event.target == popup) {
    popup.style.display = "none";
  }
}
