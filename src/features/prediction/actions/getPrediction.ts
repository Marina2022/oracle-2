'use server'

export const getPrediction = async (id: string) => {

  try {
    const res = await fetch(`${process.env.API_URL}/matches/${id}/predictions`);

    if (!res.ok) {
      let errorMessage = `Не удалось загрузить прогноз - ${res.status} `;
      console.log(errorMessage)
      console.log("Ответ: ", res)
      return {error: errorMessage, errorStatus: res.status};
    }

    return await res.json();

  } catch (err) {
    console.error('Ошибка getPrediction:', err);
    return {error: err instanceof Error ? err.message : 'Неизвестная ошибка'};
  }
}