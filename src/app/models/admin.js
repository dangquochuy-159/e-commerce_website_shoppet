const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const slug = require("mongoose-slug-generator");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const autoIncrement = require('mongoose-auto-increment');
mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);


const AdminSchema = new Schema(
    {
        name: { type: String },
        user_name: { type: String },
        password: { type: String },
        image: { type: String },
        slug: { type: String, slug: "name", unique: true },
    },
    {
        timestamps: true,
    }
)
//tăng id mongoose-sequence
AdminSchema.plugin(AutoIncrement, { inc_field: 'admin_ID' });


//add pluggin slug thông qua thư viện
mongoose.plugin(slug);
let saltRounds = 10;
AdminSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, saltRounds, (err, hash) => {
            if (err) {
                return next(err);
            }
            this.password = hash;
            next();
        });
    } else {
        next();
    }
})
module.exports = mongoose.model("Admin", AdminSchema);