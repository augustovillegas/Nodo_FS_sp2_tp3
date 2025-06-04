import {
  buscarSuperheroesPorAtributo,
  obtenerSuperheroePorId,
  obtenerSuperheroesMayoresDe30,
  obtenerTodosLosSuperheroes,
} from "../services/superheroesService.mjs";
import {
  renderizarListaSuperheroes,
  renderizarSuperheroe,
} from "../views/responseView.mjs";

export const obtenerSuperheroePorIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const superheroe = await obtenerSuperheroePorId(id);
    if (!superheroe) {
      return res.status(404).send({ mensaje: "Superhéroe no encontrado" });
    }

    const superheroeFormateado = renderizarSuperheroe(superheroe);
    res.status(200).json(superheroeFormateado);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al obtener el superhéroe",
      error: error.message,
    });
  }
};

export const obtenerTodosLosSuperheroesController = async (req, res) => {
  try {
    const superheroes = await obtenerTodosLosSuperheroes();
    const superheroesFormateados = renderizarListaSuperheroes(superheroes);
    res.status(200).json(superheroesFormateados);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al obtener los superhéroes",
      error: error.message,
    });
  }
};

export const buscarSuperheroesPorAtributoController = async (req, res) => {
  try {
    const { atributo, valor } = req.params;
    const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
    if (superheroes.length === 0) {
      return res
        .status(400)
        .send({ mensaje: "No se encontraron superhéroes con ese atributo" });
    }

    const superheroesFormateados = renderizarListaSuperheroes(superheroes);
    res.status(200).json(superheroesFormateados);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al buscar los superhéroes",
      error: error.message,
    });
  }
};

export const obtenerSuperheroesMayoresDe30Controller = async (req, res) => {
  try {
    const superheroes = await obtenerSuperheroesMayoresDe30();
    if (superheroes.length === 0) {
      return res
        .status(404)
        .send({ mensaje: "No se encontraron superheroes mayores de 30 años" });
    }

    const superheroesFormateados = renderizarListaSuperheroes(superheroes);
    res.status(200).json(superheroesFormateados);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al obtener superheroes mayores de 30 años",
      error: error.message,
    });
  }
};
