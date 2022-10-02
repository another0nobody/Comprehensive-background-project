// 地址拼接 这个函数可以拿到为ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  // console.log(options.url);
  // 发起真正的Ajax之前，同意请求的根路径
  options.url = 'http://api-breakingnews-web.itheima.net' + options.url
  console.log(options.url);
})