define(['d3factory/module', 'd3'], function(d3factory, d3) {
  d3factory.factory('LineChart', function() {

    function LineChart(data, el) {
      this.data = data;
      this.el = el;
    }

    LineChart.prototype.render = function() {
      this.el.innerHTML = '';

      var margin = {top: 10, right: 10, bottom: 20, left: 30},
          height = this.el.parentElement.clientHeight - margin.top - margin.bottom,
          width = this.el.parentElement.clientWidth - margin.left - margin.right;

      var svg = d3.select(this.el).append('svg')
          .attr('height', height + margin.top + margin.bottom)
          .attr('widht', width + margin.left + margin.right)
        .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      var xscale = d3.scale.linear().domain([1, 10]).range([0, width]),
          yscale = d3.scale.linear().domain([0, 20]).range([height, 0]);

      var xaxis = d3.svg.axis().scale(xscale).orient('bottom'),
          yaxis = d3.svg.axis().scale(yscale).orient('left');

      var line = d3.svg.line()
          .x(function(d) { return xscale(d.x); })
          .y(function(d) { return yscale(d.y); });

      svg.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + height + ')')
          .call(xaxis);

      svg.append('g')
          .attr('class', 'y axis')
          .call(yaxis);

      svg.append('path')
          .datum(this.data)
          .attr('class', 'line')
          .attr('d', line);
    };

    return LineChart;
  });
});