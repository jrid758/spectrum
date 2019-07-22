<template>
  <div>
    <div class='plot'></div>
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
    }
  },
  methods: {
    getGraphInfo: function() {
      axios
      .get('http://localhost/api/trace/1')
      .then(response => {
        this.traceData = response.data
        this.time_trace = response.data[0].trace_time
        console.log(this.time_trace)
        this.init()
      })
     
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
        // .domain(d3.extent(this.traceData, d => d.freq))
        .domain([850, 1150])
        .range([0,this.width])

      let y = d3.scaleLinear()
        // .domain(d3.extent(this.traceData, d => d.amplitude))
        .domain([-130, -30])
        .range([this.height, 0])
      
      this.dataGroup.append('path')
        .data([this.traceData])
        .attr('fill','none')
        .attr('class','pathLines')
        .attr('stroke', 'black')
        .attr('d', this.line)
    }
  },
  mounted() {
      this.getGraphInfo()
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
