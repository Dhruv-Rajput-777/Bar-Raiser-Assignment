import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import useFetch from "../hooks/useFetch";
import Table from "../components/employeeTable/Table";
import SearchBar from "../components/employeeTable/SearchBar";
import FilterModal from "../components/employeeTable/FilterModal";

const isSubsequence = (string1, string2) => {
  // checks if 2 is subseq of 1
  string1 = string1.toLowerCase();
  string2 = string2.toLowerCase();
  let i = 0,
    j = 0;
  while (i < string1.length) {
    if (string1[i] === string2[j]) {
      i++;
      j++;
    } else i++;
  }

  if (j === string2.length) return true;
  return false;
};

const checkFilter = (data, filters) => {
  try {
    const dateToTime = (date) => {
      let day = parseInt(date.substring(0, 2));
      let month = parseInt(date.substring(3, 5));
      let year = parseInt(date.substring(6));

      let time = 0;
      time += day * 24 * 60 * 60;
      time += month * 30 * 24 * 60 * 60;
      time += year * 365 * 24 * 60 * 60;
      return time;
    };

    const changeFormat = (date) => {
      let year = date.substring(0, 4);
      let month = date.substring(5, 7);
      let day = date.substring(8);
      return day + "-" + month + "-" + year;
    };

    let checkDob = (filter, dob) => {
      if (
        dateToTime(dob) >= dateToTime(changeFormat(filter.lower_bound)) &&
        dateToTime(dob) <= dateToTime(changeFormat(filter.upper_bound))
      )
        return true;
      return false;
    };

    let checkAddress = (filter, address) => {
      let string1 = filter.toLowerCase();
      let string2 = address.toLowerCase();
      if (isSubsequence(string2, string1)) return true;
      return false;
    };

    let checkJoiningDate = (filter, joiningDate) => {
      if (
        dateToTime(joiningDate) >=
          dateToTime(changeFormat(filter.lower_bound)) &&
        dateToTime(joiningDate) <= dateToTime(changeFormat(filter.upper_bound))
      )
        return true;
      return false;
    };

    let checkSalary = (filter, salary) => {
      let updatedSalary = parseInt(salary.replaceAll(",", ""));
      if (
        updatedSalary >= filter.lower_bound &&
        updatedSalary <= filter.upper_bound
      )
        return true;
      return false;
    };

    let check = true;
    if (
      filters.salary.lower_bound !== "" &&
      filters.salary.upper_bound !== "" &&
      !checkSalary(filters.salary, data.salary)
    )
      check = false;

    if (filters.address !== "" && !checkAddress(filters.address, data.address))
      check = false;

    if (
      filters.joiningDate.lower_bound !== "" &&
      filters.joiningDate.upper_bound !== "" &&
      !checkJoiningDate(filters.joiningDate, data.date_of_joining)
    )
      check = false;

    if (
      filters.dob.lower_bound !== "" &&
      filters.dob.upper_bound !== "" &&
      !checkDob(filters.dob, data.date_of_birth)
    )
      check = false;

    return check;
  } catch (err) {
    console.log(err);
    return true;
  }
};

const filterData = (employeeData, query, queryType, filters) => {
  try {
    const queryResults = [];
    const filterResults = [];

    // query results
    employeeData.forEach((data) => {
      if (queryType === "name") {
        if (
          isSubsequence(data["first_name"], query) ||
          isSubsequence(data["last_name"], query)
        )
          queryResults.push(data);
      } else {
        if (isSubsequence(data[queryType], query)) queryResults.push(data);
      }
    });

    // filter results
    employeeData.forEach((data) => {
      if (checkFilter(data, filters)) filterResults.push(data);
    });

    const filteredResults = queryResults.filter((value) =>
      filterResults.includes(value)
    );
    return filteredResults;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const EmployeeData = () => {
  const { employeeData, loading, err } = useFetch({
    url: "https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/employees",
  });
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState("");
  const [queryType, setQueryType] = useState("name");
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
      lower_bound: "",
      upper_bound: "",
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
        lower_bound: "",
        upper_bound: "",
      },
    });
  };

  useEffect(() => {
    setFilteredData(employeeData);
  }, [employeeData]);

  useEffect(() => {
    let data = filterData(employeeData, query, queryType, filters);
    setFilteredData(data);
  }, [query, filters]);

  return (
    <>
      <Navbar />
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "100vw",
        }}
      >
        {/* -------------------------------------Search and Filter-------------------------------------- */}
        <Grid
          item
          lg={10}
          md={10}
          sm={12}
          sx={{
            display: "flex",
            width: "100%",
            maxWidth: "100vw",
            alignItems: "center",
            padding: "1rem 1rem 0 1rem",
          }}
        >
          <div style={{ display: "flex", height: "2.4rem" }}>
            <SearchBar
              query={query}
              setQuery={setQuery}
              queryType={queryType}
              setQueryType={setQueryType}
            />
            <FilterModal
              filters={filters}
              addFilters={addFilters}
              resetFilters={resetFilters}
            />
          </div>
        </Grid>
        {/* -------------------------------------Table Grid-------------------------------------- */}
        <Grid
          item
          lg={10}
          md={10}
          sm={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            maxWidth: "100vw",
            padding: "1rem",
          }}
        >
          <Table employeeData={filteredData} loading={loading} />
        </Grid>
      </Grid>
    </>
  );
};

export default EmployeeData;
