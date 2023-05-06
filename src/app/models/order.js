const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const slug = require("mongoose-slug-generator");
const AutoIncrement = require('mongoose-sequence')(mongoose);
mongoose.set('useCreateIndex', true);

const OrderSchema = new Schema(
    {
        id_customer: { type: Number },
        name_customer: { type: String },
        address: { type: String },
        phone: { type: String },
        total_order: { type: Number },
        details: { type: Array }
    },
    {
        timestamps: true,
    }
)
//tăng id
OrderSchema.plugin(AutoIncrement, { inc_field: 'order_ID' });

module.exports = mongoose.model("Order", OrderSchema);