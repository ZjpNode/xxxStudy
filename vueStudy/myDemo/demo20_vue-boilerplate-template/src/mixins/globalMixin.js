import Vue from 'vue'
import {mapState, mapActions} from 'vuex'

Vue.mixin({
  data () {
    return {}
  },

  computed: {
    $currentLang () {
      return Vue.config.lang || 'zh'
    },

    ...mapState([
      'userInfo',
      'activeMenu'
    ])
  },

  methods: {
    ...mapActions([
      'getUserInfo'
    ])
  }
})
