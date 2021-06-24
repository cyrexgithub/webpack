<template>
  <div class="topBar">
    <div class="btn-back-area" @click="onClickBack">
      <img v-show="isShowBtnBack" :src="require('../assets/btn_back2.png')" alt="" style="width: 6.4vw;height: 6.4vw;margin-left: 1.333vw;" />
    </div>
    <div class="title-area">
      <span v-show="isShowTitle">{{titleTxt}}</span>
    </div>
    <div class="btn-service-area">
      <img v-show="isShowBtnService" :src="require('../assets/btn_service2.png')" alt="" style="margin-right: 3.2vw;width: 6.4vw;height: 6.4vw;" />
    </div>
  </div>
</template>

<script>
import eventBus from '../eventBus.js';
export default {
  name: "TopBar",
  props: {
    isShowTitle: true,
    isShowBtnService: true,
    isShowBtnBack: true,
    titleTxt: String,
    routerParams: Object
  },
  data() {
    return{
    }
  },
  methods: {
    onClickBack() {
      // this.$router.go(-1);
      this.goback();
    },
    goback(){
      //传递一个map，choiceHospital是key，hospital是value
      if(this.routerParams != undefined){
        eventBus.$emit('routerParams',this.routerParams);
      }
      //调用router回退页面
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.topBar{
  width: 750px;
  height: 90px;
  background-color: #5E69FF;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  .btn-back-area{
    position: absolute;
    left: 0;
    // img{
    //   margin-left: 10px;
    //   width: 48px;
    //   height: 48px;
    // }
  }
  .title-area{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    span{
      color: #FFF;
      font-size: 36px;
    }
  }
  .btn-service-area{
    position: absolute;
    right: 0;
    img{
      margin-right: 24px;
      width: 48px;
      height: 48px;
    }
  }
}
</style>