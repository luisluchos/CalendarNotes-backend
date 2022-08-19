const { response } = require("express");
const Event = require("../models/Event");

const getEvents = async (req, res = response) => {
  //.populate, de user nos traemos el name, si no ponemos nada nos trae todos los campos de user
  const eventos = await Event.find().populate("user", "name");
  return res.json({
    ok: true,
    eventos,
  });
};

const createEvent = async (req, res = response) => {
  const evento = new Event(req.body);

  try {
    //add user to evento
    //we have uid becaus we pass through valita-jwt middleware
    evento.user = req.uid;
    //save at db
    const eventoGuardado = await evento.save();

    res.json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const updateEvent = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Event.findById(eventoId);
    console.log("evento", evento);
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ese msg",
      });
    }

    //evita ediatr un evento si no eres el propietario
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No es tu evento",
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const eventoActualizado = await Event.findByIdAndUpdate(eventoId, newEvent, { new: true });
    return res.status(200).json({
      ok: true,
      event: eventoActualizado,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "error, consulte al admin",
    });
  }
};

const deleteEvent = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Event.findById(eventoId);
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ese evento",
      });
    }
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No es tu evento",
      });
    }
    const deleteEvent = await Event.findByIdAndDelete(eventoId);

    return res.status(200).json({
      ok: true,
      event: deleteEvent,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "error, consulte al admin",
    });
  }
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
