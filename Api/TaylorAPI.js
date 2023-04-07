const express = require("express");
const router = express.Router();
const math = require("mathjs");

router.post("/api/TaylorAPI", (req, res) =>{
  let Equation = math.compile(req.body.equation);
  let x0 = parseFloat(req.body.x0);
  let x = parseFloat(req.body.x);
  let n = parseFloat(req.body.n);
  let tmpArr = [];

  const f=(a)=> {
    if(Equation[0]==='l'){
        return Math.log(a)
    }
    let scope;
    scope = {
        x:x0,
    }
    let fx=evaluate(Equation, scope);
    
    return fx;
}
const Answer=()=>{
    const x0num = parseFloat(x0)
    const xnum = parseFloat(x)
    const n = parseFloat(n)
    console.log("x0num =",x0num);
    console.log("xnum =",xnum);
    CalTaylor(x0num,xnum,n);
    tmpArr.push({
        iteration: n,
        x0: x0,
        x: x,
        Error: Er,
      });
}
  const derivative=(x0,n)=>{
    let h=0.000001;
    let dy=f(x0+h)-f(x0);
    let dx=h;
    let a =Math.pow(dy,n)/Math.pow(dx,n);
    return a.toFixed(6);
}

  const fac=(n)=>{
    if (n < 0) return -1;
    else if (n == 0) return 1;
    else {
        return n * fac(n - 1);
    }
}
  let fx=0;
      let Er=0;
      
      for(let i=0;i<=n;i++){
          console.log("Round-----------=",i);
          console.log("Before fx =",fx);
          if(i==0){
              fx=f(x0); 
          }
          else if(i>=1){
              let diff=derivative(x0,i);
              if(i%2==0){
                  diff=-diff;
              }
              if(i>=2){
                  diff=diff*(i-1)
              }
              console.log("diff =",diff);
              fx=fx+((Math.pow((x-x0),i))/fac(i))*diff;
              console.log("fx+ =",((Math.pow((x-x0),i))/fac(i))*diff);
          }
          
          console.log("x0 =",x0);
          console.log("x =",x);
          console.log("fx =",fx);
          console.log("f(x) =",f(x));
          
          Er=f(x)-fx;
          console.log("Er =",Er);
          console.log("fac =",fac(i));
      }
      setAns(Er)
    res.json({
    tmpArr: tmpArr,
  });
});
module.exports = router;