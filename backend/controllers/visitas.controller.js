const db = require('../config/db.config');

exports.getAllVisitas = async (req, res) => {
  try {
    const [visitas] = await db.query(
      'SELECT * FROM visitas_guiadas ORDER BY id DESC'
    );
    res.json(visitas);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getVisita = async (req, res) => {
  try {
    const [visita] = await db.query(
      'SELECT * FROM visitas_guiadas WHERE id = ?',
      [req.params.id]
    );
    
    if (visita.length === 0) {
      return res.status(404).send({ message: "Visita guiada no encontrada" });
    }
    
    res.json(visita[0]);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.createVisita = async (req, res) => {
  try {
    const { titulo, descripcion, duracion, recorrido, max_personas } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO visitas_guiadas (titulo, descripcion, duracion, recorrido, max_personas) VALUES (?, ?, ?, ?, ?)',
      [titulo, descripcion, duracion, recorrido, max_personas]
    );
    
    res.status(201).json({
      message: "Visita guiada creada correctamente",
      id: result.insertId
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.updateVisita = async (req, res) => {
  try {
    const { titulo, descripcion, duracion, recorrido, max_personas } = req.body;
    
    const [result] = await db.query(
      'UPDATE visitas_guiadas SET titulo = ?, descripcion = ?, duracion = ?, recorrido = ?, max_personas = ? WHERE id = ?',
      [titulo, descripcion, duracion, recorrido, max_personas, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Visita guiada no encontrada" });
    }
    
    res.json({ message: "Visita guiada actualizada correctamente" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.deleteVisita = async (req, res) => {
  try {
    const [result] = await db.query(
      'DELETE FROM visitas_guiadas WHERE id = ?',
      [req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Visita guiada no encontrada" });
    }
    
    res.json({ message: "Visita guiada eliminada correctamente" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}; 