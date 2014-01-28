//Author:Alberto Gonzalez Martinez
//Date:23 Jan 2014 (c)agon
//Javascript file to paint the map

// Include map_info.js

document.write('<scr'+'ipt type="text/javascript" src="map_info.js" ></scr'+'ipt>');
document.write('<scr'+'ipt type="text/javascript" src="death.js" ></scr'+'ipt>');
document.write('<scr'+'ipt type="text/javascript" src="death_days.js" ></scr'+'ipt>');
//initialize arrays to hold the position values for map lines, pumps and deaths
var line_points = new Array();
var line =[];
var pump_position = new Array();
var pump =[];
var death_position = new Array();
var death =[];
//initialize array to hold sex color of the death
var color = new Array();

//variable to set the scale
var scale=50;

// create a Stage using Kinetic.Stage
var stage = new Kinetic.Stage({
        container: 'container',
        width: 1920,
        height: 1080,
        draggable: true,
        });

// create a Layer using Kinetic.Layer
var layer =new Kinetic.Layer();

// read coordenates from map and draw a line
for (var i=0;i<Points.map.length;i++)
{
    //we see the number of points
    var number_points=Points.map[i].y;
    for (var j=1;j<number_points+1;j++)
    {
        line_points.push(Points.map[i+j].x*scale)
        line_points.push(Points.map[i+j].y*scale)
    } 
    
     // create a line
     line[i] = new Kinetic.Line({
     		x:0,
     		y:0,
            points: line_points,
            stroke: 'black',
            strokeWidth: 2,
          });
     layer.add(line[i]);
     i=i+j-1;
     line_points=[];
}

//Create the pumps array with their positions
for (var i=0;i<(Points.pumps.length);i++)
{
	console.log(i)
	pump_position.push(Points.pumps[i].x*scale)
	pump_position.push(Points.pumps[i].y*scale)
}

//Create the real pumps and add them to the layer
for (var i=0; i<pump_position.length;i++)
{	
	pump[i] = new Kinetic.Circle({
	        x: pump_position[i],
	        y: pump_position[i+1],
	        radius: 0.16*scale,
	        fill: 'blue',
	        stroke: 'black',
	        strokeWidth: 0.02*scale
	      });
	layer.add(pump[i]);
	i++;
}

//Array to hold the position of deaths
for (var i=0;i<Deaths.position.length;i++)
{
	death_position.push(Deaths.position[i].x*scale)
	death_position.push(Deaths.position[i].y*scale)
    if (Deaths.position[i].sex==1)
    {
        color.push('pink');
    }
    else
    {
        color.push('green');
    }
    //dummy value to mach the i changing by 2 in Add deaths to the layer
    color.push(0)
}
console.log(color)

//Add deaths to the layer
for (var i=0; i<death_position.length;i++)
{
	death[i] = new Kinetic.Rect({
		x:death_position[i],
		y:death_position[i+1],
		width: 0.1*scale,
        height: 0.1*scale,
        fill: color[i],
        stroke: 'black',
        strokeWidth: 0.01*scale
	});
	layer.add(death[i])
	i++;
}
//console.log(death)
//console.log(pump)

layer.draw();
stage.add(layer);
//console.log(stage);