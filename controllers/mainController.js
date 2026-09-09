const { Usuario, Pedido, sequelize } = require('../models');

// Controlador para la ruta / (página de inicio, vista dinámica)
// Renderiza views/index.hbs pasándole datos para las variables {{titulo}} y {{mensaje}}
const getHome = (req, res) => {
  res.render('index', {
    titulo: 'TP Integrador - Alkemy',
    mensaje: 'Servidor Node.js y Express funcionando correctamente.'
  });
};

// Controlador para la ruta /status
// Responde con un JSON indicando que el servidor está activo
const getStatus = (req, res) => {
  res.json({
    status: 'ok',
    message: 'Servidor funcionando correctamente',
    timestamp: new Date().toISOString()
  });
};

const getUsuariosORM = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json({
      status: 'ok',
      message: 'Usuarios obtenidos con Sequelize',
      data: usuarios
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener usuarios',
      data: null
    });
  }
};

const getUsuarioConPedidos = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      include: Pedido
    });

    if (!usuario) {
      return res.status(404).json({
        status: 'error',
        message: 'Usuario no encontrado',
        data: null
      });
    }

    res.json({
      status: 'ok',
      message: 'Usuario con sus pedidos obtenido correctamente',
      data: usuario
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener usuario con pedidos',
      data: null
    });
  }
};

const crearPedido = async (req, res) => {
  try {
    const { producto, cantidad, total, usuarioId } = req.body;

    const nuevoPedido = await Pedido.create({
      producto,
      cantidad,
      total,
      usuarioId
    });

    res.status(201).json({
      status: 'ok',
      message: 'Pedido creado correctamente',
      data: nuevoPedido
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al crear pedido',
      data: null
    });
  }
};

const eliminarPedido = async (req, res) => {
  try {
    const pedido = await Pedido.findByPk(req.params.id);

    if (!pedido) {
      return res.status(404).json({
        status: 'error',
        message: 'Pedido no encontrado',
        data: null
      });
    }

    await pedido.destroy();

    res.json({
      status: 'ok',
      message: 'Pedido eliminado correctamente',
      data: null
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al eliminar pedido',
      data: null
    });
  }
};

const crearUsuarioConPedido = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { nombre, correo, edad, producto, cantidad, total } = req.body;

    // Primera acción: crear el usuario
    const nuevoUsuario = await Usuario.create(
      { nombre, correo, edad },
      { transaction: t }
    );

    // Segunda acción: crear el pedido asociado
    const nuevoPedido = await Pedido.create(
      { producto, cantidad, total, usuarioId: nuevoUsuario.id },
      { transaction: t }
    );

    // Si ambas acciones salieron bien, confirmamos los cambios
    await t.commit();

    res.status(201).json({
      status: 'ok',
      message: 'Usuario y pedido creados correctamente (transacción exitosa)',
      data: { usuario: nuevoUsuario, pedido: nuevoPedido }
    });
  } catch (error) {
    // Si algo falla, revertimos todo
    await t.rollback();
    console.error('Error en la transacción, se hizo rollback:', error.message);

    res.status(500).json({
      status: 'error',
      message: 'Error al crear usuario y pedido, se revirtieron los cambios',
      data: null
    });
  }
};

// Exportamos la función para poder usarla en las rutas
module.exports = { getHome, getStatus, getUsuariosORM, getUsuarioConPedidos, crearPedido, eliminarPedido, crearUsuarioConPedido };