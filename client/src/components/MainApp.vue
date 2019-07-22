<template>
  <div>
    Test {{ this.time_trace }}
  </div>
</template>

<script>
const axios = require('axios')
export default {
  name: 'MainApp',
  data() {
    return {
      time_trace: null,
      traceData: null
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
      this.test = 'working'
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
