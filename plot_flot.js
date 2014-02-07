//Author:Alberto Gonzalez Martinez
//Date:29 Jan 2014 (c)agon
//javascript to plot graph of death people using Flot Library

document.write('<scr'+'ipt type="text/javascript" src="map.js" ></scr'+'ipt>');
document.write('<scr'+'ipt type="text/javascript" src="death_days.js" ></scr'+'ipt>');
document.write('<scr'+'ipt type="text/javascript" src="death.js" ></scr'+'ipt>');

	$(function() {

		var data = [{
			label: "Number of deaths each day",
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
			]
		}, {
			label: "male", 
			data: [
			  ["19-Aug",1  ],
			  ["20-Aug",1  ],
			  ["21-Aug",0  ],
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
			]
		}];

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
			threshold: {
					below: 50,
					color: "rgb(200, 20, 30)"
				}
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
    		deathlayer.draw();
    		//we paint the map knowing the number of dead people we know the number of (x,y) positions we need to get from the beginning of the range
			paintMap(scale,from,from+numberofdeaths);
			//console.log(from)
			//console.log(from)
			//console.log(to)
			//console.log(numberofdeaths)
			//console.log(deathPerDay.length)

			$("#selection").text(from + " to " + to);

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
			    maplayer.draw();
				pumplayer.draw();
			    deathlayer.draw();
			    paintMap(scale,from,from+numberofdeaths);
			  });
			  $("#minus").click(function(){
			    scale-=5;
			    deathlayer.removeChildren();
			    line_group.removeChildren();
			    pump_group.removeChildren();
			    maplayer.draw();
				pumplayer.draw();
			    deathlayer.draw();
			    paintMap(scale,from,from+numberofdeaths);
			  });
			});
		});

		placeholder.bind("plotunselected", function (event) {
			$("#selection").text("");
		});

		var plot = $.plot(placeholder, data, options);

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
	});


