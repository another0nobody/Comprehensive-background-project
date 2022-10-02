$(function () {
  // 点击去注册链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  // 点击去登录链接
  $('#link_login').on('click', function () {
    $('.reg-box').hide()
    $('.login-box').show()
  })
// 从layui中获取layui对象 手动设置表单验证原则
  var form = layui.form
  var layer = layui.layer
  form.verify({
    'pwd': [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    'repwd': function (value) {
      if ($('.reg-box input[name=passward]').val() !== value)
        return '两次密码不一致'
    }
  })

  $('#form-reg').on('submit', function (e) {
    e.preventDefault()
    var data = {
      username: $('#form-reg [name=username]').val(),
      password:$('#form-reg [name=passward').val()
    }
    // console.log(data);
    $.post('http://api-breakingnews-web.itheima.net/api/reguser', data, function (req, res) {
      if (res !== 'success') {
        console.log(res);
        return layer.msg(res)
      }
      console.log(res);
      console.log('注册成功');
      layer.msg('注册成功,请登录')
      $('#link_login').click()

    })
  })
  $('#form-login').submit(function (e) {
    e.preventDefault()
    var data = {
      username: $('#form-login [name=username]').val(),
      password:$('#form-login [name=passward').val()
    }
    $.ajax({
      url: 'http://api-breakingnews-web.itheima.net/api/login',
      method: 'post',
      data:data,
      success: function (res) {
        if (res.status !== 0) {
          // console.log(res);
          return layer.msg('登陆失败')
        }
        layer.msg('登陆成功')
        // 将得到的token存在本地
        localStorage.setItem('token', res.token)
        
        location.href = 'index.html'
        // console.log(res);
      }
    })
  })
})