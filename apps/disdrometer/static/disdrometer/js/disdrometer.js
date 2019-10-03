$(function () {
  (function (H) {
    H.wrap(H.ColorAxis.prototype, 'toColor', function (proceed, value, point) {
      if (value == 0)
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
      text: 'Diamètre des particules [mm]'
    },

    tooltip: {
      formatter: function () {

        return '<b>Nombre de particules: </b>' + this.point.value + ' <br><b>Diamètre: </b>' + this.series.yAxis.categories[this.point.y] + '<b>  mm <br></b>'
          + 'Mesure faite entre <b>' + secondsTimeSpanToHMS((this.point.x * 600) - 600) + '</b> et <b>' + secondsTimeSpanToHMS(this.point.x * 600) + '</b>';

      }
    },


    xAxis: {
      min: 1,
      max: 144,
      tickInterval: 6,
      labels: {
        step: 1,
        style: {
          fontSize: '8px'
        }
      }
    }
    ,
    yAxis: {
      title: {
        enabled: true,
        text: 'Diamètre: mm'
      },

      categories: ['', 0.06, 0.19, 0.31, 0.44, 0.56, 0.69, 0.81, 0.94, 1.06, 1.19, 1.37, 1.62, 1.87, 2.12, 2.37, 2.75, 3.25, 3.75, 4.25, 4.75, 5.50, 6.50, 7.50, 8.50, 9.50, 11.00, 13.00, 15.00, 17.00, 19.00, 21.50, 24.00, ''],
      min: 0,
      max: 32,


    }
    ,
    colorAxis: {
      min: [],
      max: [],
      startOnTick: true,
      endOnTick: true,
      labels: {
        format: '{value}'
      },
      stops: [
        [0, '#00007F'],
        [0.125, 'blue'],
        [0.25, '#007FFF'],
        [0.375, 'cyan'],
        [0.5, '#7FFF7F'],
        [0.625, 'yellow'],
        [0.75, '#FF7F00'],
        [0.875, 'red'],
        [1, '#7F0000']
      ]
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
  $.get(media_url + 'data/Timeserie_Diametre.csv', function (data) {
    // Split the lines
    var lines = data.split('\n');
    var fourCol = lines[1].split(",")[4];
    var fifCol = lines[1].split(",")[5];
    options1.colorAxis.min.push([parseFloat(fourCol)])
    options1.colorAxis.max.push([parseFloat(fifCol)])

    // Push column data into data list
    for (var i = 1; i < lines.length - 1; i++) {
      var firCol = lines[i].split(",")[1];
      var secCol = lines[i].split(",")[2];
      var thirdCol = lines[i].split(",")[3];

      options1.series[0].data.push([parseFloat(firCol), parseFloat(secCol), parseFloat(thirdCol)])
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
      text: 'Vitesse de chute des particules [m.s-1]'
    },
    tooltip: {
      formatter: function () {

        return '<b>Nombre de particules: </b>' + this.point.value + ' <br><b>Vitesse de chute: </b>' + this.series.yAxis.categories[this.point.y] + '<b>  m.s-1 <br></b>'
          + 'Mesure faite entre <b>' + secondsTimeSpanToHMS((this.point.x * 600) - 600) + '</b> et <b>' + secondsTimeSpanToHMS(this.point.x * 600) + '</b>';

      }
    },


    xAxis: {

      min: 1,
      max: 144,
      tickInterval: 6,
      labels: {
        step: 1,
        style: {
          fontSize: '8px'
        }
      }
    }
    ,
    yAxis: {
      title: {
        enabled: true,
        text: 'Vitesse de chute: m.s-1'
      },

      categories: ['', 0.05, 0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85, 0.95, 1.10, 1.30, 1.5, 1.7, 1.9, 2.2, 2.6, 3, 3.4, 3.8, 4.4, 5.2, 6, 6.8, 7.6, 8.8, 10.4, 12, 13.6, 15.2, 17.6, 20.80, ''],
      min: 0,
      max: 32

    }
    ,
    colorAxis: {
      min: [],
      max: [],
      startOnTick: true,
      endOnTick: true,
      labels: {
        format: '{value}'
      },
      stops: [
        [0, '#00007F'],
        [0.125, 'blue'],
        [0.25, '#007FFF'],
        [0.375, 'cyan'],
        [0.5, '#7FFF7F'],
        [0.625, 'yellow'],
        [0.75, '#FF7F00'],
        [0.875, 'red'],
        [1, '#7F0000']
      ]
    },
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

  $.get(media_url + 'data/Timeserie_Vitesse.csv', function (data) {
    // Split the lines
    var lines = data.split('\n');
    var fourCol = lines[1].split(",")[4];
    var fifCol = lines[1].split(",")[5];
    options2.colorAxis.min.push([parseFloat(fourCol)])
    options2.colorAxis.max.push([parseFloat(fifCol)])

    // Push column data into data list
    for (var i = 1; i < lines.length - 1; i++) {
      var firCol = lines[i].split(",")[1];
      var secCol = lines[i].split(",")[2];
      var thirdCol = lines[i].split(",")[3];
      options2.series[0].data.push([parseFloat(firCol), parseFloat(secCol), parseFloat(thirdCol)])
    }
    // Create the chart
    chart = new Highcharts.Chart(options2);
  });

  function secondsTimeSpanToHMS(s) {
    var h = Math.floor(s / 3600); //Get whole hours
    s -= h * 3600;
    var m = Math.floor(s / 60); //Get remaining minutes
    s -= m * 60;
    return h + "H" + (m < 10 ? '0' + m : m); //zero padding on minutes and seconds ref http://jsfiddle.net/9UGJc/3/
  }
});















