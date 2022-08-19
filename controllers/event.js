const { response } = require("express");
const Event = require("../models/Event");

const getEvents = async(req, res = response) => {
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

const updateEvent = (req, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: "updateEvent",
  });
};

const deleteEvent = (req, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: "delete Event",
  });
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
