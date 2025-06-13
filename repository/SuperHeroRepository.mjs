import { SuperHero } from "../models/superheroe.mjs";
import { IRepository } from "./IRepository.mjs";

class SuperHeroRepository extends IRepository {
  async obtenerPorId(id) {
    return await SuperHero.findById(id);
  }

  async obtenerTodos() {
    return await SuperHero.find({});
  }

  async buscarPorAtributo(atributo, valor) {
    const esNumero = !isNaN(valor);
    const expresion = new RegExp(valor, "i");

    const filtro = {
      [atributo]: esNumero ? Number(valor) : { $regex: expresion },
    };

    return await SuperHero.find(filtro);
  }

  async obtenerMayoresDe30() {
    return await SuperHero.find({ edad: { $gt: 30 } });
  }
}

export default new SuperHeroRepository();
