// thông báo
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));

  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  const btnCloseAlert = showAlert.querySelector("[close-alert]");
  btnCloseAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}
// end thông báo