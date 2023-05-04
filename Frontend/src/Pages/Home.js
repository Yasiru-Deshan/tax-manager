import React, { useState, useContext, useRef,useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { NotificationContext } from "../Context/NotificationContext";
import axios from "axios";
import Modal from "react-modal";
import { Form } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";
import { MDBCol } from "mdbreact";

const Home = () => {
  const auth = useContext(AuthContext);
  let [employee, setEmployee] = useState([]);
  const notification = useContext(NotificationContext);
  const [mdal, setModal] = useState(false);
  const [emdal, setEMdal] = useState(false);
  const fname = useRef();
  const lname = useRef();
  const income = useRef();
  const deduction = useRef();
  const [firstName, setFirstname] = useState();
  const [lastName, setLastname] = useState();
  const [nincome, setnIncome] = useState();
  const [ndeduction, setnDeduction] = useState();
  const [empId, setEmpId] = useState();
  let [search, setSearch] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const newEmployee = {
      firstname: fname.current.value,
      lastname: lname.current.value,
      income: income.current.value,
      deduction: deduction.current.value,
    };

    try {
      const config = {
          headers: {
            "x-auth-token": `${auth.token}`,
            "Content-Type": "application/json",
          },
        },
        newEmp = await axios.post(
          `http://localhost:4000/api/auth/add`,
          newEmployee,
          config
        );

      if (newEmp) {
        // window.alert("New Employee has been created");
        notification.showNotification("New Employee has been created", false);
      }
    } catch (err) {
      console.log(err);
      notification.showNotification("Please enter valid information", true);
    }
  };

  const deleteHandler = async (id) => {
    console.log(id);
    try {
      const config = {
        headers: {
          "x-auth-token": `${auth.token}`,
          "Content-Type": "application/json",
        },
      };
      await axios.delete(`http://localhost:4000/api/auth/delete/${id}`, config);
      // window.alert("Employee has been removed");
      notification.showNotification("Employee has been removed", false);
    } catch (err) {
      console.log(err);
      // notification.showNotification("Failed to delete employee");
    }
  };

  //  const deleteHandler = async (id) => {
  //  //  e.preventDefault();
  //    console.log(id)
  //    try {
  //      const body={
  //       id:id
  //      }
  //      const config = {
  //          headers: {
  //            "x-auth-token": `${auth.token}`,
  //            "Content-Type": "application/json",
  //          },
  //        },
  //        delEmp = await axios.delete(
  //          `http://localhost:4000/api/auth/delete/${id}`,
  //          body,
  //          config
  //        );

  //      if (delEmp) {
  //        window.alert("Employee has been Removed");
  //        // notification.showNotification(
  //        //   "New Employee has been created",
  //        //   false
  //        // );
  //      }
  //    } catch (err) {
  //      console.log(err);
  //      notification.showNotification(false);
  //    }
  //  };

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
        console.log("Total income of all employees: ", totalIncome);
      });
    };

    getEmployees();
  }, [mdal, auth.token, notification]);

  const calculateTotalIncome = (employees) => {
    let totalIncome = 0;
    employees.forEach((employee) => {
      totalIncome += employee.income;
    });
    return totalIncome;
  };

  const getEmployeeHandler = async (ide) => {
    const config = {
      headers: {
        "x-auth-token": `${auth.token}`,
        "Content-Type": "application/json",
      },
    };
    const getEmployee = () => {
      axios.get(`http://localhost:4000/api/auth/${ide}`, config).then((res) => {
        setFirstname(res.data.firstName);
        setLastname(res.data.lastName);
        setnIncome(res.data.income);
        setnDeduction(res.data.deduction);
      });
    };
    getEmployee();
  };

  // const editHandler = async (e) => {
  //   let update;

  //   e.preventDefault();
  //   const updatedEmployee = {

  //     firstName: firstName,
  //     lastName: lastName,
  //     income: nincome,
  //     deduction: ndeduction,
  //   };

  //   const config = {
  //     headers: {
  //       "x-auth-token": `${auth.token}`,
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   try {
  //     update = await axios.put(
  //       `http://localhost:4000/api/auth/update/${empId}`,
  //       updatedEmployee,
  //       config
  //     );

  //     if (update) {
  //       window.alert("Employee has been updated");
  //       setModal(false);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const editHandler = async () => {
    const updatedEmployee = {
      id: empId,
      firstName: firstName,
      lastName: lastName,
      income: nincome,
      deduction: ndeduction,
    };

    const config = {
      headers: {
        "x-auth-token": `${auth.token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const update = await axios.put(
        `http://localhost:4000/api/auth/update/${empId}`,
        updatedEmployee,
        config
      );

      if (update) {
        notification.showNotification("Employee has been updated", false); // display a success message using a notification component or a modal window
        setModal(false); // close the modal window after successful update
      }
    } catch (err) {
      console.log(err);
      // display an error message using a notification component or a modal window
    }
  };

  //search filter
  if (search.length > 0) {
    employee = employee.filter((i) => {
      return i.firstName.toLowerCase().match(search.toLowerCase());
    });
  }

  return (
    <div>
      <Modal
        isOpen={mdal}
        onRequestClose={() => setModal(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(49, 49, 49, 0.8)",
            width: "100%",
            height: "100%",
          },

          content: {
            width: "calc(200px + 15vw)",
            height: "500px",
            borderRadius: "5px",
            color: "black",
            background: "white",
            margin: "0 auto",
            marginTop: "100px",
          },
        }}
      >
        <CloseButton
          onClick={() => setModal(false)}
          variant="black"
        ></CloseButton>
        <h1>Add New Employee</h1>

        <Form onSubmit={submitHandler}>
          <Form.Label style={{ color: "blue" }}>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter first name"
            ref={fname}
          />
          <Form.Label style={{ color: "blue" }}>Last Name</Form.Label>
          <Form.Control type="text" placeholder="enter last name" ref={lname} />

          <Form.Label style={{ color: "blue" }}>Income</Form.Label>
          <Form.Control type="text" placeholder="enter income " ref={income} />
          <Form.Label style={{ color: "blue" }}>Deduction</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter deduction"
            ref={deduction}
          />

          <button
            type="submit"
            style={{
              fontSize: "calc(0.2vw + 12px)",
              borderRadius: "3px",
              padding: "calc(15px + 1vw)",
              color: "#fff",
              backgroundColor: "#01bf71",
              border: "none",
              width: "100%",
              marginTop: "10px",
            }}
          >
            ADD
          </button>
        </Form>
      </Modal>
      <Modal
        isOpen={emdal}
        onRequestClose={() => setEMdal(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(49, 49, 49, 0.8)",
            width: "100%",
            height: "100%",
          },

          content: {
            width: "calc(200px + 15vw)",
            height: "500px",
            borderRadius: "5px",
            color: "black",
            background: "white",
            margin: "0 auto",
            marginTop: "100px",
          },
        }}
      >
        <CloseButton
          onClick={() => setEMdal(false)}
          variant="black"
        ></CloseButton>
        <h1>Edit Employee</h1>

        <Form onSubmit={editHandler}>
          <Form.Label style={{ color: "blue" }}>First Name</Form.Label>
          <Form.Control
            type="text"
            defaultValue={firstName}
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
          />
          <Form.Label style={{ color: "blue" }}>Last Name</Form.Label>
          <Form.Control
            type="text"
            defaultValue={lastName}
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          />

          <Form.Label style={{ color: "blue" }}>Income</Form.Label>
          <Form.Control
            type="text"
            defaultValue={nincome}
            onChange={(e) => {
              setnIncome(e.target.value);
            }}
          />
          <Form.Label style={{ color: "blue" }}>Deduction</Form.Label>
          <Form.Control
            type="text"
            defaultValue={ndeduction}
            onChange={(e) => {
              setnDeduction(e.target.value);
            }}
          />

          <button
            type="submit"
            style={{
              fontSize: "calc(0.2vw + 12px)",
              borderRadius: "3px",
              padding: "calc(15px + 1vw)",
              color: "#fff",
              backgroundColor: "#01bf71",
              border: "none",
              width: "100%",
              marginTop: "10px",
            }}
          >
            UPDATE
          </button>
        </Form>
      </Modal>
      <div
        className="container"
        style={{
          margin: "auto",
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        <h1 style={{ marginBottom: "50px" }}>Employee List</h1>

        <center>
          <MDBCol md="6" className="searchbar">
            <input
              className="form-control"
              type="text"
              placeholder="Search Employees"
              aria-label="Search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
              style={{ marginBottom: "50px" }}
            />
          </MDBCol>
        </center>

        {employee.length === 0 ? (
          <p>No employees yet</p>
        ) : (
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Income</th>
                <th scope="col">Deduction</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {employee.map((emp) => (
                <tr>
                  <th scope="row">
                    {emp.firstName} {emp.lastName}
                  </th>
                  <td>{emp.income}</td>
                  <td>{emp.deduction}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        setEMdal(true);
                        getEmployeeHandler(emp._id);
                        setEmpId(emp._id);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deleteHandler(emp._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button
          style={{ float: "right", marginTop: "50px", marginBottom: "50px" }}
          type="button"
          class="btn btn-success"
          onClick={() => setModal(true)}
        >
          Add New Employee
        </button>
      </div>
    </div>
  );
};

export default Home;
