const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

eventSchema.method("toJSON", function () {
  //extaremos el __v y el _id de la tabla que se crea en moogo y lo reemplazamos por id cuando llamaos al método to json, no estamos cabiando la base de datos
  //this.toObject hace referencia al esquema de la tabla actual
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Event", eventSchema);
