const addDay = (date, days) => {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export default addDay;