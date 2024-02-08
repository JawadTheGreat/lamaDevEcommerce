const products = [
  {
    id: 1,
    title: "Air Force",
    price: 119.99,
    colors: [
      {
        code: "black",
        img: "./assets/air.png",
      },
      {
        code: "darkblue",
        img: "./assets/air2.png",
      },
    ],
  },
  {
    id: 2,
    title: "Air Jordan",
    price: 149.99,
    colors: [
      {
        code: "lightgray",
        img: "./assets/jordan.png",
      },
      {
        code: "green",
        img: "./assets/jordan2.png",
      },
    ],
  },
  {
    id: 3,
    title: "Blazer",
    price: 109.99,
    colors: [
      {
        code: "lightgray",
        img: "./assets/blazer.png",
      },
      {
        code: "green",
        img: "./assets/blazer2.png",
      },
    ],
  },
  {
    id: 4,
    title: "Crater",
    price: 129.99,
    colors: [
      {
        code: "black",
        img: "./assets/crater.png",
      },
      {
        code: "lightgray",
        img: "./assets/crater2.png",
      },
    ],
  },
  {
    id: 5,
    title: "Hippie",
    price: 99.99,
    colors: [
      {
        code: "gray",
        img: "./assets/hippie.png",
      },
      {
        code: "black",
        img: "./assets/hippie2.png",
      },
    ],
  },
];
let wrapper = document.querySelector(".slider-Wrapper");
let navItem = document.querySelectorAll(".nav-item");
let choosenProduct = products[0];
const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

navItem.forEach((item, index) => {
  item.addEventListener("click", () => {
    //change the current slide
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    //change the choosen product
    choosenProduct = products[index];

    //change the choosen product details

    currentProductImg.src = choosenProduct.colors[0].img;
    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "$" + choosenProduct.price;

    //change the available product colors

    currentProductColors.forEach((color, index) => {
      color.style.backgroundColor = choosenProduct.colors[index].code;
    });
  });
});

//change shoe color

currentProductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    currentProductImg.src = choosenProduct.colors[index].img;
  });
});

//selecting shoe size

currentProductSizes.forEach((size, index) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((size, index) => {
      size.style.backgroundColor = "#fff";
      size.style.color = "#000";
    });
    size.style.backgroundColor = "#000";
    size.style.color = "#fff";
  });
});
