var stage = new Kinetic.Stage({
container: 'map',
width: 600,
height: 600
});
var layer = new Kinetic.Layer();
// Outline
var poly = new Kinetic.Polygon({
    points: [0, 0, 400, 0, 400, 400, 0, 400],
    //fill: 'red',
    stroke: '#000',
    strokeWidth: 0,
    name: 'poly',
    draggable: false
});
var imageObj = new Image();
imageObj.src = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';
imageObj.onload = function() {
    poly.setFillPatternImage(imageObj);
    stage.draw();
}

layer.add(poly);
stage.add(layer);