window.onload = function () {
  var obj = new Object();
  obj.code = "$$ErrorCode$$";
  obj.message = "$$ErrorMessage$$";
  try {
    if (typeof ePayHandler === "function") {
      ePayHandler(obj);
    }
  } catch (e) {}
};