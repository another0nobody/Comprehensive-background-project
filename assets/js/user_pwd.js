$(function () {
  let layer = layui.layer
  let form = layui.form

  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码位数必须在6到12之间,不能有空格'],
    samePwd: function (value) {
      if (value === $('[name=oldpwd]').val()) {
        return '新密码不能与原密码相同'
      }
    },
    newpwd: function (value) {
      if (value !== $('[name=newpwd').val()) {
        return '确认密码需要与新密码相同'
      }
    }

  })

  $('.layui-form').on('submit', function(e) {
    e.preventDefault()
    $.ajax({
    method: 'POST',
    url: '/my/updatepwd',
    data: $(this).serialize(),
    success: function(res) {
      if (res.status !== 0) {
        return layui.layer.msg('更新密码失败！')
      }
      layui.layer.msg('更新密码成功！')
      // 重置表单
    $('.layui-form')[0].reset()
      }
    })
  })

})