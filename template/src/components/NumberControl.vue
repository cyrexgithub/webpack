<template>
  <div class="main">
    <div class="btn-sub" @click="sub">
      <span>-</span>
    </div>
    <div class="content-counts">{{counts}}</div>
    <div class="btn-add" @click="add">
      <span>+</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "NumberControl",
  data() {
    return {
      counts: 1,
    }
  },
  props: {
    isDisable: false,
  },
  methods: {
    add() {
      this.counts++;
      this.$emit("updateCounts",{count:this.counts})
    },
    sub() {
      if(this.counts <= 1)return
      this.counts--;
      this.$emit("updateCounts",{count:this.counts})
    },
  },
}

</script>
<style lang="scss" scoped>
.main{
  width: 183px;
  height: 48px;
  // background-color: red;
  border: 1px solid #A6A6A6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mask{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.2);
}
.btn-sub,.btn-add{
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  span{
    line-height: 48px;
    color: #A6A6A6;
  }
}
.content-counts{
  width: 89px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #A6A6A6;
  border-right: 1px solid #A6A6A6;
  span{
    line-height: 48px;
    font-size: 24px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #333333;
  }
}
</style>