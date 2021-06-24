<template>
  <div class="loading-main" v-if="showLoading">
    <div class="loading-container">
      <span>加载中</span>
      <van-loading color="#FFFFFF"  size="24" />
    </div>
  </div>
</template>

<script>
export default {
  name: "my-loading",
  props: {
    showLoading: false,
  }
}

</script>
<style lang="scss" scoped>
.loading-main{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading-container{
  width: 250px;
  height: 250px;
  background-color: rgba(0,0,0,.5);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  span{
    font-size: 36px;
    color: #FFF;
  }
}
</style>