<template>
  <el-container>
    <el-header>
      <div>
        <el-button type="text" size="medium">您好,{{ username }}</el-button>
        <!-- <el-avatar style="margin-top: 10px"> {{ username }} </el-avatar> -->
        <el-button type="text" size="medium" @click="out">退出</el-button>
      </div></el-header
    >
    <el-container style="width: 100%; height: 100%">
      <el-aside width="230px">
        <!-- <el-row class="tac">
      <el-col :span="12"> -->
        <!-- <el-menu
          :default-active="activePath"
          :router="router"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        > -->
        <!-- 主菜单加载 -->
        <!-- 什么鬼？？？index我传递的是数值就给我报错 有点子无语 -->
        <!-- <el-submenu
            v-for="menu in menulist"
            :index="menu.id + ''"
            :key="menu.id"
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ menu.title }}</span>
            </template> -->
        <!-- 二级菜单 -->
        <!-- <el-menu-item
              :index="home / +sub.spath"
              v-for="sub in menu.subMenuList"
              :key="sub.id"
              @click="savePath(sub.spath)"
              >{{ sub.stitle + sub.spath }}</el-menu-item
            >
          </el-submenu>
        </el-menu> -->
        <el-menu
          :default-active="activePath"
          :router="router"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="/sta" v-show="showAdmin">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-submenu index="002" v-show="showAdmin">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>社区管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/user" @click="savePath('/user')"
              >用户管理</el-menu-item
            >
            <el-menu-item index="/health" @click="savePath('/health')"
              >健康档案</el-menu-item
            >
            <el-menu-item
              index="/building/list"
              @click="savePath('/building/list')"
              >住房管理</el-menu-item
            >
          </el-submenu>
          <el-submenu index="003" v-show="showAdmin">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>物资管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/goods" @click="savePath('/goods')"
              >物资信息</el-menu-item
            >
          </el-submenu>
          <el-submenu index="004" v-show="showAdmin">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>消息公告</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/notice" @click="savePath('/notice')"
              >公告信息</el-menu-item
            >
            <el-menu-item index="/user" @click="savePath('/user')"
              >申请信息</el-menu-item
            >
          </el-submenu>
          <el-submenu index="005" v-show="showAdmin">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统设置</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/config" @click="savePath('/config')"
              >核酸过期时间</el-menu-item
            >
          </el-submenu>

          <el-submenu index="007" v-show="showNormal">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>我的家庭</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/home/user" @click="savePath('/home/user')"
              >成员信息</el-menu-item
            >
          </el-submenu>
          <el-submenu index="006" v-show="showNormal">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>我的社区</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/home/notice" @click="savePath('/home/notice')"
              >社区公告</el-menu-item
            >

            <el-menu-item index="/user/applys" @click="savePath('/user/applys')"
              >我的申请</el-menu-item
            >
          </el-submenu>
        </el-menu>
        <!-- </el-submenu> -->
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
      roleId: null,
      showAdmin: false,
      showNormal: false,
      username: "",
      user: null,
    };
  },
  created() {
    console.log("加载菜单");
    this.getMenuList();
    //创建组件的时候去获取缓存中保存的路径
    this.activePath = localStorage.getItem("activePath");
    this.roleId = localStorage.getItem("roleId");
    if (this.roleId == 1) {
      this.showAdmin = true;
      this.showNormal = false;
    } else {
      this.showAdmin = false;
      this.showNormal = true;
    }
    console.log("roldid", this.roleId);
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
      this.username = localStorage.getItem("username");
      console.log(this.username);
    },
    // 当刷新浏览器的时候 保存在对应的菜单路径下 不会丢失
    savePath(path) {
      //保存路径到缓存
      localStorage.setItem("activePath", path);
      this.activePath = path;
    },
    out() {
      localStorage.clear();
      this.$router.push({ path: "/login" });
    },
  },
};
</script>

<style>
.el-header {
  color: #333;
  background-color: #333;
  line-height: 60px;
  text-align: right;
}
.el-footer {
  background-color: #282b28;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: white;
  color: #333;
  text-align: left;
  line-height: 200px;
  height: 100%;
}

.el-main {
  background-color: white;
  color: #333;
  text-align: left;
  /* line-height: 160px; */
  width: 100%;
  height: 100%;
  /* 加入此行解决表头变宽问题 */
  line-height: 20px !important;
}

body > .el-container {
  margin-bottom: 20px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
