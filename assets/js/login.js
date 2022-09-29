$(function () {
    $('#go2Reg').on('click', function () {
        $('.login-warp').hide()
        $('.reg-warp').show()
    })
    $('#go2Login').on('click', function () {
        $('.reg-warp').hide()
        $('.login-warp').show()
    })
    const form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码格式错误！！！'
        ],
        repwd: function (value) {
            if ($('#password').val() !== value) {
                return '密码不一致'
            }
        }
    })


    $('#formReg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reg',
            data: $(this).serialize(),
            success(res){
                if(res.code!==0)return layer.msg(res.message)
                layer.msg(res.message)
                $('#go2Login').click()
            }
        })
    })
    $('#formLogin').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success(res){
                if(res.code!==0)return layer.msg(res.message)
                localStorage.setItem('big_news_token',res.token)
                location.href='/home.html'
            }
        })
    })
})