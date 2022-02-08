const mongoose = require("mongoose");

const mongoDb = "mongodb+srv://root:VlKxKs9jSU5t8Dnz@cluster0.te3q9.mongodb.net/Protectora?retryWrites=true&w=majority";
const mascotaSchema = require("../api/mascota/mascota.model");
const mascota=[
  {
    "nombre":"pepo",
    "foto":"https://res.cloudinary.com/ddbvk5mrr/image/upload/v1644311828/mascotas/cerdo2_kezka1.jpg",
    "localizacion":"",
    "sexo":"macho",
    "tamaño":"pequeño",
    "especie":"cerdo vietnamita",
    "nacimiento":"03/12/2021",
    "peso":"2 kg",
    "personalidad":["bueno con los niños","gracioso","tímido","jugueton"],
    "historia":"Me llamo Pepo, era un cerdito muy bueno, pero comí cosas que no debería haber comido. Por eso llamaron a Godofredo para que me ponga a dieta",
    "vacunado":true,
    "desparasitado":true,
    "sano":true,
    "esterelizado":true,
    "identificado":true,
    "microchip":true,
    "requisitosAdopcion":"Espacio abierto en residencia",
    "comentarios":"",
    "precio":"150€",
    "envio":"Si se envia a otra ciudad a nivel Nacional",
    "users":[]
},
{
    "nombre":"gaia",
    "foto":"https://res.cloudinary.com/ddbvk5mrr/image/upload/v1644311829/mascotas/perro1_w0sx5z.jpg",
    "localizacion":"",
    "sexo":"hembra",
    "tamaño":"pequeña",
    "especie":"perro",
    "nacimiento":"09/12/2021",
    "peso":"3.5 kg",
    "personalidad":["divertida","sociable","atrevida","juguetona"],
    "historia":"Me llamo Gaia, soy una perrita muy sociable y mi madre perrita no puede mantenerme. Por eso llamaron a Autresia para que me haga un DNI y no me deporten",
    "vacunado":true,
    "desparasitado":true,
    "sano":true,
    "esterelizado":false,
    "identificado":true,
    "microchip":true,
    "requisitosAdopcion":"Apartamento de minimo 90 metros cuadrados",
    "comentarios":"",
    "precio":"120€",
    "envio":"No se envia a más de 30 km",
    "users":[]
},
{
    "nombre":"roger",
    "foto":"https://res.cloudinary.com/ddbvk5mrr/image/upload/v1644311827/mascotas/conejo1_tggbfa.jpg",
    "localizacion":"",
    "sexo":"macho",
    "tamaño":"pequeño",
    "especie":"conejo",
    "nacimiento":"09/01/2022",
    "peso":"0.8 kg",
    "personalidad":["divertido","sociable","atrevido","jugueton"],
    "historia":"Me llamo Roger, soy un conejo muy sociable y jugueton. Por eso llamaron a los Monty Python para que me sacaran en una de sus peliculas.",
    "vacunado":true,
    "desparasitado":true,
    "sano":true,
    "esterelizado":true,
    "identificado":true,
    "microchip":false,
    "requisitosAdopcion":"No hay requisitos para su adopción",
    "comentarios":"",
    "precio":"120€",
    "envio":"No se envia a más de 30 km",
    "users":[]
},
{
    "nombre":"puas",
    "foto":"https://res.cloudinary.com/ddbvk5mrr/image/upload/v1644311828/mascotas/erizo1_qhgiao.jpg",
    "localizacion":"",
    "sexo":"macho",
    "tamaño":"pequeño",
    "especie":"",
    "nacimiento":"09/01/2022",
    "peso":"0.8 kg",
    "personalidad":["introvertido","afilado","gracioso","jugueton"],
    "historia":"Me llamo Puas, soy un erizo pincho si me asustan. Por eso llamaron a Richard para que me cambie por una tortuga.",
    "vacunado":false,
    "desparasitado":true,
    "sano":true,
    "esterelizado":true,
    "identificado":true,
    "microchip":true,
    "requisitosAdopcion":"No hay requisitos para su adopción",
    "comentarios":"",
    "precio":"80€",
    "envio":"No se envia a más de 30 km",
    "users":[]
},
{
    "nombre":"Catty",
    "foto":"https://res.cloudinary.com/ddbvk5mrr/image/upload/v1644311828/mascotas/gato2_ixikci.jpg",
    "localizacion":"",
    "sexo":"hembra",
    "tamaño":"pequeña",
    "especie":"",
    "nacimiento":"11/01/2022",
    "peso":"0.8 kg",
    "personalidad":["adorable","revoltosa","graciosa","juguetona"],
    "historia":"Me llamo Catty, soy un gata muy bonita duermo y juego todo el dia. Por eso llamaron a Sofy para que me encuentre un hogar acogedor.",
    "vacunado":true,
    "desparasitado":true,
    "sano":true,
    "esterelizado":true,
    "identificado":false,
    "microchip":true,
    "requisitosAdopcion":"No hay requisitos para su adopción",
    "comentarios":"",
    "precio":"100€",
    "envio":"No se envia a más de 30 km",
    "users":[]
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