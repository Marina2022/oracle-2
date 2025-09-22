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

