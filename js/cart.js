document.addEventListener('DOMContentLoaded', function () {
    //购物车全局变量
    let cartArr = JSON.parse(localStorage.getItem('cartArr')) || [];
    //获取tbody
    let cartTableBody = document.querySelector('tbody');
    //获取全选框
    let selectAll = document.querySelector('#check-all');
    //获取选中的个数
    let selectedTotal = document.querySelector('#selectNum');
    //获取总价格
    let priceTotal = document.querySelector('#totalPrice');
    //获取购物车物品总书
    let cartNum = document.querySelector("#cartNum");


    //渲染购物车页面的table
    function renderCart() {
        // 清空当前购物车内容
        cartTableBody.innerHTML = '';
        // 遍历购物车数组并生成表格行
        if(cartArr.length<1){
            const row = document.createElement('h1')
            row.textContent = '暂无商品'
            cartTableBody.appendChild(row);
        }else{
        cartArr.forEach((product, index) => {
            const row = document.createElement('tr');

            // checkBox
            const checkBoxCell = document.createElement('td');
            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBoxCell.className = 'align-middle checkbox';
            checkBoxCell.appendChild(checkBox);

            // img
            const imgCell = document.createElement('td');
            const img = document.createElement('img');
            img.src = product.src;
            img.className = 'cart-product-image';
            imgCell.className = 'align-middle';
            imgCell.appendChild(img);

            const nameCell = document.createElement('td');
            nameCell.textContent = product.title;
            nameCell.className = 'align-middle';

            const priceCell = document.createElement('td');
            priceCell.textContent = product.price.toFixed(2);
            priceCell.className = 'align-middle';

            const numberCell = document.createElement('td');
            numberCell.className = 'align-middle';
            const numberDiv1 = document.createElement('div');
            numberDiv1.className = 'input-group';
            const numberDiv2 = document.createElement('div');
            numberDiv2.className = 'input-group-prepend';
            const button = document.createElement('button');
            button.type = 'button';
            button.textContent = '-';
            button.className = 'btn btn-outline-secondary reduce';
            numberDiv2.appendChild(button);
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'form-control cart-form-control number';
            input.value = '1';
            const numberDiv3 = document.createElement('div');
            numberDiv3.className = 'input-group-prepend';
            const button1 = document.createElement('button');
            button1.type = 'button';
            button1.textContent = '+';
            button1.className = 'btn btn-outline-secondary add';
            numberDiv3.appendChild(button1);
            numberDiv1.appendChild(numberDiv2);
            numberDiv1.appendChild(input);
            numberDiv1.appendChild(numberDiv3);
            numberCell.appendChild(numberDiv1);

            const totalPriceCell = document.createElement('td');
            totalPriceCell.textContent = (product.price * input.value).toFixed(2);
            totalPriceCell.className = 'align-middle';
            totalPriceCell.id = 'totalPriceCell';

            const actionCell = document.createElement('td');
            const removeButton = document.createElement('button');
            removeButton.textContent = '删除';
            removeButton.className = 'btn btn-danger';
            removeButton.addEventListener('click', () => removeProduct(index));
            actionCell.className = 'align-middle';
            actionCell.appendChild(removeButton);

            row.appendChild(checkBoxCell);
            row.appendChild(imgCell);
            row.appendChild(nameCell);
            row.appendChild(priceCell);
            row.appendChild(numberCell);
            row.appendChild(totalPriceCell);
            row.appendChild(actionCell);

            cartTableBody.appendChild(row);
        });
    }
        //更新总价
        updateTotalPrice();
        //选中框事件、物品数量事件的监听
        attachEventListeners();
    }
    //更新总价
    function updateTotalPrice() {
        let totalPrice = 0;
        let selected = 0;
        let trs = document.querySelectorAll('tbody tr');
        trs.forEach(tr => {
            if (tr.querySelector('.checkbox input').checked) {
                selected += parseInt(tr.querySelector('.number').value);
                totalPrice += parseFloat(tr.children[5].textContent);
            }
        });
        selectedTotal.textContent = selected;
        priceTotal.textContent = totalPrice.toFixed(2);
    }
    //更新单行价格
    function updatePrice(tr) {
        let price = parseFloat(tr.children[3].textContent);
        let num = parseInt(tr.querySelector('.number').value);
        let totalPriceCell = tr.children[5];
        totalPriceCell.textContent = (price * num).toFixed(2);
    }
    //删除商品
    function removeProduct(index) {
        if (confirm("确认删除所选商品吗？")) {
            cartArr.splice(index, 1);
            localStorage.setItem('cartArr', JSON.stringify(cartArr));
            renderCart();
            attachEventListeners();
        }
    }

    function attachEventListeners() {
        let checkBoxs = document.querySelectorAll('.checkbox input');
        let trs = document.querySelectorAll('tbody tr');

        if (selectAll.checked){
            checkBoxs.forEach(checkBox => {
                checkBox.checked = selectAll.checked;
            });
        }
        selectAll.onclick = function () {
            checkBoxs.forEach(checkBox => {
                checkBox.checked = selectAll.checked;
            });
            updateTotalPrice();
        }

        checkBoxs.forEach(checkBox => {
            checkBox.onclick = function () {
                selectAll.checked = Array.from(checkBoxs).every(cb => cb.checked);
                updateTotalPrice();
            }
        });

        trs.forEach((tr, i) => {
            tr.addEventListener('input',function(e){
                updatePrice(tr);
                updateTotalPrice();

            })
            tr.onclick = function (e) {
                let target = e.target;
                let className = target.className;
                let numInput = tr.querySelector(".number");
                let value = parseInt(numInput.value);
                switch (className) {
                    case "btn btn-outline-secondary add":
                        numInput.value = value + 1;
                        updatePrice(tr);
                        break;
                    case "btn btn-outline-secondary reduce":
                        if (value > 1) {
                            numInput.value = value - 1;
                            updatePrice(tr);
                        }
                        break;
                }
                updateTotalPrice();
            }
        });
        cartNum.textContent = cartArr.length
    }

    cartNum.textContent = cartArr.length;
    selectedTotal.textContent = 0;
    priceTotal.textContent = 0;

    renderCart();

    document.querySelector('#submitOrder').addEventListener('click', function (e) {
        let flag1= false;
        let checkBoxs = document.querySelectorAll('.checkbox input');
        let index = 0;
        let indexArr = [];
        checkBoxs.forEach(checkBox=>{
            if (checkBox.checked){
                flag1=true;
                indexArr.push(index);
                index++;
            }
        })
        localStorage.setItem('indexArr', JSON.stringify(indexArr));
        let selectedTime = document.querySelector('input[name="deliveryTime"]:checked');
        let selectedPay = document.querySelector('input[name="paymentMethod"]:checked');
        if (!selectedTime) {
            alert('请选择一个配送时间');
            e.preventDefault(); // 阻止表单提交
        }else{
            if (!selectedPay){
                alert('请选择一个支付方式');
                e.preventDefault(); // 阻止表单提交
            }else{
                if (flag1){
                    window.location.href = 'paid.html';
                }else{
                    alert("请先选中商品再结算")
                }
            }
        }


    });
});
