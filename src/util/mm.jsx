class MUtil {
  request(param) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: param.type || 'get',
        url: param.url || '',
        dataType: param.dataType || 'json',
        data: param.data || null,
        success: res => {
          // 数据请求成功
          if (0 === res.status) {
            typeof resolve === 'function' && resolve(res.data, res.msg)
          } else if (10 === res.status) {
            // 没有登录，强制登录
            this.doLogin()
          } else {
            typeof reject === 'function' && reject(res.msg || res.data)
          }
        },
        error: err => {
          typeof reject === 'function' && reject(err.statusText)
        }
      })
    })
  }
  doLogin() {
    window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname)
  }
  getUrlParam(name) {
    // 就是网址后？号开头的一串字符 param=123&param=456
    let queryString = window
      .location
      .search
      .split('?')[1] || ''
    let reg = new RegExp("(^|&)" + name + "(=[^&]*)(&|$)")
    // result = ['param=123','','123','&']
    let result = queryString.match(reg)

    return result
      ? decodeURIComponent(result[2]).substring(1)
      : null
  }
  // 成功提示
  successTips(successMsg) {
    alert(successMsg || '操作成功！');
  }
  errorTips(err) {
    alert(err || '好像哪里不对了Δ')
  }
  setStorage(name, data) {
    let dataType = typeof data
    // json对象
    if (dataType === 'object') {
      window
        .localStorage
        .setItem(name, JSON.stringify(data))
    } else if (['number', 'string', 'boolean'].indexOf(dataType) > -1) {
      // 基础类型
      window
        .localStorage
        .setItem(name, data)
    } else {
      alert('该类型不能用于本地存储')
    }
  }
  getStorage(name) {
    let data = window
      .localStorage
      .getItem(name)
    if (data) {
      return JSON.parse(data)
    } else {
      return ''
    }
  }
  removeStorage(name) {
    window
      .localStorage
      .removeItem(name)
  }
}

export default MUtil