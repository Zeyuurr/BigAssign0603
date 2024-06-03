document.addEventListener('DOMContentLoaded', function() {
    let cartArr = JSON.parse(localStorage.getItem('cartArr'))==null?[]:JSON.parse(localStorage.getItem('cartArr'));
    let addToCartButton = document.querySelector('#addToCart');
    let buyNowButton = document.querySelector('#buyNow');
    let bookTitle = document.querySelector("#bookTitle");
    let imgsrc = document.querySelector("#imgsrc")

    addToCartButton.addEventListener('click', function() {
        addToCart(bookTitle.textContent,imgsrc.src);
    });

    buyNowButton.addEventListener('click', function() {
        const productId = addToCartButton.getAttribute('data-pid'); // Assuming the same product id
        buyNow(productId);
    });

    function addToCart(title,src) {
        cartArr.push({
            title: title,
            src: src,
            price: 76.4
        });
        alert('书籍已加入购物车');
        localStorage.setItem('cartArr', JSON.stringify(cartArr));
    }

    function buyNow(productId) {
        alert('购买成功，立即结账');
        // 在实际应用中，您可能会重定向到结账页面
        window.location.href = 'paid.html';
    }
});



