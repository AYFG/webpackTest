// import plus from "./plus.js";
// import "./style.css"

// console.log(plus(2, 3));
import "./style.css";
import rabbit from "./rabbit.png";
import bg from "./background.png";
// console.log(pw);

let env;

// module.exports의 mode가 development면 dev , production 이면 pro
if (process.env.NODE_ENV === "development") {
  env = dev;
} else {
  env = pro;
}

console.log(env);

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = `<img src="${bg}"/>`;
});
