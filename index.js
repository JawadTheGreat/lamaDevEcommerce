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

//***shopping cart functionalities***

//opening and closing the cart
const cartIcon = document.querySelector(".cartIcon");
const cartSection = document.querySelector(".cartSection");
const closeCartBtn = document.querySelector(".closeCartBtn");

cartIcon.addEventListener("click", () => {
  cartSection.style.display = "flex";
});

closeCartBtn.addEventListener("click", () => {
  cartSection.style.display = "none";
});

//cart items counter function

function countCartItems() {
  let cartItemCounter = document.querySelector(".cartItemCounter");
  let cartRows = document.querySelectorAll(".cartRow");

  cartItemCounter.addEventListener("click", () => {
    cartSection.style.display = "flex";
  });

  if (cartRows.length > 1) {
    cartItemCounter.style.display = "flex";
    cartItemCounter.textContent = cartRows.length - 1;
  } else {
    cartItemCounter.style.display = "none";
  }
}

//removing items from the cart
let removeButtons = document.querySelectorAll(".removeBtn");
removeButtons.forEach((removeButton, index) => {
  removeButton.addEventListener("click", removeButtonClicked);
});
function removeButtonClicked(event) {
  let removeButton = event.target;
  removeButton.parentElement.parentElement.remove();
  updateCartTotal();
  countCartItems();
}

//tracking quantity input changes
let quantityInputs = document.querySelectorAll(".cartQuantityInput");
quantityInputs.forEach((quantityInputElement, index) => {
  quantityInputElement.addEventListener("change", cartInputChanged);
});

function cartInputChanged(event) {
  let quantityInput = event.target;
  if (isNaN(quantityInput.value) || quantityInput.value <= 0) {
    quantityInput.value = 1;
  }
  updateCartTotal();
}

//adding items to cart
document.querySelector(".productButton").addEventListener("click", (event) => {
  let button = event.target;
  let productImgSrc =
    button.parentElement.parentElement.querySelector(".productImg").src;
  let productTitle =
    button.parentElement.querySelector(".productTitle").textContent;
  let productPrice =
    button.parentElement.querySelector(".productPrice").textContent;

  addItemsToCart(productImgSrc, productTitle, productPrice);
  updateCartTotal();
  countCartItems();
});

function addItemsToCart(imgSrc, title, price) {
  let cartRow = document.createElement("div");
  cartRow.classList.add("cartRow");
  let cartItems = document.querySelector(".cartItems");
  let cartItemImages = cartItems.querySelectorAll(".cartItemImg");

  for (let i = 0; i < cartItemImages.length; i++) {
    if (cartItemImages[i].src === imgSrc) {
      alert("This item is already added.");
      return;
    }
  }

  let cartRowContent = `<div class="cartColumn cartItem">
                          <img src="${imgSrc}" alt="" class="cartItemImg" />
                          <span class="cartItemTitle">${title}</span>
                        </div>
                        <div class="cartColumn cartPrice">${price}</div>
                        <div class="cartColumn cartQuantity">
                          <input value="1" type="number" class="cartQuantityInput" />
                          <button type="button" class="removeBtn">REMOVE</button>
                        </div>
                        </div>`;

  cartRow.innerHTML = cartRowContent;
  cartItems.append(cartRow);
  cartRow
    .querySelector(".removeBtn")
    .addEventListener("click", removeButtonClicked);
  cartRow
    .querySelector(".cartQuantityInput")
    .addEventListener("change", cartInputChanged);
}

//purchase button functionalities
document
  .querySelector(".purchaseBtn")
  .addEventListener("click", purchaseButtonClicked);

function purchaseButtonClicked(event) {
  let cartRows = document.querySelectorAll(".cartRow");
  //first cartRow node will not be removed because those are cart headers
  if (cartRows.length > 1) {
    let i = cartRows.length - 1;

    while (i > 0) {
      cartRows[i].remove();
      i--;
    }
    alert("Thank you for your purchase");
    updateCartTotal();
    countCartItems();
  } else {
    alert("Your cart is empty");
  }
}

// calculating cart total
function updateCartTotal() {
  let total = 0;
  let cartRows = document.querySelectorAll(".cartRow");
  //we have to start from index = 1, otherwise we get null results because first elements are cart headers
  for (let i = 1; i < cartRows.length; i++) {
    let price = cartRows[i]
      .querySelector(".cartPrice")
      .textContent.replace("$", "");
    let quantity = cartRows[i].querySelector(".cartQuantityInput").value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.querySelector(".cartTotalPrice").textContent = "$" + total;
}
