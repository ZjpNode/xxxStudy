<template>
  <div class="module-content">
    <div class="panel panel-default">
      <div class="panel-body">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <div class="form-group col-sm-12">
            <el-form-item label="活动名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </div>

          <div class="form-group col-sm-12">
            <el-form-item label="活动区域" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择活动区域" >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="form-group col-sm-12">
            <el-form-item label="活动时间" prop="date1">
              <el-col :span="24">
                <el-date-picker type="datetime" placeholder="选择日期" v-model="ruleForm.date1"></el-date-picker>
              </el-col>
            </el-form-item>
          </div>

          <div class="form-group col-sm-12">
            <el-form-item label="即时配送" prop="delivery">
              <el-switch on-text="" off-text="" onValue="1" offValue="2" v-model="ruleForm.delivery"></el-switch>
            </el-form-item>
          </div>

          <div class="form-group col-sm-12">
            <el-form-item label="活动性质" prop="type">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
              </el-checkbox>
              <el-checkbox-group v-model="ruleForm.type" @change="handleCheckedTypeChange">
                <!--<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>-->
                <el-checkbox v-for="(type,index) in typeOptions" :label="type" :key="index">{{type.value}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>

          <div class="form-group col-sm-12">
            <el-form-item label="特殊资源" prop="resource">
              <el-radio-group v-model="ruleForm.resource" @change="handleResourceChange">
                <!--<el-radio label="r-1">线上品牌商赞助</el-radio>
                <el-radio label="r-2">线下场地免费</el-radio>-->
                <el-radio v-for="(resource,index) in resourceOptions" :label="resource" :key="index">{{resource.value}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>

          <div class="form-group col-sm-12">
            <el-form-item label="活动形式" prop="desc">
              <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div class="form-group col-sm-12">
          <el-row type="flex" justify="center">
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import vue from 'vue'

  let dateConvert = vue.filter('dateConvert')

  export default {
    name: 'demo-form',
    components: {},
    props: {},
    data () {
      return {
        checkAll: false,
        isIndeterminate: false,
        typeOptions: [
          {id: '1', value: '美食/餐厅线上活动'},
          {id: '2', value: '地推活动'},
          {id: '3', value: '线下主题活动'},
          {id: '4', value: '单纯品牌曝光'}],
        resourceOptions: [
          {id: 'r-1', value: '线上品牌商赞助'},
          {id: 'r-2', value: '线下场地免费'}],
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: '2',
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          region: [
            {required: true, message: '请选择活动区域', trigger: 'change'}
          ],
          date1: [
            {required: true, message: '请选择日期', trigger: 'change'}
          ],
          date2: [
            {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
          ],
          type: [
            {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
          ],
          resource: [
            {type: 'object', required: true, message: '请选择活动资源', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '请填写活动形式', trigger: 'blur'}
          ]
        }
      }
    },
    computed: {},
    watch: {
      'ruleForm.date1': function (newVal) {
        this.ruleForm.date1 = dateConvert(newVal)
      }
    },
    created () {
      console.log('created')
    },
    mounted () {
      console.log('mounted')
    },
    filters: {},
    methods: {
      tt () {
        alert(123)
      },
      // 全选
      handleCheckAllChange (event) {
        this.ruleForm.type = event.target.checked ? this.typeOptions : []
        this.isIndeterminate = false
      },
      // “活动性质”选择
      handleCheckedTypeChange (value) {
        let checkedCount = value.length
        this.checkAll = checkedCount === this.typeOptions.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.typeOptions.length
      },
      // “特殊资源”选择
      handleResourceChange (value) {
        console.log(value)
      },
      // 表单提交
      submitForm (formName) {
        // this.tt()
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否立即创建？', '提示', {closeOnClickModal: false})
              .then(() => {
                let postData = this.ruleForm
                console.log(postData)
                this.$message.success('提交成功')
              })
          } else {
            this.$message.error('表单有误')
            return false
          }
        })
      },
      // 表单重置
      resetForm (formName) {
        this.$refs[formName].resetFields()
        this.checkAll = false
        this.isIndeterminate = false
      }
    }
  }
</script>
