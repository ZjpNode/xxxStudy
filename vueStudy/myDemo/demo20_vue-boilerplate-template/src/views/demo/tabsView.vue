<!-- 待完善。。。。。 -->
<template>
  <component v-bind:is="currentView">
    <!-- 组件在 vm.currentview 变化时改变！ -->
  </component>
</template>
<script>

  // import modules from '../test/index.js'

  let com2 = {
    test1: () => import(/* webpackChunkName: "group-foo" */ '../test/test1.vue'),
    test2: resolve => require.ensure([], () => resolve(require(`../test/test2.vue`)), 'test2')
    /*
    test3: (function (s) {
      console.log(s)
      return function (resolve) {
        require.ensure([], function () {
          console.log(s)
          resolve(require(`../test/${s}.vue`))
        }, s)
      }
    })('test3')
    */
  }
  /*
  let com = {}
  for (let i in modules) {
    com[`${i}`] = function (resolve) {
      require.ensure([], function () {
        console.log(i)
        resolve(modules[i])
      }, `test3`)
      // require.ensure(dependencies: String[], callback: function([require]), [chunkName: String])
      // chunkName不能是动态的，否则会报以下错误
      // require function is used in a way in which dependencies cannot be statically
    }
  }
*/
  export default {
    name: 'tabsView',

    data () {
      return {
        currentView: ''
      }
    },

    computed: {},

    created () {
    },

    mounted () {
      this.currentView = this.url
    },
    /*
        components: {
          test1: resolve => require.ensure([], () => resolve(require(`../test/test1.vue`)), 'test1'),
          test2: resolve => require.ensure([], () => resolve(require(`../test/test2.vue`)), 'test2'),
          test3: resolve => require.ensure([], () => resolve(require(`../test/test3.vue`)), 'test3')
        },
    */
    components: com2,

    props: {
      url: {
        type: String,
        default: ''
      }
    },

    watch: {
      value (newVal) {
        console.log(newVal)
      }
    },

    methods: {}
  }
</script>
