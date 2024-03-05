function NewUser(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const info = Object.fromEntries(data);
  fetch("/api/Users", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
}
export default NewUser;
