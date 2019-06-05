$(function () {

    (function (H) {
        H.wrap(H.ColorAxis.prototype, 'toColor', function (proceed, value, point) {
            if(value == 0)
                return 'rgba(255, 255, 255, 0)'; // My color
            else
                return proceed.apply(this, Array.prototype.slice.call(arguments, 1)); // Normal coloring
        });
    }(Highcharts));

    ///premier tracé pour le diamètre
var options1 = {

        chart: {
            type: 'heatmap',
            renderTo: 'graphdiv',
             zoomType: 'xy',

        },


        title: {
            text: 'Vitesse Doppler [m/s]'
        },

       tooltip: {
            formatter: function () {
            return  this.point.value + ' <b>m.s-1</b><br>'
              + 'Mesure faite entre <b>'+  secondsTimeSpanToHMS((this.point.x*600)-300) + '</b> et <b>' +  secondsTimeSpanToHMS(this.point.x*600)+'</b>';
            }
        },
         boost: {
        useGPUTranslations: true
    },

      xAxis: {
      min: 1,
      max: 287,
      tickInterval:10,
      labels: {
      	step: 1,
        style: {
        	fontSize:'8px'
        }
      }
      }
     ,
     yAxis: {
       title: {
        enabled: true,
        text: 'Altitude'},

          categories: ['',0.05,0.15,0.25,0.35,0.45,0.55,0.65,0.75,0.85,0.95,1.10,1.30,1.5,1.7,1.9,2.2,2.6,3,3.4,3.8,4.4,5.2,6,6.8,7.6,8.8,10.4,12,13.6,15.2,17.6,20.80,''],
          min: 0,
          max: 32


    }
    ,
     colorAxis: {

    stops: [
      [0, '#3060cf'],
      [0.5, '#fffbbc'],
      [0.9, '#c4463a'],
      [1, '#c4463a']
    ],
     min: [],
     max: [],
        startOnTick: true,
        endOnTick: true,
        labels: {
            format: '{value}'
        }

  },

        series: [{
        nullColor: '#EFEFEF',
            data: [],
             borderWidth: 0
        }],
    credits: {
      enabled: false
  }
 };
    $.get('/media/data/resultDoppler.csv', function(data) {
    // Split the lines
    var lines = data.split('\n');
    var fourCol = lines[1].split(",")[4];
    var fifCol  = lines[1].split(",")[5];
    options1.colorAxis.min.push([parseFloat(fourCol)])
    options1.colorAxis.max.push([parseFloat(fifCol)])

    // Push column data into data list
    for (var i =1; i < lines.length-1; i++) {
        var firCol = lines[i].split(",")[1];
        var secCol = lines[i].split(",")[2];
        var thirdCol = lines[i].split(",")[3];
        options1.series[0].data.push([parseFloat(firCol),parseFloat(secCol),parseFloat(thirdCol)])
    }

    // Create the chart
     chart = new Highcharts.Chart(options1);
});

    ///deuxieme tracé pour la vitesse

var options2 = {

        chart: {
            type: 'heatmap',
            renderTo: 'graphdiv2',
             zoomType: 'xy',
        },


        title: {
            text: 'Réflectivité [dBz]'
        },
            tooltip: {
            formatter: function () {

              return  this.point.value + ' <b>dBz</b><br>'
              + 'Mesure faite entre <b>'+  secondsTimeSpanToHMS((this.point.x*600)-300) + '</b> et <b>' +  secondsTimeSpanToHMS(this.point.x*600)+'</b>';

            }
        },


       xAxis: {

	  min: 1,
      max: 287,
      tickInterval:10,
      labels: {
      	step: 1,
        style: {
        	fontSize:'8px'
        }
      }
      }
      ,
     yAxis: {
        title: {
        enabled: true,
        text: 'Altitude'},

        categories: ['',0.05,0.15,0.25,0.35,0.45,0.55,0.65,0.75,0.85,0.95,1.10,1.30,1.5,1.7,1.9,2.2,2.6,3,3.4,3.8,4.4,5.2,6,6.8,7.6,8.8,10.4,12,13.6,15.2,17.6,20.80,''],
          min: 0,
          max: 32

    }
    ,
    colorAxis: {
        stops: [
            [0, '#3060cf'],
            [0.1, '#66aee2'],
            [0.2, '#8ec5ed'],
            [0.3, '#4ee8b4'],
            [0.4, '#7ee567'],
            [0.5, '#fffbbc'],
            [0.6, '#f2c05e'],
            [0.7, '#ed9549'],
            [0.8, '#ed7031'],
            [0.9, '#ed4d21'],
            [1, '#c4463a']
        ],
        min: [],
        max: [],
        startOnTick: true,
        endOnTick: true,
        labels: {
            format: '{value}'
        }
    }
    ,
        series: [{
        nullColor: '#EFEFEF',
            data: [],
             borderWidth: 0
        }]
    ,
    credits: {
      enabled: false
  }
 };

    $.get('/media/data/resultreflectivity_2D.csv', function(data) {
    // Split the lines
    var lines = data.split('\n');
    var fourCol = lines[1].split(",")[4];
    var fifCol  = lines[1].split(",")[5];
    options2.colorAxis.min.push([parseFloat(fourCol)])
    options2.colorAxis.max.push([parseFloat(fifCol)])

    // Push column data into data list
    for (var i =1; i < lines.length-1; i++) {
        var firCol = lines[i].split(",")[1];
        var secCol = lines[i].split(",")[2];
        var thirdCol = lines[i].split(",")[3];
        options2.series[0].data.push([parseFloat(firCol),parseFloat(secCol),parseFloat(thirdCol)])
    }
    // Create the chart
     chart = new Highcharts.Chart(options2);
});
function secondsTimeSpanToHMS(s) {
    var h = Math.floor(s / 3600); //Get whole hours
    s -= h * 3600;
    var m = Math.floor(s / 60); //Get remaining minutes
    s -= m * 60;
    return h + "H" + (m < 10 ? '0' + m : m)  ; //zero padding on minutes and seconds ref http://jsfiddle.net/9UGJc/3/
}
});















