// utils/formatDate.js

export function formatDate(dateInput) {
  const date = new Date(dateInput);

  // Controlar que la fecha sea válida
  if (isNaN(date)) return '';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JS van de 0 a 11
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
