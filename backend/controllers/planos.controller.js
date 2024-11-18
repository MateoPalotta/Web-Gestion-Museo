const db = require('../config/db.config');
const multer = require('multer');
const path = require('path');

// Configuración de multer para subida de archivos
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/planos/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: function(req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error("Error: Solo se permiten archivos de imagen!"));
    }
}).single('plano');

exports.getAllPlanos = async (req, res) => {
    try {
        const [planos] = await db.query('SELECT * FROM planos ORDER BY fecha_creacion DESC');
        res.json(planos);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getPlano = async (req, res) => {
    try {
        const [plano] = await db.query('SELECT * FROM planos WHERE id = ?', [req.params.id]);
        if (plano.length === 0) {
            return res.status(404).send({ message: "Plano no encontrado" });
        }
        res.json(plano[0]);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.uploadPlano = (req, res) => {
    upload(req, res, async function(err) {
        if (err) {
            return res.status(500).send({ message: err.message });
        }

        if (!req.file) {
            return res.status(400).send({ message: "Por favor sube un archivo" });
        }

        try {
            const { nombre, descripcion } = req.body;
            const archivo_url = req.file.filename;

            const [result] = await db.query(
                'INSERT INTO planos (nombre, descripcion, archivo_url) VALUES (?, ?, ?)',
                [nombre, descripcion, archivo_url]
            );

            res.status(201).json({
                message: "Plano subido correctamente",
                id: result.insertId,
                archivo_url: archivo_url
            });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
};

exports.deletePlano = async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM planos WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "Plano no encontrado" });
        }
        res.json({ message: "Plano eliminado correctamente" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}; 