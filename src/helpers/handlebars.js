const Handlebars = require('handlebars');

module.exports = {
    sum: (number) => number + 1,
    convertPrice: (price) => {
        if (!price) return;
        // if (!number) return
        return `${price.toLocaleString('en-US')}đ`;
    },
    convertDate: (dateMongo) => {
        const dateString = dateMongo
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString("vi-VN");
        return formattedDate
    },
    multiplication: (a, b) => a * b,
    compare: (value1, value2) => {
        if (value1 === value2) {
            return true
        } else {
            return false
        }
    },
    totalMoney: (object) => {
        let total = 0
        for (let item of object) {
            total += item.quantity * item.price_product
        }
        return total
    },
    countQuantity: (array) => {
        return array.length
    },
    sumOrder: (object) => {
        return Object.keys(object).length;
    }
}