//Author:Alberto Gonzalez Martinez
//Date:23 Jan 2014 (c)agon
//Javascript file to paint the map

// Include map_info.js, death.js, plot_flot.js

document.write('<scr'+'ipt type="text/javascript" src="jsnow_data.json" ></scr'+'ipt>');
document.write('<scr'+'ipt type="text/javascript" src="death_days.js" ></scr'+'ipt>');

//Create the tabs for the application, about and info
$(function() {
    $("#tabs" ).tabs();
  });

//variable to set the initial scale
var scale = 60;
var from = 0;
var to = Deaths.position.length;

// Function to Check the values of the checkboxes
function checkbox(checkbox){
  var ages_range = new Array();
  ages_range.push(document.getElementById("0").checked);
  ages_range.push(document.getElementById("1").checked);
  ages_range.push(document.getElementById("2").checked);
  ages_range.push(document.getElementById("3").checked);
  ages_range.push(document.getElementById("4").checked);
  ages_range.push(document.getElementById("5").checked);
  ages_range.push(document.getElementById("6").checked);
  console.log(ages_range)
}

//Fuction to manage the zoom
    $(document).ready(function()
    {
      $("#plus").click(function(){
        scale+=5;
        deathlayer.removeChildren();
        line_group.removeChildren();
        pump_group.removeChildren();
        textlayer.removeChildren();
        paintMap(scale,from,to);
      });
      $("#minus").click(function(){
        scale-=5;
        deathlayer.removeChildren();
        line_group.removeChildren();
        pump_group.removeChildren();
        textlayer.removeChildren();
        paintMap(scale,from,to);
      });
    });

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
var tooltipLayer = new Kinetic.Layer();

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
  var age = new Array();
  //initialize array to hold where the pump is
  var at = new Array();
  at.push('Oxford Market');
  at.push('');
  at.push('Castle St. East');
  at.push('');
  at.push('Berners St.');
  at.push('');
  at.push('Newman St.');
  at.push('');
  at.push('Marlborough Mews');
  at.push('');
  at.push('Little Marlborogh St.')
  at.push('');
  at.push('Broad St.');
  at.push('');
  at.push('Warwick St.');
  at.push('');
  at.push('Bridle St.');
  at.push('');
  at.push('Rupert St.');
  at.push('');
  at.push('Dean St.');
  at.push('');
  at.push('Tichborne St.');
  at.push('');
  at.push('Vigo Street')



  //read coordenates from map and draw a line
  for (var i=0;i<Points.map.length;i++)
  {
      //we see the number of points
      var number_points=Points.map[i].y;
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
  for (var i=0; i<26;i++)
  {	
  	pump[i] = new Kinetic.Circle({
  	        x: pump_position[i],
  	        y: pump_position[i+1],
  	        radius: 0.16*scale,
  	        fill: 'blue',
  	        stroke: 'black',
  	        strokeWidth: 0.02*scale,
            at: at[i]
  	      });
    pump_group.add(pump[i]);
  	i++;
  }

  //Array to hold the position of deaths
  for (var i=0;i<Deaths.position.length;i++)
  {
  	death_position.push((Deaths.position[i].x-3)*scale)
  	death_position.push(-(Deaths.position[i].y-19)*scale)
    age.push(Deaths.position[i].age)
      if (Deaths.position[i].gender==1)
      {
          if (age[i]==0){
            color.push('#F2D0DC');
          }
          if (age[i]==1){
            color.push('#EEBCCD');
          }
          if (age[i]==2){
            color.push('#E8AABF');
          }
          if (age[i]==3){
            color.push('#CF90A6');
          }
          if (age[i]==4){
            color.push('#A17081');
          }
          if (age[i]==5){
            color.push('#73505C');   
          }
      }
      else
      {
        if (age[i]==0){
            color.push('#66E066');
          }
          if (age[i]==1){
            color.push('#33D633');
          }
          if (age[i]==2){
            color.push('#00CC00');
          }
          if (age[i]==3){
            color.push('#00A300');
          }
          if (age[i]==4){
            color.push('#008F00');
          }
          if (age[i]==5){
            color.push('#006600');   
          }
      }
  }    

  //Add deaths to the layer
  for (var i=from; i<to;i++)
  {
      addNode(deathlayer,Deaths.position[i],scale,color,i,age);  
  }

  //Add Workhouse and Brewery

  var workhouse = new Kinetic.Rect({
          x: 7.5*scale,
          y: 5.5*scale,
          width: 1.3*scale,
          height: 0.8*scale,
          fill: "#666666" ,
          stroke: 'black',
          strokeWidth: 0.01*scale, 
          rotation: -22
        });
  var brewery = new Kinetic.Rect({
          x: 10.83*scale,
          y: 6.61*scale,
          width: 0.9*scale,
          height: 0.38*scale,
          fill: "#666666" ,
          stroke: 'white',
          strokeWidth: 0.01*scale, 
          rotation: 61
        });

  line_group.add(workhouse)
  line_group.add(brewery)
  writeMessage("Work",7.6*scale,5.5*scale,-21,scale,"white",0.25)
  writeMessage("house",8*scale,5.7*scale,-21,scale,"white",0.25)
  writeMessage("Brewery",10.8*scale,6.68*scale,60,scale,"white",0.23)

  maplayer.add(line_group)
  pumplayer.add(pump_group)
  //deathlayer.add(death)
  stage.add(maplayer);
  stage.add(pumplayer);
  stage.add(deathlayer);

  //Add names of the streets (Hardcoded)
  writeMessage("Oxford Street",2.8*scale,3.2*scale,-12,scale,"black",0.25)
  writeMessage("Oxford Street",8.5*scale,2.1*scale,-12,scale,"black",0.25)
  writeMessage("Soho Square",14.45*scale,3.2*scale,-21,scale,"black",0.25)
  writeMessage("Regent Street",2.9*scale,3.7*scale,75,scale,"black",0.25)
  writeMessage("Regent Street",5.9*scale,10*scale,60,scale,"black",0.25)

  //Functions of paintMap fuction

  //Function to create a node
  function addNode(layer,DeathsPosition,scale,color,i) {
        var death = new Kinetic.Rect({
          x: (DeathsPosition.x-3)*scale,
          y: -(DeathsPosition.y-19)*scale,
          width: 0.1*scale,
          height: 0.1*scale,
          fill: color[i],
          stroke: 'black',
          strokeWidth: 0.01*scale, 
          id: i,
          age: age[i],
          gender: Deaths.position[i].gender
        });
        deathlayer.add(death)
      }

  //Functions to see values of the data
  
  //1. Pumps mouseover
  pumplayer.on('mouseover', function(evt) {
            
          //Text to display

          var tooltip = new Kinetic.Label({
          opacity: 0.75,
          visible: false,
          listening: false
        });
        
        tooltip.add(new Kinetic.Tag({
          fill: 'black',
          pointerDirection: 'down',
          pointerWidth: 10,
          pointerHeight: 10,
          lineJoin: 'round',
          shadowColor: 'black',
          shadowBlur: 10,
          shadowOffset: {x:10, y:10},
          shadowOpacity: 0.2
        }));
        
        tooltip.add(new Kinetic.Text({
          text: '',
          fontFamily: 'Calibri',
          fontSize: 18,
          padding: 5,
          fill: 'white'
        }));
        
        tooltipLayer.add(tooltip);
        stage.add(tooltipLayer);

        var node = evt.targetNode;
        if (node) {
          // update tooltip
          var mousePosx = node.attrs.x;
          var mousePosy = node.attrs.y;
          tooltip.position({x:mousePosx, y:mousePosy - 5});
          tooltip.getText().text(node.attrs.at + ' pump');
          tooltip.show();
          tooltipLayer.batchDraw();
        }

        pumplayer.on('mouseout', function(evt) {
        tooltip.hide();
        tooltipLayer.draw();
        });
        pumplayer.on('mouseout', function(evt) {
        tooltip.hide();
        tooltipLayer.draw();
        });
    });

  //Deaths mouseover

  deathlayer.on('mouseover', function(evt) {
          
          //Text to display

          var tooltip = new Kinetic.Label({
          opacity: 0.75,
          visible: false,
          listening: false
        });
        
        tooltip.add(new Kinetic.Tag({
          fill: 'black',
          pointerDirection: 'down',
          pointerWidth: 10,
          pointerHeight: 10,
          lineJoin: 'round',
          shadowColor: 'black',
          shadowBlur: 10,
          shadowOffset: {x:10, y:10},
          shadowOpacity: 0.2
        }));
        
        tooltip.add(new Kinetic.Text({
          text: '',
          fontFamily: 'Calibri',
          fontSize: 18,
          padding: 5,
          fill: 'white'
        }));
        
        tooltipLayer.add(tooltip);
        stage.add(tooltipLayer);

        var node = evt.targetNode;
        if (node) {
          // update tooltip
          var mousePosx = node.attrs.x;
          var mousePosy = node.attrs.y;
          tooltip.position({x:mousePosx, y:mousePosy - 5});
          if (node.attrs.gender==1){
            gender="female";
          }
          else{
            gender="male";
          }
          if (node.attrs.age==0){
            age=" < 10"
          }
          if (node.attrs.age==1){
            age="11 - 20"
          }
          if (node.attrs.age==2){
            age="21 - 40"
          }
          if (node.attrs.age==3){
            age="41 - 60"
          }
          if (node.attrs.age==4){
            age="61 - 80"
          }
          if (node.attrs.age==5){
            age=" > 80"    
          }
          tooltip.getText().text("" + gender + ", " + "age: " + age);
          tooltip.show();
          tooltipLayer.batchDraw();
        }

        deathlayer.on('mouseout', function(evt) {
        tooltip.hide();
        tooltipLayer.draw();
      });
        deathlayer.on('mouseout', function(evt) {
        tooltip.hide();
        tooltipLayer.draw();
        });
    });
  //streets mouseover
  maplayer.on('mouseover', function(event,death_group) {
          var mousePos = stage.getPointerPosition();
          var offset = stage.getOffset();
          var x = mousePos.x+offset.x;
          var y = mousePos.y+offset.y;
          //writeMessage('x: ' + x + ', y: ' + y);
          //writeMessage('Pump',x,y);
        });
  maplayer.on('mouseout', function(event,death_group) {
          var mousePos = stage.getPointerPosition();
          var x = mousePos.x-40;
          var y = mousePos.y+10;
          //writeMessage('x: ' + x + ', y: ' + y);
          //writeMessage(' ');
        });
  function writeMessage(message,x,y,rotation,scale,fill,fontsize) {
          var text = new Kinetic.Text({
            x: x,
            y: y,
            fontFamily: 'Calibri',
            fontSize: fontsize*scale,
            text: '',
            fill: fill,
            rotation: rotation
          });
            text.setText(message);
            textlayer.add(text);
            textlayer.draw();
            stage.add(textlayer);
          }
}
