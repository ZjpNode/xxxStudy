<template>
  <div class="module-content">
    <clock></clock>
  </div>
</template>

<script>
  import {$utils} from '@helper'
  import Vue from 'vue'

  export default {
    data () {
      return {
        title: $utils.titleLang('示例列表', 'Demo  List'),
        msg: '123'
      }
    },
    computed: {
      titles: function () {
        return this.title[Vue.config.lang]
      }
    }
  }
</script>
