<template>
  <div>
    <div class="sidenav" ref="sidenav" :style="{width: sidenavOption.dynamicWidth + 'px'}">
      <EasyScrollbar :barOption="barOption">
        <el-menu router unique-opened theme="dark" :default-openeds="defaultOpeneds">
          <template v-for="(item, index) in sideNav">
            <side-nav-node :model="item" @menuItemClick="menuItemClickCallBack"></side-nav-node>
          </template>
        </el-menu>
      </EasyScrollbar>
    </div>
    <div class="sidenav-split" ref="sidenav_split"
         @mousedown="mousedown"
         :style="{left: sidenavOption.dynamicWidth + 'px'}">
    </div>
  </div>


  <!--<div class="sidenav">
    <el-menu router unique-opened theme="dark" :default-openeds="defaultOpeneds" >
      <template v-for="(item, index) in sideNav">
        <side-nav-node :model="item"></side-nav-node>
      </template>
    </el-menu>
  </div>-->

</template>

<script>
  import SideNavNode from './SideNavNode'
  import MenuConfig from '@constants/menuConfig'

  export default {
    name: 'side-nav',

    data () {
      return {
        // 滚动条属性
        barOption: {
          // barColor: 'red',      // 滚动条颜色
          horizrailenabled: false,  // 是否显示水平滚动条
          barOpacityMin: 0          // 滚动条非激活状态下的透明度
        },
        sidenavOption: {
          dragging: false,    // 是否可拖拽
          dynamicWidth: '',   // 动态宽度
          minWidth: '',       // 最小宽度，dynamicWidth必须大于minWidth
          maxWidth: ''        // 最大宽度，dynamicWidth必须小于maxWidth
        },
        sideNav: MenuConfig,
        defaultOpeneds: ['demo']
      }
    },
    methods: {
      menuItemClickCallBack () {
        this.sidenavOption.dynamicWidth = this.sidenavOption.minWidth
      },
      mousedown (e) {
        this.sidenavOption.dragging = true
      }
    },
    components: {
      SideNavNode
    },
    mounted () {
      let self = this

      this.sidenavOption.minWidth = parseInt(this.$document.getStyle(this.$refs.sidenav, 'width'))
      this.sidenavOption.maxWidth = parseInt(this.$document.getStyle(document.body, 'width')) -
        parseInt(this.$document.getStyle(this.$refs.sidenav_split, 'width'))
      this.sidenavOption.dynamicWidth = this.sidenavOption.minWidth

      // 鼠标按键释放事件，设置dragging为true
      this.$document.bindEvent(document, 'mouseup', function (e) {
        self.sidenavOption.dragging = false
        e.stopPropagation()
      })
      // 鼠标移动事件，当dragging为true时，改变菜单sidenav的宽度
      this.$document.bindEvent(document, 'mousemove', function (e) {
        if (self.sidenavOption.dragging) {
          let clickX = e.pageX
          self.sidenavOption.maxWidth = parseInt(self.$document.getStyle(document.body, 'width')) -
            parseInt(self.$document.getStyle(self.$refs.sidenav_split, 'width'))
          if (clickX > self.sidenavOption.minWidth && clickX < self.sidenavOption.maxWidth) {
            self.sidenavOption.dynamicWidth = clickX
          }
        }
      })
    },
    created () {
    }
  }
</script>

