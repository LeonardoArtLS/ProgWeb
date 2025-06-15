const { query } = require("../config/db");

class Curso {
  static async getAll() {
    const result = await query(`
      SELECT id as codigo, sigla, descricao, id_coordenador, nome 
      FROM public.cursos
    `);
    return result.rows;
  }

  static async getById(id) {
    const result = await query(`
      SELECT id as codigo, sigla, descricao, id_coordenador, nome 
      FROM public.cursos 
      WHERE id = $1
    `, [id]);
    return result.rows;
  }

  static async insert({ sigla, descricao, id_coordenador, nome }) {
    const result = await query(`
      INSERT INTO public.cursos (sigla, descricao, id_coordenador, nome)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [sigla, descricao, id_coordenador, nome]);
    return result.rows[0];
  }

  static async update(id, sigla, descricao, id_coordenador, nome) {
    const result = await query(`
      UPDATE public.cursos 
      SET sigla = $2, descricao = $3, id_coordenador = $4, nome = $5
      WHERE id = $1
      RETURNING *
    `, [id, sigla, descricao, id_coordenador, nome]);
    return result.rows[0];
  }

  static async delete(id) {
    const result = await query(`
      DELETE FROM public.cursos 
      WHERE id = $1 
      RETURNING *
    `, [id]);
    return result.rows[0];
  }
}

module.exports = Curso;
