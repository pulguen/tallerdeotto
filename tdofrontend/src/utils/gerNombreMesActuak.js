function getNombreMesActual() {
  const now = new Date();
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  return `${meses[now.getMonth()]} ${now.getFullYear()}`;
}
