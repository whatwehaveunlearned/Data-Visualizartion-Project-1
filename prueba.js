	$(function() {

		var data = [{
			label: "United States",
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
			]}];

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
				mode: "categories",
				tickDecimals: 0
			},
			yaxis: {
				min: 0
			},
			selection: {
				mode: "x"
			}
		};

		var placeholder = $("#placeholder");

		placeholder.bind("plotselected", function (event, ranges) {

			$("#selection").text(ranges.xaxis.from.toFixed(1) + " to " + ranges.xaxis.to.toFixed(1));

			var zoom = $("#zoom").attr("checked");

			if (zoom) {
				plot = $.plot(placeholder, data, $.extend(true, {}, options, {
					xaxis: {
						min: ranges.xaxis.from,
						max: ranges.xaxis.to
					}
				}));
			}
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