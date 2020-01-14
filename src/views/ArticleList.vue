<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="tableData" style="width: 100%;margin-top:25px" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="title" label="标题" width="560"></el-table-column>
      <el-table-column label="时间" width="110">
        <template slot-scope="scope">
          {{scope.row.create_date | dateform}}
        </template>
      </el-table-column>
      <el-table-column label="类型" width="76">
        <template slot-scope="scope">
          {{scope.row.type===1?'文章':'视频'}}
        </template>
      </el-table-column>
      <el-table-column prop="user.nickname" label="作者" width="110"></el-table-column>
      <el-table-column prop="address" label="操作">
        <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
          <el-button type="success" icon="el-icon-edit"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="分享" placement="top-start">
          <el-button type="primary" icon="el-icon-share"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
          <el-button type="danger" icon="el-icon-delete"></el-button>
        </el-tooltip>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[1, 2, 5, 7]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { articleList } from '@/apis/article'
import { dateform } from '@/utils/Ufilters'
export default {
  data () {
    return {
      tableData: [],
      pageIndex: 1,
      pageSize: 2,
      total: 0
    }
  },
  filters: {
    dateform
  },
  mounted () {
    this.init()
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val
      this.init()
    },
    handleCurrentChange (val) {
      this.pageIndex = val
      this.init()
    },
    async init () {
      let { data: res } = await articleList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
      this.tableData = res.data
      this.total = res.total
    }
  }
}
</script>

<style>
</style>
