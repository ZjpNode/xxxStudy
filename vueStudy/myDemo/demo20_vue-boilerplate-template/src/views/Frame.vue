<template>
  <div class="page-frame">
    <header-component></header-component>
    <div class="frame-content">
      <side-nav></side-nav>
      <main @click="onHideMenuClick">
        <section class="page-module">
          <div class="module-header">
            <h3>{{$store.state.activeMenu[$currentLang]}}</h3>
          </div>
          <EasyScrollbar>
            <router-view></router-view>
          </EasyScrollbar>
        </section>
      </main>
    </div>
  </div>
</template>
<script>
  import SideNav from './common/SideNav'
  import HeaderComponent from './common/Header'

  export default {
    name: 'Frame',

    props: {},

    data () {
      return {}
    },

    created () {
    },

    components: {
      SideNav,
      HeaderComponent
    },

    methods: {
      onHideMenuClick () {
        document.getElementById('app').className = ''
      }
    }
  }
</script>

<style lang="scss">
  .page-frame {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;

  .frame-content {
    flex: 1;
    display: flex;
  }

  main {
    flex: 1;
  }

  }
</style>
