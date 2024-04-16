const Foto = require('../models/Foto')


async function addFoto(foto) {
    const newFoto = await Foto.create(foto);

    return newFoto
}


function deleteFoto(id) {
    return Foto.deleteOne({ _id: id })
}

async function getFoto() {
    return Foto.find();
}

module.exports = {
    addFoto: addFoto,
    deleteFoto: deleteFoto,
    getFoto: getFoto,
}