/*
 * @Author: jiapeng.Zheng
 * @Date: 2019-05-14 10:24:39
 * @LastEditors: jiapeng.Zheng
 * @LastEditTime: 2019-10-18 11:13:33
 * @Description:
 */
const SECRE = '&appid=17324435&appsecret=N3PEnuVX'

let main = new Vue({
  el: '#main',
  data: {
    nowTime: dayjs().format('HH:mm:ss'),
    weatherData: {
      data: []
    }
  },
  watch: {},
  computed: {},
  created() {
    setInterval(() => {
      this.nowTime = dayjs().format('HH:mm:ss')
    }, 1000)
    setInterval(() => {
      this.getData()
    }, 60 * 60 * 1000)
    this.getData()
  },
  methods: {
    getPinyin(word) {
      // console.log(window.pinyinUtil);
      return pinyinUtil.getPinyin(word, '', false, false)
    },
    getData() {
      axios
        .get('https://www.tianqiapi.com/api/?version=v1' + SECRE)
        .then(response => {
          if (response.status === 200 && !response.data.errcode) {
            this.weatherData = Object.assign(
              {},
              this.weatherData,
              response.data
            )
          } else {
            console.error(response)
          }
        })
        .catch(error => {
          alert(error)
        })
      axios
        .get('https://www.tianqiapi.com/api/?version=v6' + SECRE)
        .then(response => {
          if (response.status === 200 && !response.data.errcode) {
            this.weatherData = Object.assign(
              {},
              this.weatherData,
              response.data
            )
          } else {
            console.error(response)
          }
        })
        .catch(error => {
          alert(error)
        })
    }
  }
})
