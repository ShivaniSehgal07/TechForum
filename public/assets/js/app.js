const ALERT_TYPE_DANGER = "danger";
const API_POSTS_URL = "/posts";

const deletePostButtons = document.querySelectorAll(".delete-post-button");

const showAlert = (type, message, element) => {
  const alertElement = document.createElement("div");
  alertElement.className = `alert alert-${type}`;
  alertElement.role = "alert";
  alertElement.innerHTML = message;
  element.appendChild(alertElement);
};

const removeAlert = (element) => {
  const existingAlert = element.querySelector(".alert");
  if (existingAlert) {
    existingAlert.remove();
  }
};

const handleDeletePostButton = async function (e) {
  e.preventDefault();
  const alertSection = document.querySelector(".section-alerts");
  const postId = this.getAttribute("data-id");

  removeAlert(alertSection);

  try {
    const response = await fetch(`${API_POSTS_URL}/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { alertType, message } = await response.json();
    this.closest(".custom-block-topics-listing").remove();
    showAlert(alertType, message, alertSection);
  } catch (error) {
    showAlert(
      ALERT_TYPE_DANGER,
      "An error occurred while trying to delete the post.",
      alertSection
    );
  }
};

if (deletePostButtons) {
  deletePostButtons.forEach((button) => {
    button.addEventListener("click", handleDeletePostButton);
  });
}
