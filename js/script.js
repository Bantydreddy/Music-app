const navBar = document.querySelector(".nav-bar");

  window.addEventListener("scroll", function () {
    const navTop = navBar.getBoundingClientRect().top;

    // If the nav bar has moved to the top or above
    if (navTop <= 0) {
      navBar.classList.add("scrolled");
    } else {
      navBar.classList.remove("scrolled");
    }
  });