const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const slug = require("mongoose-slug-generator");
const AutoIncrement = require('mongoose-sequence')(mongoose);
mongoose.set('useCreateIndex', true);

const CartSchema = new Schema(
    {
        id_customer: { type: Number },
        id_product: { type: Number },
        name_product: { type: String },
        image_product: { type: String },
        quantity: { type: Number },
        price_product: { type: Number },
        slug: { type: String, slug: "name_product", unique: true },
    },
    {
        timestamps: true,
    }
)
//tăng id
CartSchema.plugin(AutoIncrement, { inc_field: 'cart_ID' });
//add pluggin slug thông qua thư viện
mongoose.plugin(slug);

module.exports = mongoose.model("Cart", CartSchema);