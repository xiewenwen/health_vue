<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <!-- <el-row class="tac">
      <el-col :span="12"> -->
        <el-menu
          :default-active="activePath"
          :router="router"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 主菜单加载 -->
          <!-- 什么鬼？？？index我传递的是数值就给我报错 有点子无语 -->
          <el-submenu
            v-for="menu in menulist"
            :index="menu.id + ''"
            :key="menu.id"
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ menu.title }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="sub.path"
              v-for="sub in menu.subMenuList"
              :key="sub.id"
              @click="savePath(sub.path)"
              >{{ sub.title }}</el-menu-item
            >
          </el-submenu>
        </el-menu>
        <!-- </el-col>
      </el-row> -->
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      menulist: [],
      router: "router",
      activePath: "/welcome",
    };
  },
  created() {
    console.log("加载菜单");
    this.getMenuList();
    //创建组件的时候去获取缓存中保存的路径
    this.activePath = localStorage.getItem("activePath");
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      console.log(res);
      if (res.code === 200) this.menulist = res.data;
    },
    //当刷新浏览器的时候 保存在对应的菜单路径下 不会丢失
    savePath(path) {
      //保存路径到缓存
      localStorage.setItem("activePath", path);
      this.activePath = path;
    },
  },
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #282b28;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #72976d;
  color: #333;
  text-align: left;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
