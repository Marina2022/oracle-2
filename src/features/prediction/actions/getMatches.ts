//getMatches

'use server'

export const getMatches = async (filters = "") => {

  console.log("filters = ", filters)

  try {
    let url = `${process.env.API_URL}/matches`
    if (filters) url = url + "?" +  filters

    console.log("url = ", url)

    const res = await fetch(url);

    if (!res.ok) {
      let errorMessage = `Не удалось загрузить матчи - ${res.status} `;
      console.log(errorMessage)
      console.log("Ответ: ", res)
      return {error: errorMessage, errorStatus: res.status};
    }

    return await res.json();

  } catch (err) {
    console.error('Ошибка getMatches:', err);
    return {error: err instanceof Error ? err.message : 'Неизвестная ошибка'};
  }
}