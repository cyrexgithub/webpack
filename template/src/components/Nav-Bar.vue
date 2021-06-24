<template>
  <div class="nav-main">
    <div
      class="nav-item"
      @click.stop="changeModule('1')"
      :class="{ activeStyle: myShowIndex == '1' }"
    >
      <img :src="myShowIndex == 1 ? homeImgUrl_Clicked : homeImgUrl" alt="" style="width: 6.4vw;height: 6.4vw;" />
      <div>首页</div>
    </div>
    <div
      class="nav-item"
      @click.stop="changeModule('2')"
      :class="{ activeStyle: myShowIndex == '2' }"
    >
      <img :src="myShowIndex == 2 ? hgiftImgUrl_Clicked : giftImgUrl" alt="" style="width: 6.4vw;height: 6.4vw;" />
      <div>礼包</div>
    </div>
    <div
      class="nav-item"
      @click.stop="changeModule('3')"
      :class="{ activeStyle: myShowIndex == '3' }"
    >
      <img :src="myShowIndex == 3 ? userImgUrl_Clicked : userImgUrl" alt="" style="width: 6.4vw;height: 6.4vw;" />
      <div>我的</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  components: {},
  props: {
    myShowIndex: String,
  }, 
  data() {
    return {
      homeImgUrl: require("../assets/icon_home.png"),
      homeImgUrl_Clicked: require("../assets/icon_home_true.png"),
      giftImgUrl: require("../assets/icon_gift.png"),
      hgiftImgUrl_Clicked: require("../assets/icon_gift_true.png"),
      userImgUrl: require("../assets/icon_user.png"),
      userImgUrl_Clicked: require("../assets/icon_user_true.png"),
    };
  },
  mounted() {},

  methods: {
    changeModule(showKey) {
      // console.log(this.$router.history.current.path);
      if(this.$router.history.current.path == '/Home'){
        if(showKey == '1')return
      }
      var localStorageData = JSON.parse(window.localStorage.getItem("SZHiksParkLoginData"));
      if(localStorageData == null || localStorage.getExpire("SZHiksParkLoginData") == null){
        this.$router.push('/Login');
        return
      }
      switch (showKey) {
        case '1':
          if(this.$router.history.current.path == '/Home')return
          this.$router.push('/Home');
          break;
        case '2':
          if(this.$router.history.current.path == '/MyPackage')return
          this.$router.push('/MyPackage');
          break;
        case '3':
          if(this.$router.history.current.path == '/User')return
          this.$router.push('/User');
          break;
        default:
          break;
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.nav-main {
  width: 100%;
  box-shadow: 0px 0px 15px 0px rgba(239, 239, 239, 0.75);
  height: 96px;
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  // bottom: 30px;
  bottom: 0;
  left: 0;
}
.nav-item {
  width: 100px;
  font-size: 24px;
  font-weight: 400;
  color: #888888;
}
.activeStyle {
  color: #0065ff;
  //   background-color: #0065FF;
}
</style>