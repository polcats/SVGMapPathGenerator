var currentX, currentY;

function userClicked() {
    var x = event.clientX;
    var y = event.clientY + window.pageYOffset;

    currentX = x;
    currentY = y;

    var snowball = document.getElementById("circle");
    document.getElementById("coordinates").innerHTML = "x=" + x + "<br> y=" + y;
    snowball.style.position = "absolute";
    snowball.style.left = (x - 5) + 'px';
    snowball.style.top = (y - 5) + 'px';
}

function addPoint() {
    var points = document.getElementById("points").value;
    if (points.length > 0) {
        document.getElementById("points").value += ", " + currentX + " " + currentY;
    }
    else {
        document.getElementById("points").value += currentX + " " + currentY;
    }
}

function parseSVG(s) {
    var div = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
    div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + s + '</svg>';
    var frag = document.createDocumentFragment();
    while (div.firstChild.firstChild)
        frag.appendChild(div.firstChild.firstChild);
    return frag;
}

function show() {
    document.getElementsByTagName("svg")[0].innerHTML = "";
    var points = document.getElementById("points").value;
    var e = "<polyline  fill='none' stroke='red'  stroke-width='3' points='" + points + "'></polyline>";
    document.getElementsByTagName("svg")[0].appendChild(parseSVG(e));
}