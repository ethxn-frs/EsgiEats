const axios = require('axios');

const processOrder = async (order) => {
    try {
        console.log('Validating restaurant and menu...');
        const menuResponse = await axios.get(`http://restaurant_service:3004/restaurants/${order.restaurantId}/menu`);
        const menu = menuResponse.data.menu;

        const orderedItems = order.items.map(id => menu.find(item => item.id === id)).filter(Boolean);
        if (orderedItems.length !== order.items.length) {
            return {
                status: 'invalid_items',
                statusCode: 400,
                message: 'Some items do not exist in the restaurant menu'
            };
        }

        order.total = orderedItems.reduce((sum, item) => sum + item.price, 0);

        console.log('🍽Checking if restaurant accepts the order...');
        const restaurantResponse = await axios.post(
            `http://restaurant_service:3004/restaurants/${order.restaurantId}/orders`,
            {orderId: order.id, items: order.items}
        );

        if (!restaurantResponse.data.accepted) {
            console.log('Restaurant refused the order.');
            return {
                status: 'refused_by_restaurant',
                statusCode: 400,
                message: 'Restaurant refused the order'
            };
        }

        console.log('Requesting payment...');
        const paymentResponse = await axios.post('http://payment_service:3002/payment', {
            orderId: order.id,
            amount: order.total
        });

        if (paymentResponse.data.status !== 'success') {
            throw new Error('Payment failed');
        }

        console.log('Payment successful. Requesting delivery...');
        const deliveryResponse = await axios.post('http://delivery_service:3003/delivery', {
            orderId: order.id,
            clientId: order.clientId
        });

        if (deliveryResponse.status === 200) {
            console.log('Delivery started');
            return {
                status: 'in_delivery',
                statusCode: 200,
                message: 'Order paid and delivery started',
                total: order.total,
                items: orderedItems
            };
        } else {
            throw new Error('Delivery service failed');
        }
    } catch (error) {
        if (error.response?.status === 404) {
            return {
                status: 'restaurant_not_found',
                statusCode: 404,
                message: `Restaurant ${order.restaurantId} not found`
            };
        }

        console.error('SAGA error:', error.message);
        return {
            status: 'failed',
            statusCode: 500,
            message: error.message
        };
    }
};

module.exports = {processOrder};
