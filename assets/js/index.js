$(function () {



  // 获取用户信息
  getUserInfo()
  var layer = layui.layer
  $('.btnLogout').on('click', function () {
    layer.confirm('确定要退出吗？', {icon: 3, title:'提示'}, function(index){
      //do something
      // 清空token信息
      localStorage.removeItem('token')
      // 重新跳转到登录页面
      location.href = '/login.html'

      // 关闭询问框
      layer.close(index);
    });
    //eg2
    layer.confirm('确定要退出吗？', function(index){
      //do something
      
      layer.close(index);
    });
  })
  
})
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg('用户信息获取失败')
      }
      renderAvater(res.data)
    },

    
    })
}
// 渲染用户头像
function renderAvater(user) {
  let name = user.username || user.nickname

  $('#welcome').html('欢迎&nbsp&nbsp' + name)
  // 欢迎 渲染
  if (user.user_pic !== null) {
    // 渲染图片头像
    $('.layui-nav-img-').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    let first = name[0].toUpperCase() 
    $('.layui-nav-img').hide()
    $('.text-avatar').html(first).show()
  }
}
