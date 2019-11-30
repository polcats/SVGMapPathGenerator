var currentX, currentY;
var prevX, prevY;
var defaultPointerLocation = '69 69';

function userClicked() {
    var x = event.clientX;
    var y = event.clientY + window.pageYOffset;

    currentX = x;
    currentY = y;

    var coordinates = x + ' ' + y;
    movePointer(coordinates);
    addPoint();
    document.getElementById('coordinates').innerHTML = 'x=' + x + '<br> y=' + y;
}

function addPoint() {
    if (currentX == prevX && currentY == prevY) {
        return;
    }

    prevX = currentX;
    prevY = currentY;

    var points = document.getElementById('points').value;
    if (points.length > 0) {
        document.getElementById('points').value += ', ' + currentX + ' ' + currentY;
    } else {
        document.getElementById('points').value += currentX + ' ' + currentY;
    }
    showPath();
}

function movePointer(coordinates) {
    if (undefined == coordinates) {
        coordinates = defaultPointerLocation;
    }

    coordinates = coordinates.trim().split(' ');
    var snowball = document.getElementById('circle');
    snowball.style.position = 'absolute';
    snowball.style.left = coordinates[0] - 5 + 'px';
    snowball.style.top = coordinates[1] - 5 + 'px';
}

function clearPoint() {
    var newPointerLocation = '';
    var points = document.getElementById('points');
    var newPoints = points.value.split(',');
    if (newPoints.length > 0) {
        newPoints.pop();
        newPointerLocation = newPoints[newPoints.length - 1];
        newPoints.join(', ');
    }
    points.value = newPoints;
    showPath();
    movePointer(newPointerLocation);
}

function resetPoints() {
    document.getElementById('points').value = '';
    document.getElementsByTagName('svg')[0].innerHTML = '';
    movePointer(defaultPointerLocation);
}

function parseSVG(s) {
    var div = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
    div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + s + '</svg>';
    var frag = document.createDocumentFragment();
    while (div.firstChild.firstChild) frag.appendChild(div.firstChild.firstChild);
    return frag;
}

function showPath() {
    document.getElementsByTagName('svg')[0].innerHTML = '';
    var points = document.getElementById('points').value;
    var e = "<polyline  fill='none' stroke='red'  stroke-width='3' points='" + points + "'></polyline>";
    document.getElementsByTagName('svg')[0].appendChild(parseSVG(e));
}
