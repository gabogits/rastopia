export const getFullDate = (value) => {
  var arrayMonths = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  var arrayDays = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];

  const date = new Date(parseInt(value));
  var dl = date.getDay();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();
  return `${arrayDays[dl]} ${d}, de ${arrayMonths[m]} del ${y}`;
};

export const itemsBag = (cart) => {
  let numberItems = 0;
  cart.map((item) => {
    numberItems = numberItems + item.quantity;
  });
  return numberItems;
};

export const PRICE_INIT_VALUE = 5000;
export const SHIPMENT_VALUE = 80;

export const quantityValidation = (quantity, size, numItem) => {
  const available = quantity.find((item) => item.size === size);
  let error;
  if (!available) {
    error = `Talla ${size} agotada`;
  }

  if (available && numItem > available?.quantity) {
    error = `Solo tenemos ${available?.quantity} piezas disponibles de la talla ${size}`;
  }
  return error;
};
