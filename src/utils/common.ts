export const randomId = () => {
  return Math.random().toString(36)
}

export const formatParticipants = (count: number): string => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  let suffix = "участников"; // по умолчанию

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    suffix = "участников";
  } else if (lastDigit === 1) {
    suffix = "участник";
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    suffix = "участника";
  }
  return `${count} ${suffix}`;
}

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat('ru-RU').format(number)
}

export const getInitials = (fullName: string): string => {
  if (!fullName) return '';

  const words = fullName.trim().split(/\s+/); // разбиваем по пробелам
  if (words.length === 1) {
    // если одно слово, берем первую букву
    return words[0][0].toUpperCase();
  } else {
    // если два и больше слов, берем первые буквы первых двух
    return (words[0][0] + words[1][0]).toUpperCase();
  }
}



export function timeUntil(timestamp: number): string {
  const now = Date.now(); // текущее время в миллисекундах
  const target = timestamp * 1000; // таймстэмп в секундах -> миллисекунды
  const diff = target - now;

  if (diff <= 0) return "0 дней";

  const msInMinute = 60 * 1000;
  const msInHour = 60 * msInMinute;
  const msInDay = 24 * msInHour;
  const msInWeek = 7 * msInDay;
  const msInMonth = 30 * msInDay; // грубая оценка месяца

  if (diff >= msInMonth) {
    const months = Math.floor(diff / msInMonth);
    return `${months} ${getRussianPlural(months, 'месяц', 'месяца', 'месяцев')}`;
  } else if (diff >= msInWeek) {
    const weeks = Math.floor(diff / msInWeek);
    return `${weeks} ${getRussianPlural(weeks, 'неделя', 'недели', 'недель')}`;
  } else {
    const days = Math.floor(diff / msInDay);
    return `${days} ${getRussianPlural(days, 'день', 'дня', 'дней')}`;
  }
}

// Функция для склонения русских существительных
function getRussianPlural(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return few;
  return many;
}



export function isTimestampPast(timestamp: number):boolean {
  // Текущее время в секундах
  const now = Math.floor(Date.now() / 1000);
  return now > timestamp;
}
