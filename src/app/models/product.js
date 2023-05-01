const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const slug = require("mongoose-slug-generator");
const AutoIncrement = require('mongoose-sequence')(mongoose);
mongoose.set('useCreateIndex', true);

const ProductSchema = mongoose.Schema(
    {
        name: { type: String },
        des: { type: String },
        quantity: { type: Number },
        categoryID: { type: Number },
        price: { type: Number },
        salePrice: { type: Number },
        image: { type: String },
        slug: { type: String, slug: "name", unique: true },
    },
    {
        timestamps: true,
    }
)
//tăng id
ProductSchema.plugin(AutoIncrement, { inc_field: 'product_ID' });
//add pluggin slug thông qua thư viện
mongoose.plugin(slug);


module.exports = mongoose.model("Product", ProductSchema);



