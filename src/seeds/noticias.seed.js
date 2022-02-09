const mongoose = require("mongoose");

const mongoDB = "mongodb+srv://root:VlKxKs9jSU5t8Dnz@cluster0.te3q9.mongodb.net/Protectora?retryWrites=true&w=majority";
const noticiaSchema = require("../api/noticias/noticias.model");

const noticias = [
    {
        title: "¡Nuevo record!",
        img: "https://res.cloudinary.com/ddbvk5mrr/image/upload/v1644309114/noticias/DSGZA3ZL6WF6YOGZVDKO32LUSQ_fjly78.jpg",
        description: "¡Más de 50 peluditos rescatados! Muchas gracias a todos por hacer crecer esta web, juntos les buscaremos un hogar a todos. Un abrazo enorme! :)",
    },
    {
        title: "Queremos ayudar a todos.",
        img: "https://res.cloudinary.com/ddbvk5mrr/image/upload/v1644309114/noticias/drunk-y-dumbo-perros-adoptados_muzvhl.jpg",
        description: "¿Sabías que puedes adoptar una mascota de la forma más sencilla? ¡Nosotros te ayudamos! Vamos a encontrar al compañero que estás buscando. Puedes buscar por zonas y por mascota. ¡Es genial!",
    },
    {
        title: "Cómo cuidar a una mascota rescatada.",
        img: "https://res.cloudinary.com/ddbvk5mrr/image/upload/v1644309114/noticias/8430_e2qkmi.jpg",
        description: "Colaboramos con Blog Mascotas para traeros este estudio sobre cómo criar a un animal rescatado: 'https://www.desparasitaatumascota.es/blog/28/prepara-la-llegada-de-un-perro-adoptado-al-hogar'",
    },
    {
        title: "¡Hurra!",
        img: "https://res.cloudinary.com/ddbvk5mrr/image/upload/v1644309115/noticias/antes_y_despues_perros_adoptados_transformaciones_p_wqg8f1.png",
        description: "Nuestro peludito favorito, Lula, ¡ha conseguido un hogar! Desde aquí les deseamos mucha suerte para que Lula pueda volver a ser feliz.",
    },
    {
        title: "Se vende",
        img: "https://res.cloudinary.com/ddbvk5mrr/image/upload/v1644309114/noticias/363103-historia-opel-corsa_wup3va.jpg",
        description: "Vendo Opel Corsa blanco. Usado pero bien cuidado. Tiene tapicería blanca porque la carretera es mi escuela. Tubo de escape y filtro de aire modificados. Mejor ver.",
    },
    {
        title: "Siempre ayudando",
        img: "https://res.cloudinary.com/ddbvk5mrr/image/upload/v1644309114/noticias/perro-adoptado-830x553_qk8cnf.jpg",
        description: "Trabajamos para que no quede ningún peludito abandonado en ningún rincón. Si quieres colaborar, síguenos en las redes y difunde la información. ¡Muchas gracias!",
    },
    {
        title: "Bienvenida",
        img: "https://res.cloudinary.com/ddbvk5mrr/image/upload/v1644309115/noticias/antes_y_despues_perros_adoptados_transformaciones_p_wqg8f1.png",
        description: "¡Bienvenidos a nuestra web! Aquí podrás ver un catálogo con la ubicación de las mascotas que puedes adoptar. ¡Echa un ojo a nuestro buscador!",
    }
  ];

const NoticiasDocuments = noticias.map((noticia) => new noticiaSchema(noticia));

console.log(mongoDB);

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async () => {
    const allNoticias = await noticiaSchema.find();
    if (allNoticias.length) {
      await noticiaSchema.collection.drop();
    }
}).catch((err) => console.log(`Error makings news: ${err}`))
.then(async () => {
    await noticiaSchema.insertMany(NoticiasDocuments);
}).catch((err) => console.log(`Error makings news: ${err}`))
.finally(() => mongoose.disconnect());