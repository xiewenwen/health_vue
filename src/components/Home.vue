<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <!-- <el-row class="tac">
      <el-col :span="12"> -->
        <el-menu
          default-active="2"
          :router="router"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 主菜单加载 -->
          <el-submenu v-for="menu in menulist" index="1" :key="menu.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ menu.title }}</span>
            </template>
            <!-- 子菜单 -->
            <el-menu-item
              index="1-4-1"
              v-for="sub in menu.subMenuList"
              :key="sub.id"
              >{{ sub.title }}</el-menu-item
            >
          </el-submenu>
        </el-menu>
        <!-- </el-col>
      </el-row> -->
      </el-aside>
      <el-main>Main</el-main>
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
    };
  },
  created() {
    console.log("加载菜单");
    this.getMenuList();
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
  text-align: center;
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
