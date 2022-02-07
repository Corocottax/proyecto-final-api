const Mascota = require("./mascotas.model");
const { setError } = require("../../utils/error/error");
const { deleteFile } = require("../../middlewares/deleteFile");

const postNewMascota = async (req, res, next) => {
  try {
    const newMascota = new Mascota()
    newMascota.nombre = req.body.nombre 
    if (req.file) {
      newMascota.photo = req.file.path;
    }
    newMascota.localizacon = req.body.localizacon 
    newMascota.sexo = req.body.sexo 
    newMascota.tamaño = req.body.tamaño 
    newMascota.especie = req.body.especie 
    newMascota.nacimiento = req.body.nacimiento 
    newMascota.peso = req.body.peso 
    newMascota.personalidad = req.body.personalidad 
    newMascota.historia = req.body.historia 
    newMascota.vacunado = req.body.vacunado 
    newMascota.desparasitado = req.body.desparasitado 
    newMascota.sano = req.body.sano 
    newMascota.esterilizado = req.body.esterilizado 
    newMascota.identificado = req.body.identificado 
    newMascota.microchip = req.body.microchip 
    newMascota.requisitosAdopcion = req.body.requisitosAdopcion 
    newMascota.comentarios = req.body.comentarios 
    newMascota.precio = req.body.precio 
    newMascota.envio = req.body.envio 

    const mascotaDB = await newMascota.save();
    return res.status(201).json(mascotaDB);
  } catch (error) {
    return next(error);
  }
};


const patchMascota = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patchMascota = new Mascota(req.body);
    patchMascota._id = id;
    const MascotaDB = await Mascota.findByIdAndUpdate(id, patchMascota);
    if (MascotaDB.foto) {
      deleteFile(MascotaDB.foto);
    }
    if (req.file) {
      patchMascota.foto = req.file.path;
    }
    if (!MascotaDB) {
      return next(setError(404, "Mascota not found"));
    }
    return res.status(200).json({ new: patchMascota, old: MascotaDB });
  } catch (error) {
    return next(setError(500, "Mascota cant be replaced"));
  }
};

const getMascota = async (req, res, next) => {
  try {
    const { id } = req.params;
    const mascotaDB = await Mascota.findById(id);
    if (!mascotaDB) {
      return next(setError(404, "Mascota not found"));
    }
    return res.status(200).json(mascotaDB);
  } catch (error) {
    return next(setError(404, "Mascota server fail"));
  }
};
const getAllMascota = async (req, res, next) => {
  try {
    const mascotaDB = await Mascota.find();
    return res.status(200).json(mascotaDB);
  } catch (error) {
    return next(setError(404, "Mascota server fail"));
  }
};

const deleteMascota = async (req, res, next) => {
  try {
    const { id } = req.params;
    const mascotaDB = await Mascota.findOneAndDelete({ id: id });

    if (!mascotaDB) {
      return next(setError(404, "Error borrando mascota"));
    }
    if (mascotaDB.img) {
      deleteFile(mascotaDB.img);
    }
    return res.status(200).json(mascotaDB);
  } catch (error) {
    return next(setError(500, "Mascota no se puede borrar"));
  }
};

module.exports = {
  postNewMascota,
  patchMascota,
  getMascota,
  getAllMascota,
  deleteMascota,
};
