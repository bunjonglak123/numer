const express = require("express");
const router = express.Router();
const math = require("mathjs");


router.post("/api/BisectionAPI", (req, res) => {
  let eq = math.compile(req.body.equation);
  let xl = parseFloat(req.body.xl);
  let xr = parseFloat(req.body.xr);
  let xm = 0;
  let n = 0;
  let check = parseFloat(0.0);
  let tmpArr = [];

  const findxm = (xl, xr) => {
    return (parseFloat(xl) + parseFloat(xr)) / 2;
  };

  do {
    let XL = {
      x: xl,
    };
    let XR = {
      x: xr,
    };

    xm = findxm(xl, xr);
    n++;
    if (eq.evaluate(XL) * eq.evaluate(XR) > 0) {
      check = Math.abs((xm - xl) / xm).toFixed(8);
      xl = xm;
    } else {
      check = Math.abs((xm - xr) / xm).toFixed(8);
      xr = xm;
    }

    tmpArr.push({
      iteration: n,
      xl: xl,
      xr: xr,
      xm: xm,
      Error: check,
    });
  } while (check > 0.000001 && n < 25);

  res.json({
    tmpArr: tmpArr,
  });
});
module.exports = router;