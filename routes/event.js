/*
Rutas de events
host + /api/events
*/

const express = require("express");
const router = express.Router();
const { validateJWT } = require("../middlewares/validate-jwt");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { isDate } = require("../helpers/isDate");

const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/event");

//todasl las rutas paraám por el middleware validateJWT
// a partir de aquí será necesarrio validatetoken, si quremos tener una ruta pública, lo pondremos por encima de aquí

router.use(validateJWT);

router.get("/", getEvents);

router.post(
  "/",
  [
    check("title", "Títle required").not().isEmpty(),
    check("start", "Start required").custom(isDate),
    check("end", "End required").custom(isDate),
    validateFields,
  ],
  createEvent
);

router.put(
  "/:id",
  [
    check("title", "Títle required").not().isEmpty(),
    check("start", "Start required").custom(isDate),
    check("end", "End required").custom(isDate),
    validateFields,
  ],
  updateEvent
);

router.delete("/:id", deleteEvent);

module.exports = router;
