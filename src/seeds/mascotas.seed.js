const mongoose = require("mongoose");

const mongoDb = "mongodb+srv://root:VlKxKs9jSU5t8Dnz@cluster0.te3q9.mongodb.net/Protectora?retryWrites=true&w=majority";
const mascotaSchema = require("../api/mascotas/mascotas.model");
const mascota=[
  {
    "nombre":"pepo",
    "foto":"",
    "localidad": "Getafe",
    "localizacion":"",
    "sexo":"macho",
    "tamaño":"",
    "especie":"cerdo vietnamita",
    "nacimiento":"",
    "peso":"",
    "personalidad":"",
    "historia":"",
    "vacunado":true,
    "desparasitado":true,
    "sano":true,
    "esterelizado":true,
    "identificado":true,
    "microchip":true,
    "requisitosAdopcion":"",
    "comentarios":"",
    "precio":"",
    "envio":"",
    "estadoAdopcion":"",
},

];
const mascotaDocuments = mascota.map((mascota) => new mascotaSchema(mascota));

mongoose
  .connect(mongoDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const allMascota = await mascotaSchema.find();
    if (allMascota.length) {
      await mascotaSchema.collection.drop();
    }
  })
  .catch((err) => console.log(`Error deleting mascotas: ${err}`))
  .then(async () => {
    await mascotaSchema.insertMany(mascotaDocuments);
    console.log("mascotas successfully created");
  })
  .catch((err) => console.log(`Error creating mascotas: ${err}`))
  .finally(() => mongoose.disconnect());