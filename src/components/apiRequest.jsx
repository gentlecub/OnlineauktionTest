async function apiRequest(url, optionsObj, errMsg) {
  try {
    const response = await fetch(url, optionsObj);
    if (!response.ok) throw Error("Please reload the app");
    else {
      errMsg = response;
    }
  } catch (err) {
    errMsg = err.message;
  } finally {
    return errMsg;
  }
}

export default apiRequest;
