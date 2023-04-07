import { useState } from "react"
import {  Container,  Table } from "react-bootstrap";
import Navbar from "./Navbar"
import Axios from "axios";
  
  const header = [
    {
      title: () => {
        return <p> Iteration </p>;
      },
      dataIndex: "iteration",
      key: "iteration",
      align: "center",
    },
    {
      title: () => {
        return (
          <p>
            {" "}
            X <sub> 0 </sub>
          </p>
        );
      },
      dataIndex: "x0",
      align: "center",
      width: 300,
    },
    {
      title: () => {
        return (
          <p>
            {" "}
            X 
          </p>
        );
      },
      dataIndex: "x",
      align: "center",
      width: 300,
    },
    {
      title: () => {
        return (
          <p>
            {" "}
            N
          </p>
        );
      },
      dataIndex: "N",
      align: "center",
      width: 300,
    },
    {
      title: "Error",
      dataIndex: "Error",
      align: "center",
      width: 300,
    },
  ];
  let newArr = [];
  function Taylor(){
const Taylor1 = ()=>{
  const [equation,setEquation] = useState("lnx")
  const [btnState, setBtnState] = useState(0);
  let [x0,setX0] = useState(0)
  let [x,setX] = useState(0)
  let [n,setN] = useState(0)

  const handleSubmit = (e) => {
    if (btnState === 0) {
      e.preventDefault();
      Taylor1();
    }
  };

  Axios.post("http://localhost:5000/api/TaylorAPI", {
      x0: parseFloat(x0),
      x: parseFloat(x),
      n: parseFloat(x),
      Equation: equation,
    })
      .then((res) => {
        console.log(res.data.tmpArr);
        newArr = res.data.tmpArr;
        setBtnState(1);
      })
      .catch((err) => {
        console.log(err);
      });

 
  return(
      <Container>
        <Navbar></Navbar>

          <form onSubmit={handleSubmit}>
            <label>
              Equation :<span>&nbsp;&nbsp;</span>
              <input
                disabled={btnState}
                type="text"
                value={equation}
                onChange={(e) => setEquation(e.target.value)}
              />
            </label>
            <label>
              X<sub>0</sub> :<span>&nbsp;&nbsp;</span>
              <input
                disabled={btnState}
                type="text"
                value={x0}
                onChange={(e) => setX0(e.target.value)}
              />
            </label>
            <label>
              X :<span>&nbsp;&nbsp;</span>
              <input
                disabled={btnState}
                type="text"
                value={x}
                onChange={(e) => setX(e.target.value)}
              />
            </label>
            <label>
              N :<span>&nbsp;&nbsp;</span>
              <input
                disabled={btnState}
                type="text"
                value={n}
                onChange={(e) => setN(e.target.value)}
              />
            </label>

            {btnState === 0 ? (
              <button type="submit" disabled={btnState} value="Submit">
                Submit
              </button>
            ) : (
              <button type="submit" disabled={!btnState} value="Submit">
                Reset
              </button>
            )}
          </form>
          <div>
            {
              <Table
                dataSource={newArr}
                columns={header}
                rowKey="iteration"
                pagination={false}
              />
            }
          </div>
      </Container>
  )
}
  }
export default Taylor;