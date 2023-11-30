import { useEffect, useState } from "react";
import "./App.css";
import data from "./data.json";
import Modal from "./component/Modal";

const Icon = ({ id, hendleDelete, openModal, setId }) => (
  <>
    <i
      class="bi bi-trash p-1 cursor-pointer"
      onClick={() => hendleDelete(id)}
    ></i>{" "}
    <i
      class="bi bi-pencil p-1 cursor-pointer"
      onClick={() => {
        openModal("edit");
        setId(id);
      }}
    ></i>
  </>
);

function App() {
  const [employeeData, setEmployeeData] = useState([]);
  const [employeeData_1, setEmployeeData_1] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [companyName, setCompanyName] = useState();
  const [employeeName, setEmployeeName] = useState();
  const [employeeId, setEmployeeId] = useState();
  const [id, setId] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setEmployeeData(data);
    setEmployeeData_1(data);
  }, []);
  useEffect(() => {
    if (id === null) {
      setEmployeeName("");
      setCompanyName("");
      setEmployeeId("");
    } else {
      const em_data = employeeData[id];
      setEmployeeName(em_data.name);
      setCompanyName(em_data.company);
      setEmployeeId(em_data.employeeId);
    }
  }, [id]);
  useEffect(() => {
    const deBounce = setTimeout(() => {
      searchEmployData();
    }, 1000);
    return () => clearTimeout(deBounce);
  }, [searchText, employeeData_1]);

  const searchEmployData = () => {
    if (searchText == "") return setEmployeeData(employeeData_1);
    else {
      const filter = employeeData_1.filter(
        (employee) => employee.name === searchText
      );
      // console.log(filter);
      setEmployeeData(filter);
    }
  };

  const handleSortEmployeeData = (e) => {
    let col = e.target.name;
    let series = e.target.value;

    employeeData.slice().sort((a, b) => a.name.localeCompare(b.name))
    if (col == "name") { 
      series === "A"
        ? setEmployeeData([...employeeData.slice().sort((a, b) => a.name.localeCompare(b.name))])
        : setEmployeeData([...employeeData.slice().sort((a, b) => b.name.localeCompare(a.name))]);
    } else if (col == "company") {
      series === "A"
        ? setEmployeeData([...employeeData.slice().sort((a, b) => a.company.localeCompare(b.company))])
        : setEmployeeData([...employeeData.slice().sort((a, b) => b.company.localeCompare(a.company))]);
    } else {
      series === "A"
        ? setEmployeeData([...employeeData.sort((a, b) => a.employeeId - b.employeeId)])
        : setEmployeeData([...employeeData.sort((a, b) => b.employeeId - a.employeeId)]);
    }
    // console.log("sortData,  employeeData, employeeData.slice().sort((a, b) => a.name.localeCompare(b.name)))", sortData, employeeData, employeeData.slice().sort((a, b) => a.name.localeCompare(b.name)))
    // setEmployeeData([...sortData]);
  };

  const hendleDelete = (id) => {
    const filterData = employeeData.filter((item) => item !== employeeData[id]);
    setEmployeeData(filterData);
    setEmployeeData_1(filterData);
  };

  const handleSubmit = (setModalOpen) => {
    if (employeeData === "" || employeeName === "" || companyName === "")
      return;

    const resetData = () => {
      setCompanyName("");
      setEmployeeId("");
      setEmployeeName("");
    };
    const updateEmployeeData = () => {
      if (id !== null && modalOpen == "edit") {
        const em_data = [...employeeData];
        em_data[id].name = employeeName;
        em_data[id].company = companyName;
        em_data[id].employeeId = employeeId;
        setEmployeeData(em_data);
        setEmployeeData_1(em_data);
      } else {
        const subData = {
          name: employeeName,
          employeeId: employeeId,
          company: companyName,
        };
        return [...employeeData, subData];
      }
    };
    setEmployeeData(() => updateEmployeeData(), setId(null), resetData());
    setModalOpen(false);
  };
  // console.log("lalchand", employeeData);
  return (
    <div className="App container mt-3">
      <table class="table table-success table-striped">
        <thead className="pt-5">
          <tr>
            <th scope="col">EmployeeData</th>
            <th scope="col">
              <input
                type="search"
                value={searchText}
                placeholder="Search by name"
                onChange={(e) => setSearchText(e.target.value)}
                className="pd-10"
              />
            </th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"> </th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">
              Name
              <select name="name" onChange={(e) => handleSortEmployeeData(e)}>
                <option>A</option>
                <option>D</option>
              </select>
            </th>
            <th scope="col">
              Company{" "}
              <select name="company" onChange={(e) => handleSortEmployeeData(e)}>
                <option>A</option>
                <option>D</option>
              </select>
            </th>
            <th scope="col">
              EmployeeId{" "}
              <select name="id" onChange={(e) => handleSortEmployeeData(e)}>
                <option>A</option>
                <option>D</option>
              </select>
            </th>
            <th scope="col">
              {" "}
              <button onClick={() => setModalOpen(true)}>Add New</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {employeeData &&
            employeeData.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.company}</td>
                <td>{item.employeeId}</td>
                <th scope="col">
                  <Icon
                    id={index}
                    hendleDelete={hendleDelete}
                    openModal={setModalOpen}
                    setId={setId}
                  />
                </th>
              </tr>
            ))}
        </tbody>
      </table>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        set_id={() => setId(null)}
        handleSubmit={() => handleSubmit(setModalOpen)}
      >
        <div class="input-group mb-3">
          <span class="input-group-text">Employee Name</span>
          <input
            type="text"
            class="form-control"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Company Name</span>
          <input
            type="text"
            value={companyName}
            class="form-control"
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Employee Id</span>
          <input
            type="text"
            value={employeeId}
            class="form-control"
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        </div>
      </Modal>
      {employeeData.length===0?<h3>Data Not Found</h3>:<></>}
    </div>
  );
}

export default App;
