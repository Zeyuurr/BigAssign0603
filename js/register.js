var userName = document.getElementById('userName')
var labelName = document.getElementById('lname')
var passWord1 = document.getElementById('passWord1')
var passWord2 = document.getElementById('passWord2')
var labelPass1 = document.getElementById('lpass1')
var labelPass2 = document.getElementById('lpass2')
var register = document.getElementById('register')

let flag1 = false
let flag2 = false
let flag3 = false

userName.onblur = function(){  
    const nameValue = userName.value
    var pattern = /^[a-zA-Z_]\w{5,19}$/g;  
    if(nameValue == "" || nameValue==null){  
        labelName.innerHTML = "<span style='color:red'>用户名不能为空!</span>";  
    }  
    else if(pattern.test(nameValue)){  
        labelName.innerHTML = "<span style='color:green'>✔</span>";  
        flag1 = true
    }  
    else{  
        labelName.innerHTML = "<span style='color:red'>数字不能开头,长度在6-20位之间！</span>";  
    }  
}

passWord1.onblur = function(){  
    const passValue = passWord1.value;  
    var pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,16}$/;  
    if(passValue == "" || passValue==null){  
        labelPass1.innerHTML = "<span style='color:red'>密码不能为空!</span>";  
    }  
    else if(pattern.test(passValue)){  
        labelPass1.innerHTML = "<span style='color:green'>✔</span>";  
        flag2 = true
    }  
    else{  
        labelPass1.innerHTML = "<span style='color:red'>请输入8-16位（大写字母+小写字母+数字）密码</span>";  
    }  
}

passWord2.onblur = function(){
    const passValue = passWord1.value;  
    const rePassValue = passWord2.value;
    if(rePassValue != passValue || rePassValue == null || rePassValue == ""){
        labelPass2.innerHTML = "<span style='color:red'>两次密码不一致</span>";
    }
    else{
        labelPass2.innerHTML = "<span style='color:green'>✔</span>";  
        flag3 = true
    }
}

register.addEventListener("click", function(){
    // 获取用户输入的用户名和密码
    var usernameValue = userName.value;
    var passwordValue = passWord1.value;

    // 将注册的用户名和密码存储为全局变量
    localStorage.setItem('registeredUsername', usernameValue);
    localStorage.setItem('registeredPassword', passwordValue);

    // 跳转到登录页面
    window.location.href = 'login.html';
});