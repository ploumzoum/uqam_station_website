
$(document).ready(function(){
var today = new Date();
var year=  today.getFullYear();
var month = today.getMonth();
var options1 = {

    chart: {
        renderTo: 'container',
        polar: true,
        type: 'column'
    },

    title: {
            text: 'Rose des vents: Janvier 2014',
            align: 'left',
            floating: true,
            style: {
                fontWeight: 'bold'
            }
        }
,

    pane: {
        size: '85%'
    },

    legend: {
        align: 'right',
        verticalAlign: 'top',
        y: 100,
        layout: 'vertical',
        shadow:true
    },

     xAxis: {
        tickmarkPlacement: 'on',
        categories: ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
     },

    yAxis: {
        min: 0,
        endOnTick: false,
        showLastLabel: true,
        title: {
            text: 'Fréquence (%)'
        },
        labels: {
            formatter: function () {
                return this.value + '%';
            }
        },
        reversedStacks: false
    },
    	series: [{
				"data": [],
				"type": "column",
				"name": "[0-2] km.h-1",
                "color": '#00ffff'
			}, {
				"data": [],
				"type": "column",
				"name": "[2-4] km.h-1,",
                "color": '#00ff80'
			}, {
				"data": [],
				"type": "column",
				"name": "[4-6] km.h-1,",
                "color": '#ffff00'
			}, {
				"data": [],
				"type": "column",
				"name": "[6-8] km.h-1,",
                "color": '#ff8000'
			}, {
				"data": [],
				"type": "column",
				"name": "[8-10] km.h-1,",
                "color": '#ff4000'
			}, {
				"data": [],
				"type": "column",
				"name": "[10-inf] km.h-1",
                "color": '#bf00ff'
			}],

    tooltip: {
        valueSuffix: '%'
    },

    plotOptions: {
        series: {
            stacking: 'normal',
            shadow: false,
            groupPadding: 0,
            pointPlacement: 'on'
        }
    },
    credits: {
      enabled: false
  }

};
$.get('/media/data/wind_rose_data2014-01.csv', function(data) {
    // Split the lines
    var lines = data.split('\n');

    // Push column data into data list
    for (var i =1; i < lines.length-1; i++) {
        var cat = lines[i].split(",")[0]
        var firCol = lines[i].split(",")[1];
        var secCol = lines[i].split(",")[2];
        var thirdCol = lines[i].split(",")[3];
        var fourCol = lines[i].split(",")[4];
        var fifCol = lines[i].split(",")[5];
        var sixCol = lines[i].split(",")[6];
        options1.series[0].data.push(parseFloat(firCol))
        options1.series[1].data.push(parseFloat(secCol))
        options1.series[2].data.push(parseFloat(thirdCol))
        options1.series[3].data.push(parseFloat(fourCol))
        options1.series[4].data.push(parseFloat(fifCol))
        options1.series[5].data.push(parseFloat(sixCol))
    }


    // Create the chart
     chart = new Highcharts.Chart(options1);
});




$("#selector").change(function(){
var period = document.getElementById("period").value;
var month = document.getElementById("month").value;
if (month == '01')
         {
                var titre = 'Janvier '+period
         }
else if (month == '02')
         {
                var titre = 'Février '+period
         }
else if (month == '03')
         {
                var titre = 'Mars '+period
         }
else if (month == '04')
         {
                var titre = 'Avril '+period
         }
else if (month == '05')
         {
                var titre = 'Mai '+period
         }
else if (month == '06')
         {
                var titre = 'Juin '+period
         }
else if (month == '07')
         {
                var titre = 'Juillet '+period
         }
else if (month == '08')
         {
                var titre = 'Août '+period
         }
else if (month == '09')
         {
                var titre = 'Septembre '+period
         }
else if (month == '10')
         {
                var titre = 'Octobre '+period
         }
else if (month == '11')
         {
                var titre = 'Novembre '+period
         }
else if (month == '12')
         {
                var titre = 'Décembre '+period
         }
// Parse the data from an inline table using the Highcharts Data plugin
var options1 = {

    chart: {
        renderTo: 'container',
        polar: true,
        type: 'column'
    },

    title: {
            text: 'Rose des vents: '+titre,
            align: 'left',
            floating: true,
            style: {
                fontWeight: 'bold'
            }
        },

    subtitle: {
        text: ' '
    },

    pane: {
        size: '85%'
    },

    legend: {
        align: 'right',
        verticalAlign: 'top',
        y: 100,
        layout: 'vertical'
    },

     xAxis: {
        tickmarkPlacement: 'on',
        categories: ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
     },

    yAxis: {
        min: 0,
        endOnTick: false,
        showLastLabel: true,
        title: {
            text: 'Fréquence (%)'
        },
        labels: {
            formatter: function () {
                return this.value + '%';
            }
        },
        reversedStacks: false
    },
    	series: [{
				"data": [],
				"type": "column",
				"name": "[0-2] km.h-1",
                "color": '#00ffff'
			}, {
				"data": [],
				"type": "column",
				"name": "[2-4] km.h-1,",
                "color": '#00ff80'
			}, {
				"data": [],
				"type": "column",
				"name": "[4-6] km.h-1,",
                "color": '#ffff00'
			}, {
				"data": [],
				"type": "column",
				"name": "[6-8] km.h-1,",
                "color": '#ff8000'
			}, {
				"data": [],
				"type": "column",
				"name": "[8-10] km.h-1,",
                "color": '#ff4000'
			}, {
				"data": [],
				"type": "column",
				"name": "[10-inf] km.h-1",
                "color": '#bf00ff'
			}],

    tooltip: {
        valueSuffix: '%'
    },

    plotOptions: {
        series: {
            stacking: 'normal',
            shadow: false,
            groupPadding: 0,
            pointPlacement: 'on'
        }
    },
    credits: {
      enabled: false
  }

};
$.get('/media/data/wind_rose_data'+period+'-'+month+'.csv', function(data) {
    // Split the lines
    var lines = data.split('\n');

    // Push column data into data list
    for (var i =1; i < lines.length-1; i++) {
        var cat = lines[i].split(",")[0]
        var firCol = lines[i].split(",")[1];
        var secCol = lines[i].split(",")[2];
        var thirdCol = lines[i].split(",")[3];
        var fourCol = lines[i].split(",")[4];
        var fifCol = lines[i].split(",")[5];
        var sixCol = lines[i].split(",")[6];
        options1.series[0].data.push(parseFloat(firCol))
        options1.series[1].data.push(parseFloat(secCol))
        options1.series[2].data.push(parseFloat(thirdCol))
        options1.series[3].data.push(parseFloat(fourCol))
        options1.series[4].data.push(parseFloat(fifCol))
        options1.series[5].data.push(parseFloat(sixCol))
    }


    // Create the chart
     chart = new Highcharts.Chart(options1);
});

});

 });


