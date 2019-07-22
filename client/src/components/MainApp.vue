<template>
  <div>
    <div class='plot'></div>
    <div class='time'>{{ time_trace }}</div>
  </div>
</template>

<script>
const axios = require('axios')
import * as d3 from 'd3';
export default {
  name: 'MainApp',
  data() {
    return {
      time_trace: null,
      traceData: null,
      margin: 100,
      width: 1200,
      height: 600,
      line: null,
      ip: '108.243.124.46'
    }
  },
  methods: {
    getGraphInfo: function() {
      axios
      .get(`http://${this.ip}/api/trace/1`)
      .then(response => {
        this.traceData = response.data
        this.time_trace = response.data[0].trace_time
        console.log(this.time_trace)
        this.init()
      })
     
    },
    updateGraphInfo: function(num) {
       axios
      .get(`http://${this.ip}/api/trace/${num}`)
      .then(response => {
        this.traceData = response.data
        this.time_trace = response.data[0].trace_time
        // cycle through all trace data, once to 50 start back at 1
        if(num < 50) {
          num++
        } else {
          num = 1
        }

        setTimeout((o) => {
          this.updatePlot(this.traceData)
          this.updateGraphInfo(num)}, 300)
         })
    },
    updatePlot: function(data) {
      // update path with new data
      d3.select('path').data([data]).attr('d', this.line)
    },
    init: function() {
      this.dataGroup = d3.select('.plot')
        .append('svg')
        .attr('width', this.width + this.margin * 2)
        .attr('height', this.height + 2 * this.margin)
        .append('g')
        .attr('transform', `translate(${this.margin},${this.margin})`)

      this.line = d3.line()
        .x(d => x(d.freq))
        .y(d => y(d.amplitude))

      let x = d3.scaleLinear()
        .domain([850, 1150])
        .range([0,this.width])

      let y = d3.scaleLinear()
        .domain([-130, -30])
        .range([this.height, 0])
      
      this.dataGroup.append('path')
        .data([this.traceData])
        .attr('fill','none')
        .attr('class','pathLines')
        .attr('stroke', 'yellow')
        .attr('d', this.line)
      
       let xAxisGroup = this.dataGroup
        .append('g')
        .attr('class', 'xAxisGroup')
        .attr('transform', `translate(0,${this.height})`)

      let xAxis = d3.axisBottom(x).ticks(5).tickSize(-1 * this.height).tickFormat(o => o + ' MHZ')

      xAxis(xAxisGroup)

      let yAxisGroup = this.dataGroup
        .append('g')
        .attr('class', 'yAxisGroup')
        

      let yAxis = d3.axisLeft(y).tickSize(-1 * this.width).tickFormat(o => o + ' dBm')

      yAxis(yAxisGroup)

      d3.selectAll('text').style("font-size","15px").style("color","white")

      // start updating graph
      setTimeout((o) => {this.updateGraphInfo(2)}, 300);
    }
  },
  mounted() {
      this.getGraphInfo()
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
  background-color: 'black';
  font-weight: bold;
  color: white;
}

svg {
  position: relative;
}

.plot {
  background-color: black;
}

.tick line{
  color: white;
  opacity: 0.2;
  stroke-dasharray: 5,5;
}

.time {
  color: green;
  top: 680px;
  left: 575px;
  position: absolute;
}

.xAxisGroup .tick:first-of-type > text {
    transform: translate(40px ,0px);
}

.xAxisGroup .tick:last-of-type > text {
    transform: translate(-40px ,0px);
}

.xAxisGroup .tick:last-of-type > text {
    transform: translate(-40px ,0px);
}

.xAxisGroup .tick:nth-child(n+3):nth-child(-n+4) > text {
    visibility: hidden;
}

.xAxisGroup .tick:nth-child(n+6):nth-child(-n+7) > text {
    visibility: hidden;
}

</style>
