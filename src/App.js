import "./App.css";
import { Routes, Route } from "react-router-dom";
import EmployeeData from "./pages/EmployeeData";
import PersonalDetails from "./pages/PersonalDetails";
import HierarchicalData from "./pages/HierarchicalData";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<EmployeeData />} />
      <Route exact path="/details/" element={<PersonalDetails />} />
      <Route exact path="/hierarchicalData/" element={<HierarchicalData />} />
    </Routes>
  );
};

export default App;
