<template>
  <div class="login-main">
    <header>
      <div class="header-text">
        <div class="title">嗨停车</div>
        <div class="text">激发城市更美好</div>
      </div>
    </header>
    <div class="login-content">
      <div class="input-group">
        <div class="input-phone-num">
          <input type="number" @input="maxPhoneNum" v-model="phoneNum" placeholder="请输入手机号" />
          <img src="@/assets/phone.png" alt="" style="width:6.4vw;height:6.4vw;position: absolute;left: 2.667vw;top: 2.667vw;"/>
        </div>
        <div class="input-sms-code">
          <input type="number" @input="maxSmsCodeNum" v-model="smsCode" placeholder="请输入验证码" />
          <img src="@/assets/num.png" alt="" style="width: 6.4vw;height: 6.4vw;position: absolute;left: 2.667vw;top: 2.667vw;" />
          <button
            class="get-num"
            :disabled="disabled"
            ref="needBtn"
            @click="getCode(60)"
          >
            {{ btnText }}
          </button>
        </div>
        <div class="btn-login">
          <button @click="onClickLogin">登录/注册</button>
        </div>
      </div>
    </div>
    <footer></footer>
    <hz-loading :showLoading="showLoading" />
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      phoneNum: "",
      smsCode: "",
      btnText: "获取验证码",
      disabled: false,
      countdownInterval: null,
      openid: "",
      appId: "",
      showLoading: false
    };
  },
  mounted() {
    this.$ba.trackPageview(this.$route.path + '?source=' + this.$store.state.urlSource);
  },
  computed: {},

  methods: {
    maxPhoneNum() {
      //限制长度
      if(this.phoneNum.length > 11){
        this.phoneNum = this.phoneNum.slice(0,11)
      }
    },
    maxSmsCodeNum() {
      //限制长度
      if(this.smsCode.length > 6){
        this.smsCode = this.smsCode.slice(0,6)
      }
    },
    onClickLogin() {
      if(this.smsCode == ""){
        this.$dialog.alert({
          message: "请输入验证码",
          theme: 'round-button',
          confirmButtonColor: "#5E69FF",
          width: 300,
        })
        return
      }
      this.showLoading = true;
      var postData = {
        phone: this.phoneNum,
        verCode: this.smsCode
      }
      this.$publicFunc.postData("/customer/login/checkVerCode", postData).then((res) => {
        this.showLoading = false;
        var data = JSON.parse(res);
        // console.log('登录回调',data);
        if(data.data.success == "true"){
          var SZHiksParkLoginData = {
            token: data.data.data.token,
            code: data.data.data.code
          }
          // console.log(SZHiksParkLoginData);
          localStorage.removeItem('SZHiksParkLoginData');
          localStorage.setExpire("SZHiksParkLoginData", SZHiksParkLoginData, 86400000);

          this.$store.state.isFirstOpen = false;
          this.$store.state.isLogin = true;
          this.$store.state.userPhone = data.data.data.phone;
          this.$router.push("/Home");
        }else{
          // alert(data.data.errorMessage)
          this.$dialog.alert({
            message: data.data.errorMessage,
            theme: 'round-button',
            confirmButtonColor: "#5E69FF",
            width: 300,
          }).then(() => {
            // on close
          })
        }
      })
    },
    getCode(seconds) {
      this.disabled = true;
      this.btnText = seconds + "s";
      this.$refs.needBtn.className = "get-num-disable";
      this.countdownInterval = setInterval(() => {
        if (seconds > 0) {
          this.btnText = seconds + "s";
          --seconds;
        } else {
          this.btnText = "获取验证码";
          this.disabled = false;
          this.$refs.needBtn.className = "get-num";
          clearInterval(this.countdownInterval);
        }
      }, 1000);
      var postData = {
        phone: this.phoneNum
      }
      this.$publicFunc.postData("/customer/login/verCode", postData).then((res) => {
        var data = JSON.parse(res);
        console.log('获取短信验证码回调',data);
      })
    },
  },
  beforeDestroy() {
    clearInterval(this.countdownInterval);
  },
};
</script>
<style lang='scss' scoped>
.login-main {
  width: 100%;
  height: 100%;
}
header {
  width: 100%;
  height: 555px;
  display: flex;
  justify-content: center;
  background: url("../assets/login_bg.png") no-repeat;
  background-size: 100% 100%;
}
.header-text {
  margin-top: 20.9%;
  .title {
    font-size: 60px;
    font-family: ZhenyanGB;
    font-weight: 400;
    color: #ffffff;
  }
  .text {
    font-size: 30px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #ffffff;
    opacity: 0.6;
  }
}
.login-content {
  width: 100%;
  // height: 51.96%;
  height: calc(100% - 555px -156px);
  background: #fff;
  display: flex;
  justify-content: center;
  position: relative;
}
.input-group {
  // margin-top: 81px;
  position: absolute;
  top: 30px;
}
.input-sms-code {
  margin-top: 36px;
  position: relative;
  width: 619px;
  height: 88px;
  display: flex;
  align-items: center;
  input {
    height: 88px;
    width: 308px;
    border: 0;
    margin: 0;
    padding-left: 80px;
    border-radius: 12px;
    outline-style: none;
    border: 1px solid #ccc;
  }
  .get-num {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 0;
    width: 211px;
    height: 88px;
    font-size: 25px;
    font-weight: 400;
    color: #5e69ff;
    border: 1px solid #5e69ff;
    background: #fff;
    border-radius: 12px;
  }
}
.input-phone-num {
  margin-top: 36px;
  position: relative;
  width: 619px;
  height: 88px;
  display: flex;
  align-items: center;
  input {
    height: 88px;
    width: 619px;
    border: 0;
    margin: 0;
    padding-left: 80px;
    width: 100%;
    border-radius: 12px;
    outline-style: none;
    border: 1px solid #ccc;
  }
}
.btn-login {
  margin-top: 48px;
  width: 619px;
  height: 88px;
  button {
    width: 100%;
    height: 100%;
    color: #fff;
    background: #5e69ff;
    border: none;
    outline: none;
    border-radius: 12px;
  }
}
footer {
  width: 100%;
  height: 156px;
  background: url("../assets/login_bg2.png") no-repeat;
  background-size: cover;
}
.get-num-disable {
  color: #fff;
  background: #ccc;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  width: 211px;
  height: 88px;
  font-size: 25px;
  font-weight: 400;
  border-radius: 12px;
}
</style>