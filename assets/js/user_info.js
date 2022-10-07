$(function(){
    let form =layui.form
    let layer = layui.layer
    form.verify({
        nickname:function(value){
            if(value.length>6)return'格式错误'
        }
    })
    const initInfo=()=>{
        $.ajax({
            url:'/my/userinfo',
            success(res){
                if(res.code!==0)return layer.msg('请求用户信息失败')
                form.val('userForm',res.data)
            }
        })
    }
    initInfo()
    $('#btnRest').on('click',function(e){
        e.preventDefault()
        initInfo()
    })
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        // 快速获取表单元素
        // $(this).serialize()->key=value&key=value&key=value
        // form.val('userForm')->{key:value,key:value,key:value}
        $.ajax({
            method:'PUT',
            url:'/my/userinfo',
            data:form.val('userForm'),
            success(res){
                if(res.code!==0)return layer.msg('更新失败')
                window.parent.getUserInfo()
            }
        })
    })
})