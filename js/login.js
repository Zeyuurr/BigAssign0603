var login = document.getElementById('login');
var lname = document.getElementById('login-username');
var lpass = document.getElementById('login-password');
var userName = document.getElementById('userName');
var passWord = document.getElementById('passWord');

userName.onblur = function(){  
    const loginName = userName.value;
    var pattern = /^[a-zA-Z_]\w{5,19}$/g;  
    if(loginName == "" || loginName==null){  
        lname.innerHTML = "<span style='color:red'>用户名不能为空!</span>";  
    }  
    else if(pattern.test(loginName)){}
}

passWord.onblur = function(){
    const loginPass = passWord.value;
    if(loginPass == "" || loginPass==null){  
        lpass.innerHTML = "<span style='color:red'>密码不能为空!</span>";  
    }  
}

login.addEventListener('click', function () {
    const currentUserName = userName.value;
    const currentPassword = passWord.value;

    // 获取注册的用户名和密码
    var registeredUsername = localStorage.getItem('registeredUsername');
    var registeredPassword = localStorage.getItem('registeredPassword');

    // 验证用户输入的用户名和密码与注册的是否匹配
    if(currentUserName === registeredUsername && currentPassword === registeredPassword){
        window.location.href = 'personalCenter.html?username=' + currentUserName;
    }else{
        alert("用户名或密码错误");
    }
});
