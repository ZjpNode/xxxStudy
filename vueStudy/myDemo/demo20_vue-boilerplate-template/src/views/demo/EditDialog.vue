<template>
  <el-dialog
    v-model="isVisible"
    size="small"
    @close="onClose"
    class="edit-dialog"
    :close-on-click-modal="false"
  >
    <span slot="title" class="el-dialog__title">{{option.title}}</span>
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
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="isVisible = false"> {{$t('cancel')}}</el-button>
      <el-button type="primary" @click="onSureClick"> {{$t('confirm')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'EditDialog',

    data () {
      return {
        isVisible: false,
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
        default: {title: '编辑'}
      }
    },

    watch: {
      value (newVal) {
        this.isVisible = newVal
        this.fillForm = this.pdata // JSON.parse(JSON.stringify(this.pdata)) // 使用两次JSON对数据进行深拷贝
      }
    },

    methods: {
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
