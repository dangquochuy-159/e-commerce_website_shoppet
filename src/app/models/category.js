const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const slug = require("mongoose-slug-generator");
const AutoIncrement = require('mongoose-sequence')(mongoose);
mongoose.set('useCreateIndex', true);

const CategorySchema = new Schema(
    {
        name: { type: String },
        slug: { type: String, slug: "name", unique: true },
    },
    {
        timestamps: true,
    }
)
//tăng id
CategorySchema.plugin(AutoIncrement, { inc_field: 'category_ID' });
//add pluggin slug thông qua thư viện
mongoose.plugin(slug);

module.exports = mongoose.model("Category", CategorySchema);