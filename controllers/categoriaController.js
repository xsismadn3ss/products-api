import { Categoria, Producto } from "../models";
import { request, response } from "express";

async function get_all(req = request, res = response) {
  try {
    const categorias = await Categoria.findAll({
      where: {
        activo: true,
      },
    });
    if (!categorias)
      return res.status(404).json({ message: "No se encontraron resultados" });
    return res.status(200).json(categorias);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Se produjo un error al obtener las categorias" });
  }
}

async function get_by_pk(req = request, res = response) {
  const { id } = req.params;
  try {
    const categoria = await Categoria.findOne({
      where: {
        activo: true,
        id: id,
      },
    });
    if (!categoria)
      return res.status(404).json({ message: "No se encontraron resultados" });
    return res.status(200).json(categoria);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Se produjo un error al obtener la categoria" });
  }
}

async function create(req = request, res = response) {
  const { nombre } = req.body;
  if (!nombre)
    return res.status(400).json({ message: "el nombre es requerido" });
  try {
    const categoria = await Categoria.create({ nombre });
    return res.status(201).json({ message: "categoria creada con exito" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "No se pudo crear la categoria, ha sucedido un error" });
  }
}

async function update(req = request, res = response) {
  const { id } = req.params;
  const { nombre } = req.body;
  if (!nombre)
    return res.status(400).json({ message: "el nombre es requerido" });
  try {
    const categoria = await Categoria.findOne({
      where: {
        activo: true,
        id,
      },
    });
    if (!categoria) return res.json({ message: "esta categoria no existe" });
    categoria.nombre = nombre;
    categoria.save();
    return res.json({ message: "categoria actualizada con exito" });
  } catch (error) {
    return res.status(500).json({ message: "no se pudo actualizar" });
  }
}

async function onDelete(req = request, res = response) {
  const { id } = request.params;
  try {
    const categoria = await Categoria.findOne({
      where: {
        activo: true,
        id,
      },
    });
    if (!categoria) return res.json({ message: "esta categoria no existe" });
    categoria.activo = false;
    categoria.save();
    return res.json({ message: "categiria eliminada" });
  } catch (error) {
    return res.json({ message: "no pudoo eliminar la categoria" }).status(500);
  }
}

module.exports = {
  get_all,
  get_by_pk,
  create,
  update,
  onDelete,
};
