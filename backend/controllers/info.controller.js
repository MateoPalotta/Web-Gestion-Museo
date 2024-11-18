const db = require('../config/db.config');

exports.getInfo = async (req, res) => {
  try {
    const [info] = await db.query('SELECT * FROM museo_info LIMIT 1');
    res.json(info[0] || {});
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.updateInfo = async (req, res) => {
  try {
    const { nombre, descripcion, direccion, telefono, email, horario } = req.body;
    await db.query(
      'INSERT INTO museo_info (nombre, descripcion, direccion, telefono, email, horario) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE nombre=?, descripcion=?, direccion=?, telefono=?, email=?, horario=?',
      [nombre, descripcion, direccion, telefono, email, horario, nombre, descripcion, direccion, telefono, email, horario]
    );
    res.json({ message: "Información actualizada correctamente" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}; 