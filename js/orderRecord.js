// 示例订单数据
const orderData = {
    pendingPayment: [
        { img: 'images/Book2_1.jpg', name: '成为雍正', price: '￥283.10' },
        { img: 'images/Book3_1.jpg', name: '繁花', price: '¥68.00' }
    ],
    pendingShipment: [
        { img: 'images/Book1_1.jpg', name: '史记', price: '¥76.40' }
    ],
    pendingReceipt: [
        { img: 'images/Book4_1.jpg', name: '每个人都了不起', price: '¥56.80', status: '已到达宁波分拨中心' }
    ],
    pendingReview: [
        { img: 'images/Book5_1.jpg', name: '阿勒泰的角落', price: '¥40.70', status: '已收货' }
    ],
    afterSales: [
        { img: 'images/Book6_1.jpg', name: '三体', price: '¥91.10', status: '退款中' }
    ]
};

// 动态填充表格的函数
function populateTable(tabId, orders) {
    const tableBody = document.querySelector(`#${tabId} tbody`);
    tableBody.innerHTML = ''; // 清空现有内容

    orders.forEach(order => {
        const row = `<tr>
            <td><img src="${order.img}" alt="Product Image" class="product-img"></td>
            <td>${order.name}</td>
            <td>${order.price}</td>
            ${order.status ? `<td>${order.status}</td>` : ''}
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// 在页面加载完成后填充表格
document.addEventListener('DOMContentLoaded', function() {
    populateTable('pendingPayment', orderData.pendingPayment);
    populateTable('pendingShipment', orderData.pendingShipment);
    populateTable('pendingReceipt', orderData.pendingReceipt);
    populateTable('pendingReview', orderData.pendingReview);
    populateTable('afterSales', orderData.afterSales);
});
