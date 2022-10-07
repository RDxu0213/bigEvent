$(function(){
    let layer = layui.layer
    var a=10
    getUserInfo()
    // 点击退出事件  
    // 弹出确认弹窗确认后，清除本地存储里面的token值再进行跳转到登录页面
    $('#btnBack').on('click',function(){
      layer.confirm('是否确认退出', {icon: 7, title:'提示'}, function(index){
        localStorage.removeItem('token')
        location.href='./login.html'
        layer.close(index)
      })
    })
  
  })
    // 获取用户资料
  function getUserInfo(){
      $.ajax({
        method:'GET',
        url:'/my/userinfo',
        success(res){
          // console.log(res)
          if(res.code!==0) return layer.msg(res.message)
          renderAvatar(res)
        }
      })
  }
    // 渲染用户资料
    function renderAvatar(res) {
      if(res.data.user_pic){
        $('.text-avatar').hide()
        $('.user-box img').attr('src',res.data.user_pic).show()
      }else {
        const uname = res.data.nickname || res.data.username
        $('.layui-nav-img').hide()
        const char = uname[0].toUpperCase()
        $('.text-avatar').html(char).show()
      }
      $('.text').html(`欢迎&nbsp;&nbsp;${res.data.username}`)
    }
  3