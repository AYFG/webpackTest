// const obj = {};

//전역으로 실행하면 어디서든 변경이 가능함
// function plus(a, b) {
//   return a + b;
// }

// obj.plus로 찾을 수 있다
// (() => {
//   function plus(a, b) {
//     return a + b;
//   }
//   obj.plus = plus;
// })();

export default function plus(a, b) {
  return a + b;
}
