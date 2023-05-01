const Handlebars = require('handlebars');

module.exports = {
    id_to_name: (categoryID, category) => {
        for (let index in category) {
            if (category[index].category_ID === categoryID) {

                // return ` <td class="text-center">${category[index].name}</td>`
                return ` <td class="text-center">huy</td>`
            }
        }
    }
}