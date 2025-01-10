const { Producto } = require("../models");
const { request, response } = require("express");

async function get_all(req, res) {
  try {
    const productos = await Producto.findAll({
      where: {
        activo: true,
      },
    });
    if (!productos)
      return res.status(404).json({ message: "No se encontraron resultado" });
    return res.status(200).json(productos);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Se produjo un error al obtener los productos" });
  }
}

async function get_by_pk(req, res) {
  const { id } = req.params;
  try {
    const producto = await Producto.findOne({
      where: {
        activo: true,
        id,
      },
    });
    if (!producto)
      return res.status(404).json({ message: "No se ha encontrado" });
    return res
      .status(200)
      .json({ message: "producto encontrado", producto: producto });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "se produjo un error al obtener el producto" });
  }
}

async function get_by_cat_id(req, res) {
  const { id } = req.params;
  try {
    const producto = await Producto.findAll({
      where: {
        activo: true,
        idCategoria: id,
      },
    });
    if (!producto)
      return res.status(404).json({ message: "No se ha encontrado" });
    return res
      .status(200)
      .json({ message: "producto encontrado", producto: producto });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "se produjo un error al obtener el producto" });
  }
}

async function create(req = request, res = response) {
  try {
    const { nombre, descripcion, precio, idCategoria } = req.body;
    if (!nombre || !descripcion || !precio || !idCategoria) {
      return res.status(400).json({
        message: "Llena los campos requeridos",
        fields: ["nombre", "descirpcion", "precio", "idCategoria"],
      });
    }
    const producto = Producto.create({
      nombre,
      descripcion,
      precio,
      idCategoria,
    });
    return res
      .status(201)
      .json({ message: "creado con exito", producto: producto });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "se produjo un error al crear el producto" });
  }
}

async function update(req, res) {
  const { id } = req.params;
  const { nombre, descripcion, precio, idCategoria } = req.body;
  if (!nombre || !descripcion || !precio || !idCategoria) {
    return res.status(400).json({
      message: "Llena los campos requeridos",
      fields: ["nombre", "descirpcion", "precio", "idCategoria"],
    });
  }
  try {
    const producto = await Producto.findAll({
      where: {
        activo: true,
        id,
      },
    });
    if (!producto)
      return res.status(404).json({ message: "No se ha encontrado" });
    producto.nombre = nombre;
    producto.descripcion = descripcion;
    producto.precio = precio;
    producto.idCategoria = idCategoria;
    return res.status(200).json({
      message: "actualizao con exito",
      producto: producto,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "se produjo un error al actualizar el producto" });
  }
}

async function on_delete(req, res) {
  const { id } = req.params;
  try {
    const producto = await Producto.findAll({
      where: {
        activo: true,
        id,
      },
    });
    if (!producto)
      return res.status(404).json({ message: "No se ha encontrado" });
    producto.avtivo = false;
    return res.status(200).json({ message: "producto eliminado" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "se produjo un error al eliminar el producto" });
  }
}

module.exports = {
  get_all,
  get_by_pk,
  get_by_cat_id,
  create,
  update,
  on_delete,
};
