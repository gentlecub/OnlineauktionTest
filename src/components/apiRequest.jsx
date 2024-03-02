async function apiRequest(url, optionsObj, errMsg) {
  try {
    const response = await (url, optionsObj)
    if(!response.ok) throw Error("Please reload the app")
  } catch (err) {
    errMsg = err.message;
  } finally {
    return errMsg
  }
  
} 

export default apiRequest