<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章发布</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" style="margin-top:25px;">
      <el-form ref="publishData" :model="publishData" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="publishData.title"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="publishData.type">
            <el-radio :label="1">文章</el-radio>
            <el-radio :label="2">视频</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="内容">
          <VueEditor :config="config" v-if="publishData.type===1" ref="myeditor"/>
          <el-upload
            class="upload-demo"
            :headers = 'getToken()'
            :on-success="uploadVideo"
            action="http://localhost:3000/upload"
            v-if="publishData.type===2">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传视频</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="栏目">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="publishData.categories" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="cate in cateList" :label="cate.id" :key="cate.id">{{cate.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="标题">
          <el-upload
            action="http://localhost:3000/upload"
            list-type="picture-card"
            :on-success="picGroup"
            :headers='getToken()'
            :before-remove="delPic"
            :file-list="publishData.cover"
            >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即发布</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getColumn } from '@/apis/column'
import { articlePublish, articleDetail, articleEdit } from '@/apis/article'
import VueEditor from 'vue-word-editor'
import 'quill/dist/quill.snow.css'
export default {
  components: {
    VueEditor
  },
  data () {
    return {
      isIndeterminate: true,
      checkAll: false,
      cateList: [],
      publishData: {
        title: '',
        content: '',
        categories: [],
        cover: [],
        type: 1
      },
      config: {
        uploadImage: {
        // 指定处理文件上传的服务器的接口址
          url: 'http://localhost:3000/upload',
          // 后台所需要的参数的名称
          name: 'file',
          //   传递token
          headers: this.getToken(),
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess (res, insert) {
            insert('http://localhost:3000' + res.data.data.url)
          }
        },
        uploadVideo: {
          url: 'http://localhost:3000/upload',
          name: 'file',
          //   传递token
          headers: this.getToken(),
          uploadSuccess (res, insert) {
            insert('http://localhost:3000' + res.data.data.url)
          }
        }
      }
    }
  },
  methods: {
    getToken () {
      let token = localStorage.getItem('tiaotiao_backend_token')
      return { Authorization: token }
    },
    async onSubmit () {
      if (this.publishData.type === 1) {
        this.publishData.content = this.$refs.myeditor.editor.root.innerHTML
      }
      this.publishData.categories = this.publishData.categories.map(v => {
        return { id: v }
      })
      console.log(this.publishData)
      if (this.getId()) {
        let { data: res2 } = await articleEdit(this.getId(), this.publishData)
        console.log(res2)
      } else {
        let { data: res } = await articlePublish(this.publishData)
        console.log(res)
        if (res.message === '文章发布成功') {
          this.$message.success('文章发布成功')
          this.$router.push('/index/articleList')
        }
      }
    },
    handleCheckAllChange (val) {
      this.publishData.categories = val ? this.cateList.map(v => {
        return v.id
      }) : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cateList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cateList.length
    },
    uploadVideo (response) {
      this.publishData.content = 'http://127.0.0.1:3000' + response.data.url
    },
    picGroup (response) {
      console.log(response)
      if (response.message === '文件上传成功') {
        this.publishData.cover.push({ id: response.data.id, url: `http://127.0.0.1:3000${response.data.url}` })
      }
    },
    delPic (file) {
      let index
      console.log(file)
      index = this.publishData.cover.findIndex(v => {
        return v.id === file.id
      })
      this.publishData.cover.splice(index, 1)
    },
    getId () {
      return this.$route.params.id
    }
  },
  async mounted () {
    let { data: res } = await getColumn()
    if (this.getToken().Authorization) {
      this.cateList = res.data.splice(2)
    } else {
      this.cateList = res.data.splice(1)
    }
    let id = this.getId()
    if (id) {
      let { data: res2 } = await articleDetail(id)
      console.log(res2)
      this.publishData = res2.data
      var quill = this.$refs.myeditor.editor
      quill.clipboard.dangerouslyPasteHTML(0, this.publishData.content)
      this.publishData.categories = this.publishData.categories.map(v => v.id)
      if (this.publishData.categories.length === this.cateList.length) {
        this.checkAll = true
        this.isIndeterminate = false
      }
      this.publishData.cover = this.publishData.cover.map(v => {
        if (v.url.indexOf('http') === -1) {
          v.url = 'http://127.0.0.1:3000' + v.url
        }
        return {
          id: v.id,
          url: v.url
        }
      })
    }
  }
}
</script>

<style>
</style>
