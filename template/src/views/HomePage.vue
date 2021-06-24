<template>
  <div class="home-main">
    <div class="home-header"></div>
    <div class="home-content"></div>
    <hz-loading :showLoading="showLoading" />
    <nav-bar :myShowIndex="'1'" />
    <web-socket />
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
import NavBar from "@/components/Nav-Bar.vue";
import webSocket from "@/utils/WebSocket";
export default {
  name: "",
  components: {
    NavBar,
    webSocket
  },
  data() {
    return {
      showLoading: false,
      goodsList: [],
    };
  },
  mounted() {
    // this.checkToken();
    // this.mpGetConfig();
    // this.getOpenId();
    // this.getGoodsList();

    var source = this.$publicFunc.getUrlParam("source");
    if (source != null) {
      this.$store.state.urlSource = source;
      window.localStorage.setItem("PXHik_Source", source);
    }
    if (this.$store.state.isFirstOpen) {
      this.$ba.trackPageview(this.$route.path + '?source=' + this.$store.state.urlSource + "&login=2");
    } else {
      this.$ba.trackPageview(this.$route.path + '?source=' + this.$store.state.urlSource + "&login=1");
    }
  },
  computed: {},

  methods: {
    isDuringDate(beginDateStr, endDateStr) {
      var curDate = new Date(),
        beginDate = new Date(beginDateStr),
        endDate = new Date(endDateStr);
      if (curDate >= beginDate && curDate <= endDate) {
        return true;
      }
      return false;
    },
    checkToken() {
      var localStorageData = JSON.parse(window.localStorage.getItem("SZHiksParkLoginData"));
      if (localStorageData == null) {
        return
      }
      if (!this.$store.state.isFirstOpen) return
      var postData = {
        code: localStorageData.data.code
      }
      this.$publicFunc.postData("/customer/login/checkCode", postData).then((res) => {
        var data = JSON.parse(res);
        // console.log('checkCode回调',data.data.data);
        if (data.data.errorCode == "200") {
          let newStorageData = {
            token: data.data.data.token,
            code: localStorageData.data.code
          }
          this.$store.state.isFirstOpen = false;
          this.$store.state.userPhone = data.data.data.phone;
          localStorage.removeItem('SZHiksParkLoginData');
          localStorage.setExpire("SZHiksParkLoginData", newStorageData, 86400000);
        } else {
          localStorage.removeItem('SZHiksParkLoginData');
        }
      })
    },
    mpGetConfig() {
      if (!this.$store.state.isFirstOpen) return
      let postData = {
        url: location.href.split("#")[0],
      };
      this.$publicFunc.postData("/auth/signature", postData).then((res) => {
        this.logTxt = JSON.stringify(res);
        var data = JSON.parse(res);
        const { signature, appId, noncestr, timestamp } = data.data.data;
        this.appId = appId;
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: appId, // 必填，公众号的唯一标识
          timestamp: timestamp, // 必填，生成签名的时间戳
          nonceStr: noncestr, // 必填，生成签名的随机串
          signature: signature, // 必填，签名
          jsApiList: ["chooseWXPay", "scanQRCode"], // 必填，需要使用的JS接口列表
        });
        wx.ready(() => {
          wx.checkJsApi({
            jsApiList: ["chooseWXPay", "scanQRCode", "updateAppMessageShareData"],
            success: (res) => {
              console.log("seccess");
              console.log(res);
            },
            fail: (res) => {
              console.log("fail");
              console.log(res);
            },
          });
          wx.updateAppMessageShareData({
            title: '车主大礼包', // 分享标题
            desc: '车主大礼包', // 分享描述
            link: 'https://px-wx-c.hikspark.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: '', // 分享图标
            success: function () {
              // 设置成功
            }
          })
        });
      });
    },
    getOpenId() {
      if (this.$store.state.openId != "") return
      if (!this.$store.state.isFirstOpen) return
      var code = this.$publicFunc.getUrlParam("code");
      if (code != null) {
        this.$store.state.wxCode = code;
      }
      if (this.$store.state.wxCode == "") return
      var postData = {
        code: this.$store.state.wxCode,
      }
      this.$publicFunc.postData("/auth/officialLogin", postData).then((res) => {
        var data = JSON.parse(res);
        // console.log('获取openID',data);
        this.$store.state.openId = data.data.data.openid;
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.home-main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(238, 238, 238);
}
.home-header {
  width: 100%;
  height: 448px;
  background: url("../assets/bg_home_new.png") no-repeat;
  background-size: 100% 100%;
}
.home-content {
  width: 95%;
  height: calc(100% - 396px);
  margin-bottom: 96px;
  overflow-y: auto;
  position: absolute;
  top: 300px;
}
</style>