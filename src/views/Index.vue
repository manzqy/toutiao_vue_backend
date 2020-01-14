<template>
  <div class="index">
    <el-container>
      <el-aside width="200px">
        <h1 class="logo">头条</h1>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :router="true"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1"><i class="el-icon-milk-tea"></i>用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/articleList"><i class="el-icon-milk-tea"></i>文章列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/index/articlePublish"><i class="el-icon-milk-tea"></i>文章发布</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>栏目管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1"><i class="el-icon-milk-tea"></i>栏目列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="head_title">
            <i class="el-icon-s-fold"></i>
            <h2>黑马头条后台管理系统</h2>
            <div class="head_title_right">
              <span>欢迎你：小伙伴</span>
              <span @click="exitUser">退出</span>
            </div>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    exitUser () {
      localStorage.removeItem('tiaotiao_backend_token')
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style lang="less" scoped>
.index {
  height: 100%;
}
.el-aside,
.el-header {
  background-color: #545c64;
}
.el-container {
  height: 100%;
}
.head_title {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  h2 {
    font-size: 20px;
    font-weight: 700;
  }
  /deep/.el-icon-s-fold {
    font-size: 32px;
    color: #007acc;
  }
  .head_title_right {
    span {
      margin-left: 15px;
      &:nth-child(2) {
        color: #e74c3c;
        cursor: pointer;
      }
    }
  }
}
.el-menu {
  border-right: none;
}
h1 {
  height: 60px;
  width: 100%;
  text-align: center;
  line-height: 60px;
  color: yellowgreen;
  font-size: 25px;
  text-shadow: 1px 1px 1px yellowgreen;
}
</style>
