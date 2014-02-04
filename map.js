//Author:Alberto Gonzalez Martinez
//Date:23 Jan 2014 (c)agon
//Javascript file to paint the map

// Include map_info.js, death.js, plot_flot.js

document.write('<scr'+'ipt type="text/javascript" src="map_info.js" ></scr'+'ipt>');
document.write('<scr'+'ipt type="text/javascript" src="death.js" ></scr'+'ipt>');
document.write('<scr'+'ipt type="text/javascript" src="plot_flot.js" ></scr'+'ipt>');

//initialize arrays to hold the position values for map lines, pumps and deaths
var line_points = new Array();
var line =[];
var pump_position = new Array();
var pump =[];
var death_position = new Array();
var death =[];
//initialize array to hold sex color of the death
var color = new Array();

//variable to set the initial scale
var scale=50;

//Fuction to manage the zoom
$(document).ready(function(){
  $("#plus").click(function(){
    scale+=10;
    map_group.removeChildren();
    maplayer.draw();
    paintMap(scale);
  });
  $("#minus").click(function(){
    scale-=10;
    map_group.removeChildren();
    maplayer.draw();
    paintMap(scale);
  });
});

//initialize the stage
  var stage = new Kinetic.Stage({
        container: 'map',
        width: 1920,
        height: 1080,
        draggable: true,
        });
//Create a group with all the objects of the map
 var map_group = new Kinetic.Group({
      });
// create a Layer using Kinetic.Layer
var maplayer =new Kinetic.Layer();

//we paint the initial map
paintMap(scale);

//Function to paint the lines of the map, the pumps and the death people 
function paintMap(scale)
{
  maplayer.clear();
  maplayer.clearBeforeDraw(true);
  //read coordenates from map and draw a line
  for (var i=0;i<Points.map.length;i++)
  {
      //we see the number of points
      var number_points=Points.map[i].y;
      for (var j=1;j<number_points+1;j++)
      {
          line_points.push((Points.map[i+j].x-3.3900001)*scale)
          line_points.push(-(Points.map[i+j].y-18.7250004)*scale)
      } 
      
       // create a line
       line[i] = new Kinetic.Line({
       		x:0,
       		y:0,
              points: line_points,
              stroke: 'white',
              strokeWidth: 2,
            });
       map_group.add(line[i]);
       i=i+j-1;
       line_points=[];
  }


  //Create the pumps array with their positions
  for (var i=0;i<(Points.pumps.length);i++)
  {
  	pump_position.push((Points.pumps[i].x-3.3900001)*scale)
  	pump_position.push(-(Points.pumps[i].y-18.7250004)*scale)
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
    map_group.add(pump[i]);
  	i++;
  }

  //Array to hold the position of deaths
  for (var i=0;i<Deaths.position.length;i++)
  {
  	death_position.push((Deaths.position[i].x-3.3900001)*scale)
  	death_position.push(-(Deaths.position[i].y-18.7250004)*scale)
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
    map_group.add(death[i]);
  	i++;
  }
  //console.log(death_position)
  //console.log(pump)

  maplayer.add(map_group)
  stage.add(maplayer);
}