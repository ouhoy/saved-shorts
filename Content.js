function $(id, slectAll = false) {
  return slectAll ? document.querySelectorAll(id) : document.querySelector(id);
}

console.log("Yooo!");

let myBtns = $("#like-button");

// window.addEventListener("load", () => {
//   const likeBtns = $("#like-button");
//   const htmlMarkup = `<button> Hello</button>`;
//   console.log(myBtns);
//   //   likeBtns.insertAdjacentHTML("beforeEnd", htmlMarkup);
//   console.log("added");
// });

if (document.readyState !== "loading") {
  console.log("the btns ", $("#like-button"));
  console.log("gota wait");
  setTimeout(() => {
    console.log("the btns ", $("#like-button"));
  }, 5000);
} else {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("document was not ready, place code here");
    console.log(myBtns);
  });
}

function myInitCode() {}
