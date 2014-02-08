//Author:Alberto Gonzalez Martinez
//Date:23 Jan 2014 (c)agon
//Javascript file to paint the map

// Include map_info.js, death.js, plot_flot.js

document.write('<scr'+'ipt type="text/javascript" src="map_info.js" ></scr'+'ipt>');
document.write('<scr'+'ipt type="text/javascript" src="death.js" ></scr'+'ipt>');
document.write('<scr'+'ipt type="text/javascript" src="death_days.js" ></scr'+'ipt>');

//variable to set the initial scale
var scale = 60;
var from = 0;
var to = Deaths.position.length;
var female_deaths_day = new Array ();
var male_deaths_day = new Array ();

//we save the amount of people that die each day
var deaths_per_day = new Array ();
var deaths_per_day_per_gender = new Array();
var deaths_all_gender = new Array();

for (var i=0; i<Death_dates.day.length; i++)
{
  deaths_per_day.push(Death_dates.day[i].deaths);
  console.log(deaths_per_day.length)
}

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
    age.push(Deaths.position[i].age)
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
      addNode(deathlayer,Deaths.position[i],scale,color,i,age);
  }
  var j =0;
  //Generate different genre deaths for each day
  for (var i=0; i<3;i++)
  {
        //Initialize count
        deaths_per_day_per_gender[i]=0
        deaths_per_day_per_gender[i+1]=0
        while (j<deaths_per_day[i])
        {
          deaths_per_day_per_gender[i]=+female_deaths_day[j];
          deaths_per_day_per_gender[i+1]=+male_deaths_day[j];
          j++;
        }
        console.log(j)
        i++;
        console.log(i)
  }
  console.log(female_deaths_day)
  console.log(male_deaths_day)
  console.log(deaths_per_day_per_gender) 
  maplayer.add(line_group)
  pumplayer.add(pump_group)
  //deathlayer.add(death)
  stage.add(maplayer);
  stage.add(pumplayer);
  stage.add(deathlayer);

  //Functions of paintMap fuction############################################

  //Function to create a node
  function addNode(layer,DeathsPosition,scale,color,i,DeathssperDay) {
        var death = new Kinetic.Rect({
          x: (DeathsPosition.x-3)*scale,
          y: -(DeathsPosition.y-19)*scale,
          width: 0.1*scale,
          height: 0.1*scale,
          fill: color[i],
          stroke: 'black',
          strokeWidth: 0.01*scale, 
          id: i,
          age: age[i]
        });
        if (death.attrs.fill=='pink')
        {
          female_deaths_day.push(1)
          male_deaths_day.push(0)
        }
        else{
          male_deaths_day.push(1)
          female_deaths_day.push(0)
        }
        deathlayer.add(death)
      }

  //Functions to see values of the data ////////////////////////////////////////
  
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
          var mousePos = node.getStage().getPointerPosition();
          tooltip.position({x:mousePos.x, y:mousePos.y - 5});
          tooltip.getText().text('Pump');
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

          var mousePos = stage.getPointerPosition();
          var x = mousePos.x;
          var y = mousePos.y;
          //writeMessage('x: ' + x + ', y: ' + y);
          writeMessage('Pump',x,y);
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
          if (node.attrs.fill=='pink'){
            gender="female";
          }
          else{
            gender="male";
          }
          if (node.attrs.age==0){
            age="0-10"
          }
          if (node.attrs.age==1){
            age="11-20"
          }
          if (node.attrs.age==2){
            age="21-40"
          }
          if (node.attrs.age==3){
            age="41-60"
          }
          if (node.attrs.age==4){
            age="61-80"
          }
          if (node.attrs.age==5){
            age=">80"    
          }
          tooltip.getText().text("gender: " + gender + ", " + "age: " + age);
          tooltip.show();
          tooltipLayer.batchDraw();
          console.log(node)
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
          writeMessage('Pump',x,y);
          console.log(offset.x)
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