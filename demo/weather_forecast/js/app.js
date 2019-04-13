let main = new Vue({
  el: "#main",
  data: {
    nowTime: dayjs().format("HH:mm:ss"),
    weatherData: {
      alarm2: null,
      alarm: null,
      data: []
    },
    WEATHER_TYPE: window.WEATHER_TYPE
  },
  computed: {},
  created() {
    setInterval(() => {
      this.nowTime = dayjs().format("HH:mm:ss");
    }, 1000);
    setInterval(() => {
      this.getData();
    }, 60 * 60 * 1000);
    this.getData();
  },
  methods: {
    getPinyin(word) {
      // console.log(window.pinyinUtil);
      return pinyinUtil.getPinyin(word, "", false, false);
    },
    getData() {
      axios
        .get("https://www.tianqiapi.com/api/?version=v1")
        .then(response => {
          if (response.status === 200) {
            this.weatherData = Object.assign(this.weatherData, response.data);
          }
        })
        .catch(error => {
          alert(error);
        });
      axios
        .get("https://www.tianqiapi.com/api/?version=v6")
        .then(response => {
          if (response.status === 200) {
            this.weatherData = Object.assign(this.weatherData, response.data);
          }
        })
        .catch(error => {
          alert(error);
        });
    }
  }
});
