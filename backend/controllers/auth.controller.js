const db = require('../config/db.config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const [users] = await db.query('SELECT * FROM usuarios WHERE username = ?', [username]);
    
    if (users.length === 0) {
      return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }

    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      id: user.id,
      username: user.username,
      nombre: user.nombre,
      rol: user.rol,
      token: token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, password, nombre } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Por defecto, los nuevos usuarios son visitantes
    const [result] = await db.query(
      'INSERT INTO usuarios (username, password, nombre, rol) VALUES (?, ?, ?, "visitante")',
      [username, hashedPassword, nombre]
    );
    
    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}; 