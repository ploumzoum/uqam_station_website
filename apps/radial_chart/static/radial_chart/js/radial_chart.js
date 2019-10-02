var width = 1000,
  margin = 20,
  height = 650,
  svg = d3.select('svg'),
  origin = svg.append('g')
    .attr('transform', 'translate(' + width * 3 / 5 + ',' + height / 2 + ')'),
  rScale = d3.scale.linear()
    .domain([-40, 40])
    .range([0, height / 2 - margin]),
  yScale = (day, temp) => -Math.cos(angleScale(day) * Math.PI / 180) * rScale(parseInt(temp)),
  xScale = (day, temp) => Math.sin(angleScale(day) * Math.PI / 180) * rScale(parseInt(temp)),
  angleScale = d3.scale.linear()
    .range([0, 360]);

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-20, -20])
  .direction('sw')
  .html(function (d) {
    return "Jour: <span style='color:red'>" + d.date + "</span> <br> Minimum: "
      + d.min + "<br> Maximum: " + d.max + "<br> Record Max: " + d.recHigh +
      "<br> Record Min: " + d.recLow + "<br> Moyenne Max: " + d.avgHigh +
      "<br> Moyenne Min: " + d.avgLow + "";
  })

var drawRadial = function (chart, cl, data, low, high) {
  chart.selectAll('line.' + cl)
    .data(data)
    .enter().append('line')
    .attr('x1', (d) => xScale(d.index, d[low]))
    .attr('x2', (d) => xScale(d.index, d[high]))
    .attr('y1', (d) => yScale(d.index, d[low]))
    .attr('y2', (d) => yScale(d.index, d[high]))
    .attr('class', cl)
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);
};

svg.call(tip);

d3.json('http://resources.station.escer.uqam.ca/data/UQAM_radial.json', function (err, json) {
  angleScale.domain([0, json.values.length - 1]);

  var min = d3.min(json.values, d => parseInt(d.recLow)),
    max = d3.max(json.values, d => parseInt(d.recHigh));

  var months = [];
  //find index for months based on data
  json.values.forEach((d, i) => {
    var month = d.date.split('-')[1],
      prevDaysMonth = (i === 0) ? undefined : json.values[i - 1].date.split('-')[1];
    if (i === 0 || month != prevDaysMonth) {
      months.push({
        month: month,
        index: i
      });
    }
  })

  //circle axis
  origin.selectAll('circle.axis-green')
    .data([-20, -10, 0, 10, 20, 30])
    .enter().append('circle')
    .attr('r', (d) => rScale(d))
    .attr('class', 'axis record')

  //record low and high
  drawRadial(origin, 'record', json.values, 'recLow', 'recHigh')

  //avg low and high
  drawRadial(origin, 'avg', json.values, 'avgLow', 'avgHigh')

  //this year's temperature
  var thisYear = json.values.filter(d => d.min);

  drawRadial(origin, 'year', thisYear, 'min', 'max')

  var lowLower = json.values.filter(d => d.min && parseInt(d.min) < parseInt(d.avgLow));
  drawRadial(origin, 'yearLow', lowLower, 'min', 'avgLow')

  var highHigher = json.values.filter(d => d.min && parseInt(d.max) > parseInt(d.avgHigh));
  drawRadial(origin, 'yearHigh', highHigher, 'max', 'avgHigh')

  var circleAxis = [-30, -20, -10, 0, 10, 20, 30]
  circleAxis = circleAxis.map((d) => {
    return {temp: d, index: 320}
  })

  //temperature axis
  origin.selectAll('circle.axis-white')
    .data(circleAxis)
    .enter().append('circle')
    .attr('r', (d) => rScale(d.temp))
    .attr('class', 'axis')

  //temperature axis labels
  origin.selectAll('text.temp')
    .data(circleAxis)
    .enter().append('text')
    .attr('x', d => {
      return xScale(d.index, d.temp)
    })
    .attr('y', d => yScale(d.index, d.temp))
    .text(d => d.temp + '°')
    .attr('class', 'temp');

  //axis lines
  var axis = origin.append('g');

  axis.selectAll('line.axis')
    .data(months)
    .enter().append('line')
    .attr('x2', d => {
      return xScale(d.index, 30)
    })
    .attr('y2', d => -yScale(d.index, 30))
    .attr('class', 'axis');

  var monthLabels = months.filter((d, i) => i % 1 === 0)
  //month labels
  axis.selectAll('text.months')
    .data(monthLabels)
    .enter().append('text')
    .attr('x', d => {
      return xScale(d.index, 40)
    })
    .attr('y', d => yScale(d.index, 40))
    .text(d => d.month)
    .attr('class', 'months');

  //center for reference
  axis.append('circle')
    .attr('r', 3)
    .attr('class', 'avg')

  //title
  svg.append('text')
    .attr('x', 30)
    .attr('y', 60)
    .text(json.name)
    .attr('class', 'title')

  //subtitle
  svg.append('text')
    .attr('x', 30)
    .attr('y', 100)
    .text('')

  //create legend
  var legendScale = d3.scale.ordinal()
    .domain(['Record quotidien (observé de 2014 à 2018)', 'Moyenne journalière (période 2014 à 2018)', 'Année courante : Valeurs situées dans l’intervalle des moyennes quotidiennes', ' Année courante : Valeurs situées au-dessus ou en dessous des moyennes quotidiennes',])
    .range(['record', 'avg', 'beyond', 'year'])

  //d3-legend
  var legend = d3.legend.color()
    .shapePadding(5)
    .useClass(true)
    .scale(legendScale);

  svg.append('g')
    .attr('transform', 'translate(30,550)')
    .call(legend);

});