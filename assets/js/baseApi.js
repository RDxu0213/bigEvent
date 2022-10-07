$.ajaxPrefilter(function (config) {
    // console.log(config)
    // 设置基准地址
    config.url = 'http://big-event-vue-api-t.itheima.net' + config.url
    // 设置请求头contentType值
    config.contentType = 'application/json'
    // 将data格式转化成需要的对象字符串模式
    const format2Json = function (source) {
      let target = {}
      source.split('&').forEach(el => {
        let kv = el.split('=')
        // 需要对value进行解码操作 %40->@
        target[kv[0]] = decodeURIComponent(kv[1])
      })
      return JSON.stringify(target)
    }
    config.data = config.data && format2Json(config.data)
    //设置请求头 
    // 判断字符串是否出现想要的字符，可以使用indexOf,startsWith,endsWith,includes
    if (config.url.includes('/my')) {
      config.headers = { Authorization: localStorage.getItem('token') || '' }
    }
    //解决没有登录却可以访问index页面的问题
    config.complete = function(res){
      // console.log(res)
      if (res.responseJSON.code === 1 && res.responseJSON.message === '身份认证失败！') {
        localStorage.removeItem('token')
        location.href = './login.html'
      }
    }
  
  })