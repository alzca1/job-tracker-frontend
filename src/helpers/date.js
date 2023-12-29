export const formatDate = (dateProvided) => {
  if (!dateProvided) {
    return "N/A";
  }

  const date = new Date(dateProvided);

  const dia = date.getDate().toString().padStart(2, "0"); // Obtiene el día y añade un cero si es necesario
  const mes = (date.getMonth() + 1).toString().padStart(2, "0"); // Obtiene el mes (se suma 1 porque los meses van de 0 a 11) y añade un cero si es necesario
  const anio = date.getFullYear();
  const horas = date.getHours().toString().padStart(2, "0"); // Obtiene las horas y añade un cero si es necesario
  const minutos = date.getMinutes().toString().padStart(2, "0"); // Obtiene los minutos y añade un cero si es necesario

  return `${dia}/${mes}/${anio} ${horas}:${minutos}`;
};
