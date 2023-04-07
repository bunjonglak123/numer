import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate, derivative } from 'mathjs'
import Navbar from './Navbar';
import { Line } from 'react-chartjs-2';
import "../style.css";

const Newtonraphson = () => {
    const [chartData, setChartData] = useState({});
    const [data, setData] = useState([]);

    const CalNewtonRaphson = (x0) => {
        var fX, fXprime, xnew, ea, scope;
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        var obj = {};

        do {
            scope = {
                x: x0,
            }
            fX = evaluate(Equation, scope)
            fXprime = derivative(Equation, 'x').evaluate({ x: x0 })

            xnew = x0 - fX / fXprime;

            iter++;

            ea = error(x0, xnew);

            obj = {
                iteration: iter,
                x: xnew
            }

            setData(prevData => [...prevData, obj]);

            x0 = xnew;
        } while (ea > e && iter < MAX)

        setX(xnew)
    }

    const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

    const [valueIter, setValueIter] = useState([]);
    const [valueX, setValueX] = useState([]);

    const [html, setHtml] = useState(null);
    const [Equation, setEquation] = useState("(x^4)-13")
    const [X, setX] = useState(0)
    const [X0, setX0] = useState(0)

    const inputEquation = (event) => {
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputX0 = (event) => {
        console.log(event.target.value)
        setX0(event.target.value)
    }

    const calculateRoot = () => {
        const x0num = parseFloat(X0)
        CalNewtonRaphson(x0num);

        setHtml(print());

        console.log(valueIter)
        console.log(valueX)
    }

    const print = () => {
        const valueIter = [];
        const valueX = [];

        if (data) {
            valueIter.push(...data.map((x) => x.iteration));
            valueX.push(...data.map((x) => x.x));
        }

        setChartData({
            labels: valueIter,
            datasets: [
                {
                    label: "X",
                    data: valueX,
                    fill: false,
                    borderColor: "rgb(75, 192, 192)",
                    tension: 0.1,
                },
            ],
        });

        return (
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">X</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.map((element, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{element.iteration}</td>
                                        <td>{element.x}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table>
            </Container>
        );
    };



    return (
        <Container>
            <div className="navbar-container">
                <Navbar></Navbar>
            </div>
            <div className="form-container">
                <Form >
                    <Form.Group className="mb-3">
                        <Form.Label>F(x) : </Form.Label>
                        <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{ width: "20%", margin: "0 auto" }} className="textcss"></input><br></br><br></br>
                        <Form.Label>X0 : </Form.Label>
                        <input type="number" id="X0" onChange={inputX0} style={{ width: "20%", margin: "0 auto" }} className="textcss"></input><br></br><br></br>
                    </Form.Group>
                    <Button className='secondary' onClick={calculateRoot}>Calculate</Button>
                </Form>
            </div>
            {html}
            <Line data={chartData} />
        </Container>
    )
}

export default Newtonraphson;