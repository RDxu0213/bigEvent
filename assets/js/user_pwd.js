$(function(){
    const form=layui.form
    let layer = layui.layer
    form.verify({
        pass:[/^[\S]{6,12}$/,'要符合密码规范'],
        samePwd:function(value){
            if(value===$('[name=old_pwd]').val()){
                return'新旧密码不能一样'
            }
        },
        rePwd:function(value){
            if(value!==$('[name=new_pwd]').val()){
                return'两次输入密码不一样'
            }
        }

    })
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'PATCH',
            url:'/my/updatepwd',
            data:form.val('pwdForm'),
            success(res){
                if(res.code!==0)return layer.msg('修改密码失败')
                layer.msg('修改密码成功')
                $('.layui-form')[0].reset()
            }
        })
    })
})