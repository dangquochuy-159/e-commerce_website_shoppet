const Handlebars = require('handlebars');

module.exports = {
    compare: (categoryID, category_ID) => {
        if (categoryID === category_ID) {
            return true
        } else {
            return false
        }
    }
}