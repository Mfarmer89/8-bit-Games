
var pName = JSON.parse(localStorage.getItem("playerName")) || "";
var score = JSON.parse(localStorage.getItem("playerScore")) || "";
var table = document.getElementById("table");


pName = "John";
score = 90;

function renderChild(parent, elementType, data) {
  var element =  document.createElement(elementType);
  element.textContent = data ? data : "";
  parent.appendChild(element);
  return element;
}

function renderHeader() {
  table.innerHTML = "";
  var row = renderChild(table, "tr");
  var header =  document.createElement("th");
  header.setAttribute("colspan", "2");
  header.textContent = "Tetris Top Scores";
  row.appendChild(header);

}
function renderRow() {
  var row = renderChild(table, "tr");
  renderChild(row, "td", pName);
  renderChild(row, "td", score);
}

renderHeader();
renderRow();
