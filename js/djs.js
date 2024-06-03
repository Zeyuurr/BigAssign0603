
    //获取当日日期并渲染至倒计时顶部
    const date = new Date()
    const next = document.querySelector('.next')
    next.innerHTML = `今天是${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
 
    //获取当日下班时间的时间戳
    const afterWork = +new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 23:30:00`)
 
    //封装函数：获取剩余时间
    function getCountTime() {
      //获取当前时间的时间戳
      const now = + new Date()
 
      //两时间戳相减得到剩余时间
      const remain = (afterWork - now) / 1000
 
      //将时间转化成时分秒
      const s = parseInt(remain % 60)
      const m = parseInt(remain / 60 % 60)
      const h = parseInt(remain / 60 / 60 % 24)
 
      //将时间渲染到页面中，记得小于10的数字前需要补0
      const hour = document.querySelector('#hour')
      const minutes = document.querySelector('#minutes')
      const second = document.querySelector('#second')
      hour.innerHTML = h >= 10 ? h : '0' + h
      minutes.innerHTML = m >= 10 ? m : '0' + m
      second.innerHTML = s >= 10 ? s : '0' + s
    }
 
    //先调用一次，因为间歇函数一秒之后才会启用
    getCountTime()
 
    //利用间歇函数实现倒计时动态效果，函数调用的时间间隔为1秒
    let timer = setInterval(() => {
      getCountTime()
    }, 1000)