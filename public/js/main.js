//search form
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const notesContainer = document.querySelector("#notes-container");
const alertContainer = document.querySelector("#alert-container");
const originalContent = notesContainer.innerHTML;
searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = searchInput.value;
  if (query) {
    let response;
    if (window.location.pathname === "/trash") {
      response = await fetch(`/search-trash?query=${query}`);
    } else if (window.location.pathname === "/favorites") {
      response = await fetch(`/search-favorites?query=${query}`);
    } else {
      response = await fetch(`/search?query=${query}`);
    }
    const results = await response.text();
    if (results === "Nothing found") {
      const alert = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        ${results}
      </div>`;
      alertContainer.innerHTML = alert;
    } else {
      notesContainer.innerHTML = results;
    }
  } else {
    notesContainer.innerHTML = originalContent;
  }
});


searchInput.addEventListener("input", () => {
  if (!searchInput.value) {
    notesContainer.innerHTML = originalContent;
    const alert = alertContainer.querySelector(".alert");
    if (alert) {
      alert.remove();
    }
  }
});



//confirm before delete all
const deleteAllForm = document.querySelector("#delete-all-form");
if (deleteAllForm) {
  deleteAllForm.addEventListener("submit", (event) => {
    const confirmed = confirm("Are you sure you want to delete all notes?");
    if (!confirmed) {
      event.preventDefault();
    }
  });
}



// dark mode
const moonButton = document.querySelector(".fa-solid.fa-moon");
const navbarTogglerIcon = document.querySelector(".custom-navbar .navbar-toggler-icon");
let darkMode = localStorage.getItem("darkMode") === "true";

const enableDarkMode = () => {
  document.documentElement.style.setProperty("--background-color", "#0a1c2c");
  document.documentElement.style.setProperty("--text-color", "white");
  document.documentElement.style.setProperty("--note-background-color", "#32475b");
  document.documentElement.style.setProperty("--note-text-color", "white");
  document.documentElement.style.setProperty("--note-border-color", "transparent");
  document.documentElement.style.setProperty("--note-divider-color", "#ccc");
  document.documentElement.style.setProperty("--hr-color", "white");
  document.documentElement.style.setProperty("--navbar-background-color", "#343a40");
  document.documentElement.style.setProperty("--navbar-text-color", "white");
  document.documentElement.style.setProperty("--note-box-shadow", "0 0 1px white");
  document.documentElement.style.setProperty("--modal-background-color", "#0a1c2c");
  document.documentElement.style.setProperty("--modal-border-color", "#ccc");
  document.documentElement.style.setProperty("--modal-input-background-color", "#32475b");
  document.documentElement.style.setProperty(
    "--modal-input-placeholder-color",
    "#ccc"
  );
};

const disableDarkMode = () => {
  document.documentElement.style.setProperty("--background-color", "#f2f3f4");
  document.documentElement.style.setProperty("--text-color", "black");
  document.documentElement.style.setProperty("--note-background-color", "white");
  document.documentElement.style.setProperty("--note-text-color", "black");
  document.documentElement.style.setProperty("--note-border-color", "#ccc");
  document.documentElement.style.setProperty("--note-divider-color", "#ccc");
  document.documentElement.style.setProperty("--hr-color", "black");
  document.documentElement.style.setProperty("--navbar-background-color", "#f8f9fa");
  document.documentElement.style.setProperty("--navbar-text-color", "black");
  document.documentElement.style.setProperty("--note-box-shadow", "-5px -5px 8px #ccc");
  document.documentElement.style.setProperty("--modal-background-color", "white");
  document.documentElement.style.setProperty("--modal-border-color", "#dee2e6");
  document.documentElement.style.setProperty("--modal-input-background-color", "white");
  document.documentElement.style.setProperty(
    "--modal-input-placeholder-color",
    "#6c757d"
  );
};

if (darkMode) {
  enableDarkMode();
} else {
  disableDarkMode();
}

moonButton.addEventListener("click", () => {
  darkMode = !darkMode;
  localStorage.setItem("darkMode", darkMode);
  if (darkMode) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});


