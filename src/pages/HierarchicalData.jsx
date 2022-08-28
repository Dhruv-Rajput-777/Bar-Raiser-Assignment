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

const HierarchicalData = () => {
  const { employeeData, loading, err } = useFetch({
    url: "https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/employees",
  });

  let [employeeTreeData, setEmployeeTreeData] = useState([]);

  const buildEmployeeTreeData = (parent, data) => {
    if (!data[parent] || data[parent].length === 0) return [];
    let node = [];
    data[parent].forEach((child) => {
      node.push({
        id: child.id,
        name: child.name,
        children: buildEmployeeTreeData(child.id, data),
      });
    });
    return node;
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
        });
      } else {
        if (!childEmployees[data.manager_id])
          childEmployees[data.manager_id] = [];
        childEmployees[data.manager_id].push({
          id: data.id,
          name: data.first_name + " " + data.last_name,
        });
      }
    });

    // build tree
    setEmployeeTreeData(buildEmployeeTreeData("main", childEmployees));
  }, [employeeData]);

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
      label={nodes.name}
      sx={{ padding: "0.5rem", width: "15rem" }}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </StyledTreeItem>
  );

  return (
    <div>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        {employeeTreeData.length !== 0 ? (
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
            {renderTree(employeeTreeData[0])}
          </TreeView>
        ) : null}
      </div>
    </div>
  );
};

export default HierarchicalData;
