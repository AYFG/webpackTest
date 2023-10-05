module.exports = function myLoader(item) {
  console.log("test myLoader");
  return item.replace("console.log(',alert('");
};
