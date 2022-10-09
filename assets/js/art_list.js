$(function () {
  var layer = layui.layer
  var form = layui.form
  var laypage = layui.laypage
  // 定义美化时间的过滤器
  template.defaults.imports.dateFormat = function (date) {
    const dt = new Date(date)
    var y = dt.getFullYear()
    var m = addZero(dt.getMonth() + 1)
    var d = addZero(dt.getDate())
    
    var hh = addZero(dt.getHours())
    var mm = addZero(dt.getMinutes())
    var ss = addZero(dt.getSeconds())
    
    return y+'-'+m+'-'+d+' '+hh+':'+mm+':'+ss
  }
  // 定义补零的函数
  function addZero(digit) {
    return digit >= 10 ? digit : '0' + digit
  }
  // 定义一个查询对象
  var q = {
    pagenum: 1,//默认请求第一页的数据
    pagesize: 2,//每页显示几条数据
    cate_id: '',//文章分类的id
    state: '',//文章的发布状态
  }
  initTable()
  initCate()
  

  // 获取文章数据
  function initTable() {
    $.ajax({
      method: 'get',
      url: '/my/article/list',
      data: q,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取文章数据失败')
        }
        console.log(res);
        var htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr) 
        form.render()
        // 调用渲染分类的方法
        renderPage(res.total)
      }
    })
    }
  // 初始化文章分类的方法
  function initCate() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('获取分类数据失败！')
        }
        // console.log(res);
        // 调用模板引擎渲染分类的可选项
        var htmlStr = template('tpl-cate', res)
        $('[name=cate_id]').html(htmlStr)
        // 异步操作 没有被layui监听到
        // 通过 layui 重新渲染表单区域的UI结构
        form.render()
      }
    })
  }
  // 为筛选表单绑定submit事件
  $('#form-search').on('submit', function (e) {
    e.preventDefault()
    var cate_id = $('[name=cate_Id]').val()
    var state = $('[name=state').val()
    // 为查询参数对象q赋值
    q.cate_id = cate_id
    q.state = state
    initTable()
  })
  
  function renderPage(total) {
    // 调用renderpage方法
    laypage.render({
      elem: 'pagebox' //注意，这里的 test1 是 ID，不用加 # 号
      , count: total //数据总数，从服务端得到
      , limit: q.pagesize//每页容量
      , curr: q.pagenum//默认指定页数
      , layout: ['limit', 'count', 'prev', 'page', 'next']
      // 功能项的前后数据
      , limits: [2, 3, 5, 10]
      // 重新布置每一页面的信息数可选项 还需要补充一个监听事件

      // 触发jump回调：1.点击页码2.调用laypage.render方法就会触发jump回调
      , jump: function (obj, first) {
        // console.log(obj.curr);//得到新的页码
        // console.log(obj.limit);//得到条目数
        // console.log(first);//第一次加载显示是true,点页码触发jump显示undefined
        q.pagenum = obj.curr
        q.pagesize = obj.limit
        if (!first) {
          initTable()
        }
      }
    });
  }
  $('tbody').on('click', '.btn-del', function () {
    layer.confirm('是否要删除这条数据?', {icon: 3, title:'提示'}, function(index){
      var id = $(this).attr('data-Id')
      var len = $('.btn-del').length
      $.ajax({
        method: 'get',
        url: '/my/article/delete/'+id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg('删除失败')
          }
          layer.msg('删除成功')
          // 这里要加一句判断 删除后 当前页是否还有数据 否则页码数减一
          if (len === 1) {
            // 如果 len 的值等于1，证明删除完毕之后，页面上就没有任何数据了
            // 页码值最小必须是 1
            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
            }
          initTable()
        }
      })
      
      layer.close(index);
    });
  })
})
