const mongoose = require('mongoose')


const mascotaSchema = new mongoose.Schema({
    nombre: { type: String, trim: true },
    foto: { type: String, trim: true },
    localizacion: { type: String, trim: true},
    sexo: { type: String, trim: true},
    tamaño: { type: String, trim: true},
    especie: { type: String, trim: true},
    nacimiento: { type: String, trim: true},
    peso: { type: Number, trim: true},
    personalidad: [{ type: String, trim: true}],
    historia: { type: String, trim: true},
    vacunado: { type: Boolean, trim: true},
    desparasitado: { type: Boolean, trim: true},
    sano: { type: Boolean, trim: true},
    esterilizado: { type: Boolean, trim: true},
    idenfificado: { type: Boolean, trim: true},
    microchip: { type: Boolean, trim: true},
    requisitosAdopcion: { type: String, trim: true},
    comentarios: { type: String, trim: true},
    precio: { type: String, trim: true},
    envio: { type: String, trim: true},
    estadoAdopcion: { type: String, trim: true}
}, { timestamps: true, collection: 'pets'})


const Mascota = mongoose.model('mascotas', mascotaSchema)
module.exports = Mascota