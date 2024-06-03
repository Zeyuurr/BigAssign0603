// 获取URL参数中的用户名
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');

// 显示用户名
var userNameDisplay = document.getElementById('userNameDisplay');
userNameDisplay.textContent = "用户名: " + username;
