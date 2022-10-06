$(function () {
  var form = layui.form
  var layer = layui.layer
  // console.log('123');
  
  initUserInfo()
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '用户名长度必须在1~6个字符之间'
      }
    }
  })
  
  // 重置表单数据
  $('#btnReset').on('click', function (e) {
    e.preventDefault()
    initUserInfo()
  })
  // 发起更新用户信息的请求
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'post',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        // console.log(res);
        layer.msg('信息更新成功')

        // 之后要同步更新父页面的用户信息,通过调用父页面的方法
        window.parent.getUserInfo()

      }
    })
  })
  
})


function initUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg('获取用户信息失败!')
      }
      console.log(res);
      // 配合表单上lay-filter属性对应值 
      layui.form.val('formUserInfo', res.data)
    }
  })
}