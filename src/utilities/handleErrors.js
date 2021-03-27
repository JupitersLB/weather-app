const handleErrors = response => {
  if (!response.ok) {
    console.log(response)
    throw Error(response.statusText);
  }
  return response.json();
}

export default handleErrors;
