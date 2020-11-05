var root = document.getElementById("root");
var newWIN = null;
let n = 10,
    left = 1,
    right = 3;

function handler(event) {
    let parent = event.target.parentElement.cloneNode(true);
    let height = (event.target.parentElement.clientHeight + 20);
    let width = 165;
    if (newWIN == null || newWIN.closed) {
        createWIN(width, height);
    }
    else {
        newWIN.focus();
        if(Object.prototype.toString.call(newWIN) != "[object Window]") {
            newWIN.close();
            createWIN(width, height);
        }
        else newWIN.resizeTo(width + 20, height + 65);
    }
    let body = document.createElement("body");
	body.appendChild(parent);
    newWIN.document.body.innerHTML = body.innerHTML;
}

function createWIN(width, height) {
    newWIN = window.open("about:blank", "lab5", "width=" + width.toString() + ",height=" + height.toString()
        + "menubar=no,resizable=no,status=no,location=no");
    let head = document.createElement("head");
    let style = document.createElement("style");
    style.textContent = 
        "div {" +
        "\n\tdisplay:flex;" +
		"\n\talign-items: center;" +
        "\n\tflex-direction: column;" +
        "\n}" +
        "\nkbd {" +
        "\n\tmargin: 10px;" +
        "\n\ttext-align: center;" +
        "\n\tpadding: 30px;" +
        "\n\twidth: 70px;" +
        "\n\tbackground-color: #f2f4f4;" +
        "\n}";
    head.appendChild(style);
	newWIN.document.head.innerHTML = head.innerHTML;
}

for (let i = 0; i < n; i++) {
    let div = document.createElement("div");
    div.id = i;
    let len = getRandomIntInclusive(left, right);
    for (let j = 0; j < len; j++) {
        let elem = document.createElement("kbd");
        elem.textContent = "id=" + i;
        div.appendChild(elem);
    }
    root.appendChild(div);
}
for (let i = 0; i < n; i++) {
    elem = document.getElementById(i);
    let listTagName_kbd = elem.getElementsByTagName("kbd")
    for (let j = 0; j < listTagName_kbd.length; j++) {
		if(listTagName_kbd[j].addEventListener) listTagName_kbd[j].addEventListener("click", handler);
		else listTagName_kbd[j].attachEvent("onclick", handler);
    }
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

window.onbeforeunload = function() { if (newWIN != null && !newWIN.closed) newWIN.close(); }
