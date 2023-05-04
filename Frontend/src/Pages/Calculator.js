import React, { useState, useEffect, useContext } from "react";
import './Calculator.css';
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

function Calculator() {
  const [income, setIncome] = useState(0);
  const [deduction, setDeduction] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [tax, setTax] = useState(0);
  const auth = useContext(AuthContext);
  const [employee, setEmployee] = useState([]);
 // const [total, setTotal] = useState();

    useEffect(() => {
      const config = {
        headers: {
          "x-auth-token": `${auth.token}`,
          "Content-Type": "application/json",
        },
      };
      const getEmployees = () => {
        axios.get(`http://localhost:4000/api/auth/all`, config).then((res) => {
          setEmployee(res.data);
          console.log(res.data);
          const totalIncome = calculateTotalIncome(res.data);
          const totalDeduction = calculateTotalDeduction(res.data);
          setIncome(totalIncome);
          setDeduction(totalDeduction);
          console.log("Total income of all employees: ", totalIncome);
          console.log("Total deduction of all employees: ", totalDeduction);
        });
      };

      getEmployees();
    }, []);

    const calculateTotalIncome = (employees) => {
      let totalIncome = 0;
      employees.forEach((employee) => {
        totalIncome += employee.income;
      });
      return totalIncome;
    };

    const calculateTotalDeduction = (employees) => {
      let totalDeduction = 0;
      employees.forEach((employee) => {
        totalDeduction += employee.deduction;
      });
      return totalDeduction;
    };

//   const handleIncomeChange = (event) => {
//     setIncome(event.target.value);
//   };

  const handleTaxRateChange = (event) => {
    setTaxRate(event.target.value);
  };

  const calculateTax = () => {
    const calculatedTax = ((income-deduction) * (taxRate / 100)).toFixed(2);
    setTax(calculatedTax);
  };

  return (
    <div className="calculator" style={{ marginTop: "50px" }}>
      <h2>Tax Calculator</h2>
      <label>
        Income:
        <input
          type="number"
          value={income}
          // onChange={handleIncomeChange}
        />
      </label>
      <br />
      <label>
        Deduction:
        <input type="number" value={deduction}  />
      </label>
      <br />
      <label>
        Tax Rate:
        <input type="number" value={taxRate} onChange={handleTaxRateChange} />
      </label>
      <br />
      <button onClick={calculateTax}>Calculate Tax</button>
      <br />
      <label>
        Tax:
        <input type="number" value={tax} readOnly />
      </label>
    </div>
  );
}

export default Calculator;
