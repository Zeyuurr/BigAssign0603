// 当动画播放完一遍后，显示支付成功信息
const loadingAnimation = document.querySelector('.loading');

// 监听动画结束事件
loadingAnimation.addEventListener('animationend', () => {
    // 隐藏loading动画
    loadingAnimation.style.display = 'none';

    // 显示支付成功信息
    const paymentSuccess = document.querySelector('.paymentSuccess');
    paymentSuccess.style.display = 'block';
});
document.addEventListener('DOMContentLoaded', function () {
    let indexArr = JSON.parse(localStorage.getItem('indexArr'));
    let cartArr = JSON.parse(localStorage.getItem('cartArr')) || [];
    if (cartArr.length>0 && indexArr.length>0) {
        for (let i = indexArr.length-1;i>=0;i--){
            cartArr.splice(indexArr[i],1);
        }
    }
    localStorage.setItem('cartArr', JSON.stringify(cartArr));
})