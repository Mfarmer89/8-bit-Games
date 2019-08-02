
var pName = JSON.parse(localStorage.getItem("playerName")) || "";
var score = JSON.parse(localStorage.getItem("playerScore")) || "";

function renderChild(parent, elementType, data) {
  var element =  document.createElement(elementType);
  element.textContent = data ? data : "";
  parent.appendChild(element);
  return element;
}

function renderHeader() {
  var table = document.getElementById("table");
  var row = renderChild(table, "tr");
  var header =  document.createElement("th");
  header.setAttribute("colspan", "2");
  header.textContent = "Tetris Top Scores";
  row.appendChild(header);

}
function renderRow() {
  renderChild("table", "tr");
  renderChild("tr", "td", pName);
  renderChild("tr", "td", score);
}

renderHeader();
renderRow();


function storeData() {
  localStorage.setItem("playerName", JSON.stringify(NAME));
  localStorage.setItem("playerScore", JSON.stringify(SCORE));
}
