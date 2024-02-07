let wrapper = document.querySelector(".slider-Wrapper");
let navItem = document.querySelectorAll(".nav-item");

navItem.forEach((item, index) => {
  item.addEventListener("click", () => {
    wrapper.style.transform = `translateX(${-100 * index}vw)`;
  });
});
