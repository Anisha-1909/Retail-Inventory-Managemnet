function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if (username === "admin" && password === "admin1234") {
    window.location.href = "index.html";
  } else {
    document.getElementById("error").innerText = "Invalid username or password";
  }
}
