const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { validationPassword, validationEmail } = require('../../utils/validators/validators')
const { setError } = require('../../utils/error/error')

const userSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: true },
    photo: { type: String, trim: true},
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    age: { type: Number, trim: true, required: true},
    adresses: [{ type: String, trim: true}],
    favorites: [{ type: String, trim: true}],


}, { timestamps: true, collection: 'users'})

userSchema.pre("save", function (next) {
    if (!validationEmail(this.email)) { 
        return next(setError(400, "El email debe cumplir el patrón, ejemplo@ejemplo.com"))
    } if (!validationPassword(this.password)) {
        return next(setError(400, 'La contraseña no tiene los minimos requeridos - Debe contener 1 letra mayúscula, 1 letra minúscula, 1 número, 1 carácter especial y entre 8-12 caracteres.'))
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

const User = mongoose.model('users', userSchema)
module.exports = User