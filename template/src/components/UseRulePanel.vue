<template>
  <div class="buy-panel-main">
    <transition name="ani-buy-panel">
      <div class="panel-content" v-if="showContent">
        <div @click="closePanel">
          <img style="width:6.4vw;height:6.4vw;position:absolute;top:3.867vw;right:4.133vw;color:#a6a6a6;" :src="require('../assets/btn_close.png')" alt="">
        </div>
        <span class="rule-title">使用说明</span>
        <div class="rule-text">
          <span v-html="rule"></span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
import couponRule from "../useRule";
export default {
  name: "UseRulePanel",
  components: {
    
  },
  props: {
    ruleType: String,
  },
  data() {
    return {
      showContent: false,
      rule: "",
    }
  },
  methods: {
    closePanel() {
      this.$emit("closePanel")
    },
    setRuleContext(type) {
      switch (type) {
        case "001":
          this.rule = couponRule.rule_001;
          break;
        case "002":
          this.rule = couponRule.rule_002;
          break;
        case "003":
          this.rule = couponRule.rule_003;
          break;
        case "004":
          this.rule = couponRule.rule_004;
          break;
        case "005":
          this.rule = couponRule.rule_005;
          break;
        case "006":
          this.rule = couponRule.rule_006;
          break;
        case "007":
          this.rule = couponRule.rule_007;
          break;
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.showContent = true;
    }, 100);
    this.setRuleContext(this.ruleType);
  },
}

</script>
<style lang="scss" scoped>
.buy-panel-main{
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.5);
  position: fixed;
  bottom: 0;
}
.panel-content{
  width: 749px;
  height: 50%;
  position: absolute;
  background-color: #fff;
  bottom: 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  display: flex;
  justify-content: center;
}
.btn-close{
  width: 48px;
  height: 48px;
  position: absolute;
  top: 29px;
  right: 31px;
  color: #A6A6A6;
}
.rule-title{
  position: absolute;
  left: 43px;
  top: 50px;
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #333333;
}
.rule-text{
  width: 90%;
  height: 80%;
  overflow: auto;
  position: absolute;
  bottom: 5%;
  text-align: left;
  span{
    color: #A6A6A6;
    font-size: 24px;
  }
}

.ani-buy-panel-enter-active,
.ani-buy-panel-leave-active {
  transition: all .5s;
}
.ani-buy-panel-enter, .ani-buy-panel-leave-to /* .fade-leave-active below version 2.1.8 */ {
  bottom: -80%;
}
</style>