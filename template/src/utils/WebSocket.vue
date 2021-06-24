<template>
  <div></div>
</template>

<script>
export default {
  name: 'WebSocket',
  data() {
    return {
      webSocketPath: "wss://api.hikspark.com/pxhuodong/tools-coupon/tools-coupon-websocket",
      // webSocketPath: "wss://api.hikspark.com/pxhuodong/tools-coupon-test/tools-coupon-websocket",
      // webSocketPath: "ws://10.103.6.74:9080/tools-coupon/tools-coupon-websocket",
      webSocket: "",
    };
  },
  methods: {
    initWebSocket() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持webSocket");
      } else {
        // 实例化socket
        this.webSocket = new WebSocket(this.webSocketPath);
        // 监听socket连接
        this.webSocket.onopen = this.webSocketOpen;
        // 监听socket错误信息
        this.webSocket.onerror = this.websocketError;
        // 监听socket消息
        this.webSocket.onmessage = this.webSocketGetMessage;
      }
    },
    webSocketOpen() {
      console.log("socket连接成功");
    },
    websocketError(error) {
      console.log("连接错误", error);
      setTimeout(() => {
        this.initWebSocket();
      }, 5000);
    },
    webSocketGetMessage(e) {
      const resData = JSON.parse(e.data);
      if (resData.data == undefined) {
        return;
      }
      switch (resData.type) {
        case 101: // 首页过车数据
          this.$store.commit("couPonCheckSuccess", resData);
          break;
        default:
          break;
      }
    },
    webSocketSend() {
      this.webSocket.webSocketSend(params);
    },
    webSocketClose(e) {
      // console.log("断开链接", e);
    },
  },
  mounted() {
    this.initWebSocket()
  },
  destroyed () {
    // 销毁监听websocket
    if(this.webSocket != ""){
      this.webSocket.onclose = this.webSocketClose()
    }
  }
};
</script>
