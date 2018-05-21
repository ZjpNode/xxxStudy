<template>
  <div class="clock">
    <p class="date">{{ dateTime | dayConvert }}</p>
    <p class="time">{{ dateTime | timeConvert }}</p>
  </div>
</template>

<script>

  export default {
    name: 'digital-clock',
    data () {
      return {
        dateTime: ''
      }
    },
    beforeMount: function () {
      var self = this

      function updateTime () {
        self.dateTime = new Date()
      }

      updateTime()
      setInterval(updateTime, 1000)
    }
  }

</script>
<style>
  .clock {
    /*background: #0f3854;
    background: -webkit-radial-gradient(center ellipse, #0a2e38 0%, #000000 70%);
    background: radial-gradient(ellipse at center, #0a2e38 0%, #000000 70%);
    background-size: 100%;*/
    font-family: 'Share Tech Mono', monospace;
    color: #ffffff;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    bottom: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color: #daf6ff;
    text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
  }

  .clock .time {
    letter-spacing: 0.05em;
    font-size: 80px;
    padding: 5px 0;
  }

  .clock .date {
    letter-spacing: 0.1em;
    font-size: 24px;
  }

  .clock .text {
    letter-spacing: 0.1em;
    font-size: 12px;
    padding: 20px 0 0;
  }

</style>

