import axios from 'axios';
import router from './router'
import App from './App.vue'

// GET请求，用parms在url里传参，header带上token
async function getData(url, params) {
  let gdata;
  var localStorageData = JSON.parse(window.localStorage.getItem("SZHiksParkLoginData"));
  await axios.get(`${url}`, {
    params: params,
    headers: {
      'X-Token': (localStorageData != null) ? localStorageData.data.token : ''
    }
  })
    .then(res => {
      if (res.data.errorCode != '200') {
        if (res.data.errorCode == '100201') {
          Message({
            showClose: true,
            message: '登录超时，请重新登录',
            type: 'error'
          });
          router.replace('/login')
        }
        return
      }
      gdata = JSON.stringify(res.data.data);
    })
    .catch(err => {
      console.log(err);
    });
  return gdata;
}

/**
 * Post请求，用data在body里传参，header带上token
 * @param {接口地址} apiName 
 * @param {发送的参数}} data 
 */
async function postData(url, data, contentType = 'application/x-www-form-urlencoded') {
  let gdata;
  var localStorageData = JSON.parse(window.localStorage.getItem("SZHiksParkLoginData"));
  await axios.post(`${url}`, data, {
    transformRequest: [
      function (data) {
        // Do whatever you want to transform the data
        let ret = "";
        for (let it in data) {
          ret +=
            encodeURIComponent(it) +
            "=" +
            encodeURIComponent(data[it]) +
            "&";
        }
        return ret;
      }
    ],
    headers: {
      // "Content-Type": "application/x-www-form-urlencoded",
      "Content-Type": contentType,
      "X-Token": (localStorageData != null) ? localStorageData.data.token : ''
    }
  })
    .then(res => {
      // console.log(res)
      gdata = JSON.stringify(res);
      if (res.data.errorCode != '200') {
        console.log(res.data.errorMessage)
        return
      }
    })
    .catch(err => {
      console.log(err);
    });
  return gdata
}

/**
 * Post请求，用data在body里传参，header带上token
 * @param {接口地址} apiName 
 * @param {发送的参数}} data 
 */
async function postFormData(url, data) {
  let gdata;
  var sessionData = JSON.parse(window.sessionStorage.getItem("loginData"))
  let formData = new FormData();
  for (let i in data) {
    formData.append(i, data[i])
  }
  await axios.post(`${url}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-Token": (sessionData != null) ? sessionData.token : ''
    }
  }).then(res => {
    gdata = JSON.stringify(res);
    if (res.data.errorCode != '200') {
      return
    }
  }).catch(err => {
    console.error(err);
  });
  return gdata
}

//获取url中参数
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}


//json数据排序
function objKeySort(obj, typesort = 'sort') { //排序的函数
  if (typesort == 'sort') {
    var newkey = Object.keys(obj).sort(); //升序
  } else {
    var newkey = Object.keys(obj).sort().reverse(); //降序
  }
  //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
  for (var i = 0; i < newkey.length; i++) { //遍历newkey数组
    newObj[newkey[i]] = obj[newkey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对
  }
  var str = "";
  for (const m in newObj) {
    if (Object.hasOwnProperty.call(newObj, m)) {
      const element = newObj[m];
      str = str + m + "=" + newObj[m];
    }
  }
  return str; //返回排好序的新字符串
}

export default function (Vue) {
  //添加全局API
  Vue.prototype.$publicFunc = {
    getData,
    postData,
    postFormData,
    getUrlParam,
    objKeySort,
  }
}
