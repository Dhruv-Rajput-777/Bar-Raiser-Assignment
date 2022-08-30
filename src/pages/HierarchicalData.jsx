import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Navbar from "../components/Navbar";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Collapse from "@mui/material/Collapse";
// web.cjs is required for IE11 support
import { useSpring, animated } from "@react-spring/web";
import FilterModal from "../components/employeeTable/FilterModal";
import { Typography } from "@mui/material";

const HierarchicalData = () => {
  const { employeeData, loading, err } = useFetch({
    url: "https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/employees",
  });

  let [employeeTreeData, setEmployeeTreeData] = useState([]);
  const [filters, setFilters] = useState({
    dob: {
      lower_bound: "",
      upper_bound: "",
    },
    address: "",
    joiningDate: {
      lower_bound: "",
      upper_bound: "",
    },
    salary: {
      lower_bound: 0,
      upper_bound: Number.MAX_VALUE,
    },
  });

  const addFilters = (name, value) => {
    setFilters((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const resetFilters = () => {
    setFilters({
      dob: {
        lower_bound: "",
        upper_bound: "",
      },
      address: "",
      joiningDate: {
        lower_bound: "",
        upper_bound: "",
      },
      salary: {
        lower_bound: 0,
        upper_bound: Number.MAX_VALUE,
      },
    });
  };

  const checkSalary = (node) => {
    const salary = parseInt(node.salary);
    if (
      salary >= filters.salary.lower_bound &&
      salary <= filters.salary.upper_bound
    )
      return true;
    return false;
  };

  const buildEmployeeTreeData = (parent, data) => {
    if (!data[parent] || data[parent].length === 0) return [];
    let childrens = [];
    data[parent].forEach((child) => {
      if (checkSalary(child)) {
        childrens.push({
          id: child.id,
          name: child.name,
          salary: child.salary,
          children: buildEmployeeTreeData(child.id, data),
        });
      } else {
        let children = buildEmployeeTreeData(child.id, data);
        console.log(children);
        childrens.push(...children);
      }
    });

    return childrens;
  };

  useEffect(() => {
    if (employeeData.length === 0) return;

    // get data in the form { parent : [child1 , child2] }
    let childEmployees = { main: [] };
    employeeData.forEach((data) => {
      if (data.manager_id === "") {
        childEmployees["main"].push({
          id: data.id,
          name: data.first_name + " " + data.last_name,
          salary: parseInt(data.salary.replace(",", "")),
        });
      } else {
        if (!childEmployees[data.manager_id])
          childEmployees[data.manager_id] = [];
        childEmployees[data.manager_id].push({
          id: data.id,
          name: data.first_name + " " + data.last_name,
          salary: parseInt(data.salary.replace(",", "")),
        });
      }
    });
    setEmployeeTreeData(buildEmployeeTreeData("main", childEmployees));
  }, [employeeData, filters]);

  function TransitionComponent(props) {
    const style = useSpring({
      from: {
        opacity: 0,
        transform: "translate3d(20px,0,0)",
      },
      to: {
        opacity: props.in ? 1 : 0,
        transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
      },
    });

    return (
      <animated.div style={style}>
        <Collapse {...props} />
      </animated.div>
    );
  }

  TransitionComponent.propTypes = {
    in: PropTypes.bool,
  };

  const StyledTreeItem = styled((props) => (
    <TreeItem {...props} TransitionComponent={TransitionComponent} />
  ))(({ theme }) => ({
    [`& .${treeItemClasses.iconContainer}`]: {
      "& .close": {
        opacity: 0.3,
      },
    },
    [`& .${treeItemClasses.group}`]: {
      marginLeft: 15,
      paddingLeft: 18,
      borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
  }));

  const renderTree = (nodes) => (
    <StyledTreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={`${nodes.name} (Salary : ${nodes.salary})`}
      sx={{ padding: "0.5rem", width: "fit-content" }}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </StyledTreeItem>
  );

  return (
    <div>
      <Navbar />
      <div
        style={{
          padding: "1rem 0 0 2rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <FilterModal
          filters={filters}
          addFilters={addFilters}
          resetFilters={resetFilters}
        />
        <Typography variant="body2" sx={{ color: "red" }}>
          Works on salary only!
        </Typography>
      </div>
      <div style={{ padding: "2rem" }}>
        {employeeTreeData.length !== 0 ? (
          employeeTreeData.map((node) => {
            console.log(node);
            return (
              <TreeView
                aria-label="rich object"
                defaultExpandIcon={
                  <AddCircleOutlineIcon
                    sx={{ color: "rgb(8,152,169)", fontSize: "1.6rem" }}
                  />
                }
                defaultExpanded={["root"]}
                defaultCollapseIcon={
                  <RemoveCircleOutlineIcon
                    sx={{ color: "rgb(8,152,169)", fontSize: "1.6rem" }}
                  />
                }
                sx={{ flexGrow: 1 }}
              >
                {renderTree(node)}
              </TreeView>
            );
          })
        ) : (
          <Typography variant="body2" sx={{ color: "red" }}>
            No Results found!
          </Typography>
        )}
      </div>
    </div>
  );
};

export default HierarchicalData;
