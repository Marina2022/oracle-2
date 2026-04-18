
// таймстэмп ->  22.02.2026
export function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000); // если timestamp в секундах

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}