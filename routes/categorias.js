const express = require("express");
const router = express.Router();
const {
  get_all,
  get_by_pk,
  create,
  update,
  onDelete,
} = require("../controllers/categoriaController");

router.get("/categorias", get_all);
router.get("/categorias/:id", get_by_pk);
router.post("/categorias", create);
router.post("/categorias/:id", update);
router.post("/categorias/:id", onDelete);

module.exports = router