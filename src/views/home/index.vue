<template>

    <el-container class="home-container" >
            <el-aside class="home-aside" :width="collapse? '64px':'200px'">
                <div class="logo" :class="{coll:collapse}"></div>
                 <el-menu style="border-right:none"
                 router
                 :collapse="collapse"
                 :collapse-transition="false"
      :default-active="$router.path"
      class="el-menu-vertical-demo"
      background-color="#002033"
      text-color="#fff"
      active-text-color="#ffd04b">
    <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/article">
        <i class="el-icon-document"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="/image">
        <i class="el-icon-picture"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="/publish">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="/comment">
        <i class="el-icon-chat-dot-round"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="fans">
        <i class="el-icon-present"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
      <el-menu-item index="/setting">
        <i class="el-icon-setting"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
            </el-aside>
        <el-container>
        <el-header class="home-header">
            <span class="el-icon-s-fold" @click="toggle"></span>
            <span class="text">江苏传智播客科技教育有限公司</span>
            <el-dropdown  style="float:right">
            <span class="el-dropdown-link" >
                <img style="vertical-align:middle" width="30" height="30"  :src= avatar alt="">
                <b  >{{ name }}</b>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>

            <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon=" el-icon-setting" @click.native ="setting()">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" @click.native ="logout()">退出登录</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
  </el-container>
</el-container>

</template>

<script>
export default {
  data () {
    return {
      collapse: false,
      avatar: '',
      name: ''
    }
  },
  created () {
    const user = JSON.parse(window.sessionStorage.getItem('newxm'))
    this.avatar = user.photo
    this.name = user.name
  },
  methods: {
    toggle () {
      this.collapse = !this.collapse
    },
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      window.sessionStorage.removeItem('newxm')
      this.$router.push('/login')
    }
  }

}
</script>

<style>
    .home-container {
        left:0;
        top:0;
        width: 100%;
        height: 100%;
        position: absolute;
    }
    .home-aside {
        background-color: #002033;
    }
    .home-header {
        border-bottom: 1px solid #ddd;
        line-height: 60px;
        height: 60px;
    }
    .el-icon-s-fold {
        font-size: 26px;
       vertical-align: middle;
    }
    .text {
        padding-left: 10px;
        vertical-align: middle;
        padding-top:10px
    }
    img{
        width: 30px;
        float: left;
        padding-right: 2px;
        padding-top: 3px
    }
    .logo {
        width: 100%;
        height: 60px;
        background: #024 url(../../assets/images/logo_admin.png) no-repeat center / 140px auto ;
    }
    .coll {
        background:  #024 url(../../assets/images/logo_admin_01.png) no-repeat center;
        background-size: 36px auto
    }

</style>
