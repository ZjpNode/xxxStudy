<template>
  <el-dialog v-model="isVisible" size="full" @close="onClose" class="edit-dialog">
    <span slot="title" class="el-dialog__title">{{option.title}}</span>
    <el-tabs v-model="editableTabsValue2" type="card" @tab-remove="removeTab">
      <el-tab-pane
        label="fillForm"
        name="0"
      >
        <el-form :model="fillForm" :rules="rules" ref="fillForm">
          <div class="form-group col-sm-9">
            <el-form-item label="日期" prop="date">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="fillForm.date"></el-date-picker>
            </el-form-item>
          </div>
          <div class="form-group col-sm-9">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="fillForm.name"></el-input>
            </el-form-item>
          </div>
          <div class="form-group col-sm-9">
            <el-form-item label="省份" prop="province">
              <el-input v-model="fillForm.province"></el-input>
            </el-form-item>
          </div>
          <div class="form-group col-sm-9">
            <el-form-item label="地址" prop="address">
              <el-input v-model="fillForm.address"></el-input>
            </el-form-item>
          </div>
          <div class="form-group col-sm-9">
            <el-form-item label="邮编" prop="zip">
              <el-input v-model="fillForm.zip"></el-input>
            </el-form-item>
          </div>
          <div class="form-group col-sm-9" style="float: right">
            <el-button type="primary" @click="addTab('')">next</el-button>
          </div>

        </el-form>

      </el-tab-pane>
      <el-tab-pane
        v-for="(item, index) in editableTabs2"
        :label="item.title"
        :name="item.name"
        :key="index"
        closable
      >
        {{item.content}}
        <tabs-view :url="item.url"></tabs-view>
        <el-button type="primary" @click="addTab(item.name)">next</el-button>
      </el-tab-pane>
    </el-tabs>


    <span slot="footer" class="dialog-footer">
      <el-button @click="isVisible = false" type="danger"> {{$t('cancel')}}</el-button>
      <!--<el-button type="primary" @click="onSureClick"> {{$t('confirm')}}</el-button>-->
    </span>
  </el-dialog>
</template>

<script>
  import tabsView from './tabsView'

  export default {
    name: 'TabsDialog',

    data () {
      return {
        isVisible: false,
        editableTabsValue2: '0',
        editableTabs2: [],
        tabIndex: 0,
        fillForm: {
          date: '',
          name: '',
          province: '',
          city: '',
          address: '',
          zip: ''
        },
        rules: {}
      }
    },

    computed: {},

    created () {
    },

    mounted () {
    },

    components: {
      tabsView
    },
    props: {
      value: {
        type: Boolean,
        required: true
      },
      pdata: {
        type: Object,
        default: {}
      },
      option: {
        type: Object,
        default: {title: '编辑', editableTabs2: []}
      }
    },

    watch: {
      value (newVal) {
        this.isVisible = newVal
        this.editableTabsValue2 = '0'
        this.tabIndex = 0
        this.editableTabs2 = this.option.editableTabs2
        this.fillForm = this.pdata // JSON.parse(JSON.stringify(this.pdata)) // 使用两次JSON对数据进行深拷贝
      }
    },

    methods: {
      addTab (targetName) {
        let newTabName = ++this.tabIndex + ''
        this.editableTabs2.push({
          title: `New Tab${newTabName}`,
          name: newTabName,
          content: `New Tab content ${newTabName}`,
          url: `test${newTabName}`
        })
        this.editableTabsValue2 = newTabName
      },
      removeTab (targetName) {
        let tabs = this.editableTabs2
        let activeName = this.editableTabsValue2
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
              } else {
                activeName = '0'
              }
            }
          })
        }

        this.editableTabsValue2 = activeName
        this.editableTabs2 = tabs.filter(tab => tab.name !== targetName)
      },
      onClose () {
        this.isVisible = false
        this.$emit('input', this.isVisible)
      },

      onSureClick () {
        this.$refs.fillForm.validate(valid => {
          if (!valid) return
          // this.fillForm.date = this.$utils.dayConvert(this.fillForm.date)
          this.$emit('dispatch-data', this.fillForm)
          this.isVisible = false
        })
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  .edit-dialog {

  .el-form-item__label, .el-form-item__content {
    display: inline-block;
  }

  .el-form-item__label {
    width: 30%;
  }

  .el-input {
    min-width: 200px;
  }

  .el-dialog--tiny {
    min-width: 300px;
  }

  }
</style>
