$(function(){
    // 点击注册
    $('#goReg').on('click',function(){
      $('.login-wrap').hide()
      $('.res-wrap').show()
    })
    // 点击登录
    $('#goLogin').on('click',function(){
      $('.res-wrap').hide()
      $('.login-wrap').show()
    })
    // 验证规则
    let form = layui.form
    form.verify({
      pwd:[
        /^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'
      ] ,
      repwd:function(value){
        let pwd = $(".res-wrap [name='password']").val()
        if(pwd!==value){
          return '与上次密码不一致'
        }
      }
    })
  
    const layer = layui.layer
    //监听注册表单的提交事件
    $('.formReg').on('submit',function(e){
      e.preventDefault()
      $.ajax({
        method:'post',
        url:`/api/reg`,
        data: $(this).serialize(),
        success(res){
          if(res.code !== 0){
            return layer.msg(res.message)
          }
          layer.msg(res.message)
          $('#goLogin').click()
        }
      })
    })  
    //监听注册表单的注册事件
    $("#formLogin").on('submit',function(e){
      e.preventDefault()
      $.ajax({
        method:'post',
        url: `/api/login`,
        data: $(this).serialize(),
        success(res){
          if(res.code !== 0){
            return layer.msg(res.message)
          }
          layer.msg(res.message)
          localStorage.setItem('token',res.token)
          location.href = './index.html'
        }
      })
    })
  
    
  })