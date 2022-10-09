
$(function () {
  var layer = layui.layer
  var form = layui.form
  initArtCateList()
  let indexAdd = null
  $('#btnAddCate').on('click', function() {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html()
    })
  })
  // 通过代理的形式，为 form-add 表单绑定 submit 事件
  $('body').on('submit', '#form-add', function(e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          // console.log(res);
          return layer.msg('新增分类失败！')
        }
        initArtCateList()
        layer.msg('新增分类成功！')
        // 根据索引，关闭对应的弹出层
        layer.close(indexAdd)
      }
    })
  })
  // 通过代理形式为 btn-edit 绑定修改事件
  let indexEdit = null
  $('tbody').on('click', '.btn-edit', function () {  
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#dialog-edit').html()
    })
    var id = $(this).attr('data-id')
    // 发起请求获取对应分类的数据
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + id,
      success: function (res) {
        form.val('form-edit', res.data)
        console.log(res);
      },
      error: function (res) {
        console.log(res);
      }
    })
  })
  // 通过代理形式为修改分类的表单提供submit事件
  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('更新分类数据失败！')
        }
        layer.msg('更新分类数据成功！')
        layer.close(indexEdit)
        initArtCateList()
        }
      })
  })
  $('tbody').on('click', '.btn-del', function () {
    var id = $(this).attr('data-id')
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        method: 'get',
        url: '/my/article/deletecate/' + id,
        success: function(res) {
          if (res.status !== 0) {
            return layer.msg('删除分类失败！')
          }
          layer.msg('删除分类成功！')
          layer.close(index)
          initArtCateList()
          }
      })
    })
  })
})
function initArtCateList() {
  $.ajax({
    method: 'get',
    url: '/my/article/cates',
    success: function (res) {
      if (res.status !== 0) {
        return console.log(res.message);
      }
      console.log(res);
      let data = template('tpl-table', res)
      $('tbody').html(data)
    }
    })
}