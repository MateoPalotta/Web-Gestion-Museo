const db = require('../config/db.config');

exports.getAllExposiciones = async (req, res) => {
  try {
    const [exposiciones] = await db.query(
      'SELECT * FROM exposiciones ORDER BY fecha_inicio DESC'
    );
    res.json(exposiciones);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getExposicion = async (req, res) => {
  try {
    const [exposicion] = await db.query(
      'SELECT * FROM exposiciones WHERE id = ?',
      [req.params.id]
    );
    
    if (exposicion.length === 0) {
      return res.status(404).send({ message: "Exposición no encontrada" });
    }
    
    res.json(exposicion[0]);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.createExposicion = async (req, res) => {
  try {
    const { titulo, descripcion, fecha_inicio, fecha_fin, estado } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO exposiciones (titulo, descripcion, fecha_inicio, fecha_fin, estado) VALUES (?, ?, ?, ?, ?)',
      [titulo, descripcion, fecha_inicio, fecha_fin, estado]
    );
    
    res.status(201).json({
      message: "Exposición creada correctamente",
      id: result.insertId
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.updateExposicion = async (req, res) => {
  try {
    const { titulo, descripcion, fecha_inicio, fecha_fin, estado } = req.body;
    
    const [result] = await db.query(
      'UPDATE exposiciones SET titulo = ?, descripcion = ?, fecha_inicio = ?, fecha_fin = ?, estado = ? WHERE id = ?',
      [titulo, descripcion, fecha_inicio, fecha_fin, estado, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Exposición no encontrada" });
    }
    
    res.json({ message: "Exposición actualizada correctamente" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.deleteExposicion = async (req, res) => {
  try {
    const [result] = await db.query(
      'DELETE FROM exposiciones WHERE id = ?',
      [req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Exposición no encontrada" });
    }
    
    res.json({ message: "Exposición eliminada correctamente" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}; 