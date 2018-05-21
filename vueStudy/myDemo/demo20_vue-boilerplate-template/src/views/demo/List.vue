<template>
  <div class="module-content">
    <div class="panel panel-default">
      <div class="panel-body">
        <el-card class="box-card">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="4">
              <el-date-picker style="width:100%" type="date"
                              :editable="false"
                              :picker-options="pickerOptions0"
                              placeholder="选择开始日期" v-model="searchData.startDate"></el-date-picker>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="4">
              <el-date-picker style="width:100%" type="date"
                              :picker-options="pickerOptions1"
                              placeholder="选择结束日期" v-model="searchData.endDate"></el-date-picker>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="4">
              <el-input placeholder="请输入姓名" v-model="searchData.name">
                <template slot="prepend">姓名</template>
              </el-input>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="5">
              <el-input placeholder="请输入地址" v-model="searchData.address">
                <template slot="prepend">地址</template>
              </el-input>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="7">
              <el-button type="primary" icon="search" @click="onSearchClick()">{{ $t('search') }}</el-button>
              <el-button type="primary" icon="plus" @click="onAddClick()">{{ $t('add') }}</el-button>
            </el-col>
          </el-row>
        </el-card>
        <el-card>
          <el-table :data="tableData" border height=250>
            <el-table-column prop="date" label="日期" width="150"></el-table-column>
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="province" label="省份" width="120"></el-table-column>
            <el-table-column prop="city" label="市区" width="120"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
            <el-table-column label="操作" width="230">
              <template scope="scope">
                <el-button @click="onEditClick(scope.row, scope.$index)" type="primary" size="small">编辑</el-button>
                <el-button @click="onDelClick(scope.$index)" type="danger" size="small">删除</el-button>
                <el-button @click="onTestClick(scope.row, scope.$index)" type="primary" size="small">Tabs test
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="table-operate">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[2, 5, 10]"
              :page-size="2" layout="total, sizes, prev, pager, next, jumper"
              :total="4">
            </el-pagination>
          </div>
        </el-card>
      </div>
    </div>
    <edit-dialog
      :option="{title:'编辑'}"
      :pdata="currentRowData"
      v-model="isEditDialogVisible"
      @dispatch-data="onUpdateRowData"></edit-dialog>
    <edit-dialog
      :option="{title:'新增'}"
      :pdata="currentRowData"
      v-model="isAddDialogVisible"
      @dispatch-data="onInsertRowData"></edit-dialog>
    <tabs-dialog
      :option="{title:'tabs测试',editableTabs2:[]}"
      :pdata="currentRowData"
      v-model="isTabsDialogVisible"
      @dispatch-data="onInsertRowData"></tabs-dialog>
  </div>
</template>

<script>
  import TabsDialog from './TabsDialog'
  import EditDialog from './EditDialog'
  import {$utils} from '@helper'

  let self

  export default {
    name: 'demo-list',

    props: {},

    data () {
      return {
        currentPage: 1,
        pickerOptions0: {
          disabledDate (time) {
            let dateDiff = $utils.dateCompare(self.searchData.endDate, time, self.searchDateRangeUnit)
            return !(dateDiff >= 0 && dateDiff < self.searchDateRange)
          }
        },
        pickerOptions1: {
          disabledDate (time) {
            let dateDiff = $utils.dateCompare(time, self.searchData.startDate, self.searchDateRangeUnit)
            return !(dateDiff >= 0 && dateDiff < self.searchDateRange)
          }
        },
        searchDateRange: 30,     // 允许搜索的时间范围
        searchDateRangeUnit: 'd', // 允许搜索的时间范围的单位
        searchData: {
          startDate: '',
          endDate: '',
          name: '',
          address: ''
        },
        tableData: [{
          date: '2017-11-03',
          name: '张小刘',
          province: '广东',
          city: '惠州市',
          address: '广东省惠州市惠城区',
          zip: 200333
        }, {
          date: '2016-08-02',
          name: '李四',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2116-08-02',
          name: '李四',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2017-09-04',
          name: '赵五',
          province: '广东',
          city: '深圳',
          address: '广东省深圳市',
          zip: 200333
        }, {
          date: '2017-10-01',
          name: '王虎',
          province: '北京',
          city: '朝阳区',
          address: '北京市朝阳区',
          zip: 200333
        }],
        isAddDialogVisible: false,
        isEditDialogVisible: false,
        isTabsDialogVisible: false,
        currentRowData: {},
        currentRowIndex: -1
      }
    },

    components: {
      TabsDialog,
      EditDialog
      /*
       // 异步加载组件的写法
       EditDialog: resolve => require.ensure([], () => resolve(require('./EditDialog')), 'EditDialog')
       */

    },

    computed: {},

    watch: {},

    created () {
      self = this
    },

    mounted () {
    },

    filters: {},

    methods: {
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },

      handleCurrentChange (val) {
        this.currentPage = val
        console.log(`当前页: ${val}`)
      },

      onUpdateRowData (data) {
        this.currentRowData = data
        this.$set(this.tableData, this.currentRowIndex, data)
      },
      onInsertRowData (data) {
        data.date = this.$utils.dayConvert(data.date)
        this.tableData.push(data)
      },

      /* ----------------------------On Click Event---------------------------- */
      onEditClick (rowData, index) {
        this.currentRowData = rowData
        this.currentRowIndex = index
        this.isEditDialogVisible = true
      },
      onDelClick (index) {
        this.$confirm('是否删除该记录？', '提示', {closeOnClickModal: false})
          .then(() => {
            this.$delete(this.tableData, index)
            this.$message.success('删除成功')
          })
          .catch(() => {
            this.$message.success('取消删除')
          })
      },
      onSearchClick () {
        this.searchData.startDate = $utils.dayConvert(this.searchData.startDate)
        this.searchData.endDate = $utils.dayConvert(this.searchData.endDate)
        console.log(this.searchData)
      },
      onAddClick () {
        this.currentRowData = {date: Date.now()}
        this.isAddDialogVisible = true
      },
      onTestClick (rowData, index) {
        this.currentRowData = rowData
        this.currentRowIndex = index
        this.isTabsDialogVisible = true
      }

    }
  }
</script>
<style lang="scss"></style>
