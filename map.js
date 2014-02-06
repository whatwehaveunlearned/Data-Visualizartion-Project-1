//Author:Alberto Gonzalez Martinez
//Date:23 Jan 2014 (c)agon
//Javascript file to paint the map

// Include map_info.js, death.js, plot_flot.js

document.write('<scr'+'ipt type="text/javascript" src="map_info.js" ></scr'+'ipt>');
document.write('<scr'+'ipt type="text/javascript" src="death.js" ></scr'+'ipt>');

//variable to set the initial scale
var scale = 60;
var from = 0;
var to = Deaths.position.length;


//initialize the stage
var stage = new Kinetic.Stage({
      container: 'map',
      //width: 1920,
      width:1020,
      height: 1080,
      draggable: true,
      });

//Create a group with all the objects of the map, another with the death, and the pumps
var line_group = new Kinetic.Group({
    });
var map_group = new Kinetic.Group({
    });
var death_group = new Kinetic.Group({
  });
var pump_group = new Kinetic.Group({
  });
// create a Layer using Kinetic.Layer
var maplayer = new Kinetic.Layer();
var pumplayer = new Kinetic.Layer();
var deathlayer = new Kinetic.Layer();
var textlayer = new Kinetic.Layer();

//we paint the initial map
paintMap(scale,from,to);


//########FUNCTIONS USED IN THIS JAVASCRIPT#############

//Function to paint the lines of the map, the pumps and the death people  with a given scale
function paintMap(scale,from,to)
{
  //initialize arrays to hold the position values for map lines, pumps and deaths
  var line_points = new Array();
  var line =[];
  var pump_position = new Array();
  var pump =[];
  var death_position = new Array();
  var death =[];
  //initialize array to hold sex color of the death
  var color = new Array();

  //read coordenates from map and draw a line
  for (var i=0;i<Points.map.length;i++)
  {
      //we see the number of points
      var number_points=Points.map[i].y;
      console.log(number_points);
      for (var j=1;j<number_points+1;j++)
      {
          line_points.push((Points.map[i+j].x-3)*scale)
          line_points.push(-(Points.map[i+j].y-19)*scale)
      }

      if(number_points<=4){
        stroke_line=0.08;
      }
      else{ 
        if(number_points>4){
          if(number_points<7){
            stroke_line=0.04;
          }
          if(number_points<=10){
            stroke_line=0.02;
          }
          if(number_points>10){
            stroke_line=0.01;
          }
        }
      }
      console.log(stroke_line);
      
       // create a line
       line[i] = new Kinetic.Line({
       		x:0,
       		y:0,
              points: line_points,
              stroke: 'white',
              strokeWidth: stroke_line*scale,
            });
       line_group.add(line[i]);
       i=i+j-1;
       line_points=[];
  }


  //Create the pumps array with their positions
  for (var i=0;i<Points.pumps.length;i++)
  {
  	pump_position.push((Points.pumps[i].x-3)*scale)
  	pump_position.push(-(Points.pumps[i].y-19)*scale)
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
    pump_group.add(pump[i]);
  	i++;
  }

  //Array to hold the position of deaths
  for (var i=0;i<Deaths.position.length;i++)
  {
  	death_position.push((Deaths.position[i].x-3)*scale)
  	death_position.push(-(Deaths.position[i].y-19)*scale)
      if (Deaths.position[i].sex==1)
      {
          color.push('pink');
      }
      else
      {
          color.push('green');
      }
  }

  //Add deaths to the layer
  for (var i=from; i<to;i++)
  {
  	death[i] = new Kinetic.Rect({
  		x:(Deaths.position[i].x-3)*scale,
  		y:-(Deaths.position[i].y-19)*scale,
  		width: 0.1*scale,
      height: 0.1*scale,
      fill: color[i],
      stroke: 'black',
      strokeWidth: 0.01*scale  
  	}); 
    death_group.add(death[i]);
  }
  maplayer.add(line_group)
  pumplayer.add(pump_group)
  deathlayer.add(death_group)
  stage.add(maplayer);
  stage.add(pumplayer);
  stage.add(deathlayer);

  //Functions to see values of the data
  //Pumps mouseover
  pumplayer.on('mouseover', function(event) {
          var mousePos = stage.getPointerPosition();
          var x = mousePos.x;
          var y = mousePos.y;
          //writeMessage('x: ' + x + ', y: ' + y);
          writeMessage('Pump',x,y);
        });
  pumplayer.on('mouseout', function(event) {
          var mousePos = stage.getPointerPosition();
          var x = mousePos.x;
          var y = mousePos.y;
          //writeMessage('x: ' + x + ', y: ' + y);
          writeMessage(' ');
        });
  //Deaths mouseover
  deathlayer.on('mouseover', function(event) {
          var mousePos = stage.getPointerPosition();
          var x = mousePos.x;
          var y = mousePos.y;
          death_x= death_group.Children[0];
          console.log(death_group)
          console.log(death_x)
          //writeMessage('x: ' + x + ', y: ' + y);
          writeMessage('Pump',x,y);
        });
  deathlayer.on('mouseout', function(event,death_group) {
          var mousePos = stage.getPointerPosition();
          var x = mousePos.x-40;
          var y = mousePos.y+10;
          //writeMessage('x: ' + x + ', y: ' + y);
          writeMessage(' ');
        });
  //streets mouseover
  maplayer.on('mouseover', function(event,death_group) {
          var mousePos = stage.getPointerPosition();
          var x = mousePos.x-40;
          var y = mousePos.y+10;
          //writeMessage('x: ' + x + ', y: ' + y);
          writeMessage('Pump',x,y);
        });
  maplayer.on('mouseout', function(event,death_group) {
          var mousePos = stage.getPointerPosition();
          var x = mousePos.x-40;
          var y = mousePos.y+10;
          //writeMessage('x: ' + x + ', y: ' + y);
          writeMessage(' ');
        });
  function writeMessage(message,x,y) {
          var text = new Kinetic.Text({
            x: x,
            y: y,
            fontFamily: 'Calibri',
            fontSize: 24,
            text: '',
            fill: 'black'
          });
            textlayer.removeChildren();
            text.setText(message);
            textlayer.add(text);
            textlayer.draw();
            stage.add(textlayer);
          }

}