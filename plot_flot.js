//Author:Alberto Gonzalez Martinez
//Date:29 Jan 2014 (c)agon
//javascript to plot graph of death people using Flot Library

document.write('<scr'+'ipt type="text/javascript" src="map.js" ></scr'+'ipt>');


$(function() {

	//Change the width of the plot when hover over it

$( "#plot" ).mouseover (function() {
    $( this ).height( 400 );
    plot();
  });

$( "#plot" ).mouseout (function() {
    $( this ).height( 120 );
    plot();
  });

	var data = [{
		label: "Total",
		data: [
		  ["19-Aug",1  ],
		  ["20-Aug",1  ],
		  ["21-Aug",1  ],
		  ["22-Aug",0  ],
		  ["23-Aug",1  ],
		  ["24-Aug",1  ],
		  ["25-Aug",0  ],
		  ["26-Aug",1  ],
		  ["27-Aug",1  ],
		  ["28-Aug",1  ],
		  ["29-Aug",1  ],
		  ["30-Aug",8  ],
		  ["31-Aug",56  ],
		  ["01-Sep",143  ],
		  ["02-Sep",116  ],
		  ["03-Sep",54  ],
		  ["04-Sep",46  ],
		  ["05-Sep",36  ],
		  ["06-Sep",20  ],
		  ["07-Sep",28  ],
		  ["08-Sep",12  ],
		  ["09-Sep",11  ],
		  ["10-Sep",5  ],
		  ["11-Sep",5  ],
		  ["12-Sep",1  ],
		  ["13-Sep",3  ],
		  ["14-Sep",0  ],
		  ["15-Sep",1  ],
		  ["16-Sep",4  ],
		  ["17-Sep",2  ],
		  ["18-Sep",3  ],
		  ["19-Sep",0  ],
		  ["20-Sep",0  ],
		  ["21-Sep",2  ],
		  ["22-Sep",1  ],
		  ["23-Sep",1  ],
		  ["24-Sep",1  ],
		  ["25-Sep",1  ],
		  ["26-Sep",1  ],
		  ["27-Sep",1  ],
		  ["28-Sep",0  ],
		  ["29-Sep",0  ]
		]}, {
		label: "Female", 
		data: [
		  ["19-Aug",1  ],
		  ["20-Aug",1  ],
		  ["21-Aug",0  ],
		  ["22-Aug",0  ],
		  ["23-Aug",0  ],
		  ["24-Aug",1  ],
		  ["25-Aug",0  ],
		  ["26-Aug",1  ],
		  ["27-Aug",1  ],
		  ["28-Aug",0  ],
		  ["29-Aug",0  ],
		  ["30-Aug",5  ],
		  ["31-Aug",24  ],
		  ["01-Sep",78  ],
		  ["02-Sep",56  ],
		  ["03-Sep",30  ],
		  ["04-Sep",27  ],
		  ["05-Sep",16  ],
		  ["06-Sep",9  ],
		  ["07-Sep",13  ],
		  ["08-Sep",3  ],
		  ["09-Sep",4  ],
		  ["10-Sep",2  ],
		  ["11-Sep",3  ],
		  ["12-Sep",1  ],
		  ["13-Sep",1  ],
		  ["14-Sep",0  ],
		  ["15-Sep",0  ],
		  ["16-Sep",1  ],
		  ["17-Sep",2  ],
		  ["18-Sep",1  ],
		  ["19-Sep",0  ],
		  ["20-Sep",0  ],
		  ["21-Sep",1  ],
		  ["22-Sep",1  ],
		  ["23-Sep",1  ],
		  ["24-Sep",1  ],
		  ["25-Sep",1  ],
		  ["26-Sep",1  ],
		  ["27-Sep",0  ],
		  ["28-Sep",0  ],
		  ["29-Sep",0  ]
		]
	}, {
		label: "male", 
		data: [
		  ["19-Aug",0  ],
		  ["20-Aug",0  ],
		  ["21-Aug",1  ],
		  ["22-Aug",0  ],
		  ["23-Aug",1  ],
		  ["24-Aug",0  ],
		  ["25-Aug",0  ],
		  ["26-Aug",0  ],
		  ["27-Aug",0  ],
		  ["28-Aug",1  ],
		  ["29-Aug",1  ],
		  ["30-Aug",3  ],
		  ["31-Aug",32  ],
		  ["01-Sep",65  ],
		  ["02-Sep",60  ],
		  ["03-Sep",24  ],
		  ["04-Sep",19  ],
		  ["05-Sep",20  ],
		  ["06-Sep",11  ],
		  ["07-Sep",15  ],
		  ["08-Sep",9  ],
		  ["09-Sep",7  ],
		  ["10-Sep",3  ],
		  ["11-Sep",2  ],
		  ["12-Sep",0  ],
		  ["13-Sep",2  ],
		  ["14-Sep",0  ],
		  ["15-Sep",1  ],
		  ["16-Sep",3  ],
		  ["17-Sep",0  ],
		  ["18-Sep",2  ],
		  ["19-Sep",0  ],
		  ["20-Sep",0  ],
		  ["21-Sep",1  ],
		  ["22-Sep",0  ],
		  ["23-Sep",0  ],
		  ["24-Sep",0  ],
		  ["25-Sep",0  ],
		  ["26-Sep",0  ],
		  ["27-Sep",1  ],
		  ["28-Sep",0  ],
		  ["29-Sep",0  ]
		]
	}];

	//Create markings for the plot (When pump was removed)
	var markings = [
		{ color: "#000", lineWidth: 1, xaxis: { from: 19, to: 19 } },
	];

	var options = {
		series: {
			lines: {
				show: true
			},
			points: {
				show: true
			}
		},
		legend: {
			noColumns: 2
		},
		xaxis: {
			label: "Days",
			mode: "categories",
			tickDecimals: 0
		},
		yaxis: {
			min: 0
		},
		selection: {
			mode: "x"
		},
		color: "rgb(30, 180, 20)",
		grid: {
			markings: markings,
			hoverable: true
		},
		colors: ["black", "#FF6699", "green"]
	};

	var placeholder = $("#plot");

	placeholder.bind("plotselected", function (event, ranges) {
		//Array to save how many people die each day and the number of deaths in that range
		var deathPerDay = new Array ();
		var numberofdeaths = 0;
		var from = Math.ceil(ranges.xaxis.from.toFixed(1));
		var to = Math.floor(ranges.xaxis.to.toFixed(1));

		if (from != to){
			//Store the amount of death people for each day in the selected range in the array
			for (var i=from; i<to+1;i++){
				deathPerDay.push(Death_dates.day[i].deaths)
			}
		}
		else{
			deathPerDay.push(Death_dates.day[from].deaths)
		}
		//Number of death people during that range
		for(var i=0; i<deathPerDay.length;i++){
			numberofdeaths += deathPerDay[i];
		} 
		deathlayer.removeChildren();
		textlayer.removeChildren();
		//we paint the map knowing the number of dead people we know the number of (x,y) positions we need to get from the beginning of the range
		paintMap(scale,from,from+numberofdeaths);
		//console.log(from)
		//console.log(from)
		//console.log(to)
		//console.log(numberofdeaths)
		//console.log(deathPerDay.length)

		$("#selection").text(ranges.xaxis.from.toFixed(1) + " to " + ranges.xaxis.to.toFixed(1));


		$( "#plot" ).dblclick (function() {
    	$( this ).height( 300 );
    	plot();
  		});

		$( "#plot" ).click (function() {
    	$( this ).height( 120 );
    	plot();
  		});
  		date_from=xToDate(from)
  		date_to=xToDate(to)

		$("#selection").text(date_from + " to " + date_to);

		var zoom = $("#zoom").attr("checked");

		if (zoom) {
			plot = $.plot(placeholder, data, $.extend(true, {}, options, {
				xaxis: {
					min: ranges.xaxis.from,
					max: ranges.xaxis.to
				}
			}));
		}

		//Fuction to manage the zoom with the selected information
		$(document).ready(function()
		{
		  $("#plus").click(function(){
		    scale+=5;
		    deathlayer.removeChildren();
		    line_group.removeChildren();
		    pump_group.removeChildren();
		    textlayer.removeChildren();
		    paintMap(scale,from,from+numberofdeaths);
		  });
		  $("#minus").click(function(){
		    scale-=5;
		    deathlayer.removeChildren();
		    line_group.removeChildren();
		    pump_group.removeChildren();
		    textlayer.removeChildren();
		    paintMap(scale,from,from+numberofdeaths);
		  });
		});
	});

	placeholder.bind("plotunselected", function (event) {
			$("#selection").text("");
		});
	
	//Hover on the points of the map

	$("<div id='tooltip'></div>").css({
			position: "absolute",
			display: "none",
			border: "1px solid #fdd",
			padding: "2px",
			"background-color": "#fee",
			opacity: 0.80
		}).appendTo("body");

	$(placeholder).bind("plothover", function (event, pos, item) {


			var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";
			$("#hoverdata").text(str);

			if (item) {
				var x = Math.ceil(item.datapoint[0].toFixed(2)),
					y = Math.floor(item.datapoint[1].toFixed(2));

				x=xToDate(x);

				$("#tooltip").html(y + " " + item.series.label + " deaths on " + x )
					.css({top: item.pageY+5, left: item.pageX+5})
					.fadeIn(200);
			} else {
				$("#tooltip").hide();
			}
	});

	placeholder.bind("plotunselected", function (event) {
		$("#selection").text("");
	});
	plot();
	function plot (){
		var plot = $.plot(placeholder, data, options);

	var o = plot.pointOffset({ x: 19.2, y: 120});
	placeholder.append("<div style='position:absolute;left:" + (o.left + 4) + "px;top:" + o.top + "px;color:#666;font-size:smaller'> Broad St. Pump Removed</div>");
	}

	$("#clearSelection").click(function () {
		plot.clearSelection();
	});

	$("#setSelection").click(function () {
		plot.setSelection({
			xaxis: {
				from: 1994,
				to: 1995
			}
		});
	});

	// Add the Flot version string to the footer

	$("#footer").prepend("Flot " + $.plot.version + " &ndash; ");

	//function to change the data of axis x from numbers to the actual dates
	function xToDate(x){
		var date = "";
		if(x==0){
			date="19-Aug"
		}
		if (x==1){
			date="20-Aug"
		}
		if(x==2){
			date="21-Aug"
		}
		if(x==3){
			date="22-Aug"
		}
		if (x==4){
			date="23-Aug"
		}
		if (x==5){
			date="24-Aug"
		}
		if (x==6){
			date="25-Aug"
		}
		if (x==7){
			date="26-Aug"
		}
		if(x==8){
			date="27-Aug"
		}
		if (x==9){
			date="28-Aug"
		}
		if(x==10){
			date="29-Aug"
		}
		if(x==11){
			date="30-Aug"
		}
		if (x==12){
			date="31-Aug"
		}
		if(x==13){
			date="1-Sep"
		}
		if(x==14){
			date="2-Sep"
		}
		if (x==15){
			date="3-Sep"
		}
		if (x==16){
			date="4-Sep"
		}
		if (x==17){
			date="5-Sep"
		}
		if (x==18){
			date="6-Sep"
		}
		if(x==19){
			date="7-Sep"
		}
		if (x==20){
			date="8-Sep"
		}
		if(x==21){
			date="9-Sep"
		}
		if(x==22){
			date="10-Sep"
		}
		if (x==23){
			date="11-Sep"
		}
		if(x==24){
			date="12-Sep"
		}
		if(x==25){
			date="13-Sep"
		}
		if (x==26){
			date="14-Sep"
		}
		if (x==27){
			date="15-Sep"
		}
		if (x==28){
			date="16-Sep"
		}
		if (x==29){
			date="17-Sep"
		}
		if(x==30){
			date="18-Sep"
		}
		if (x==31){
			date="19-Sep"
		}
		if(x==32){
			date="20-Sep"
		}
		if(x==33){
			date="21-Sep"
		}
		if (x==34){
			date="22-Sep"
		}
		if(x==35){
			date="23-Sep"
		}
		if(x==36){
			date="24-Sep"
		}
		if (x==37){
			date="25-Sep"
		}
		if (x==38){
			date="26-Sep"
		}
		if (x==39){
			date="27-Sep"
		}
		if (x==40){
			date="28-Sep"
		}
		if(x==41){
			date="29-Sep"
		}
		return(date);
	}
});


