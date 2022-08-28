import React, { useState } from "react";
import { Button, Modal, Typography, Box, Input } from "@mui/material";

const FilterModal = ({ filters, addFilters, resetFilters }) => {
  const [show, setShow] = useState(false);

  return (
    <div style={{ height: "100%", marginLeft: "0.4rem" }}>
      <Modal
        open={show}
        onClose={() => setShow(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            padding: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              border: "thin solid #e6e6e6",
            }}
          >
            <div
              style={{ backgroundColor: "rgb(8,152,169,0.1)", padding: "1rem" }}
            >
              <Typography sx={{ fontWeight: "bold", color: "rgb(8,152,169)" }}>
                Date of Birth
              </Typography>
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <Typography variant="body2">From</Typography>
                <Input
                  type="date"
                  name="dob"
                  sx={{ fontSize: "0.8rem" }}
                  value={filters.dob.lower_bound}
                  onChange={(e) => {
                    addFilters(e.target.name, {
                      lower_bound: e.target.value,
                      upper_bound: filters.dob.upper_bound,
                    });
                  }}
                />
                <Typography variant="body2">To</Typography>
                <Input
                  type="date"
                  name="dob"
                  sx={{ fontSize: "0.8rem" }}
                  value={filters.dob.upper_bound}
                  onChange={(e) => {
                    addFilters(e.target.name, {
                      lower_bound: filters.dob.lower_bound,
                      upper_bound: e.target.value,
                    });
                  }}
                />
              </div>
            </div>

            <div style={{ padding: "1rem" }}>
              <Typography sx={{ fontWeight: "bold", color: "rgb(8,152,169)" }}>
                Date of Joining
              </Typography>
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <Typography variant="body2">From</Typography>
                <Input
                  type="date"
                  name="joiningDate"
                  sx={{ fontSize: "0.8rem" }}
                  value={filters.joiningDate.lower_bound}
                  onChange={(e) => {
                    addFilters(e.target.name, {
                      lower_bound: e.target.value,
                      upper_bound: filters.joiningDate.upper_bound,
                    });
                  }}
                />
                <Typography variant="body2">To</Typography>
                <Input
                  type="date"
                  name="joiningDate"
                  sx={{ fontSize: "0.8rem" }}
                  value={filters.joiningDate.upper_bound}
                  onChange={(e) => {
                    addFilters(e.target.name, {
                      lower_bound: filters.joiningDate.lower_bound,
                      upper_bound: e.target.value,
                    });
                  }}
                />
              </div>
            </div>

            <div
              style={{ backgroundColor: "rgb(8,152,169,0.1)", padding: "1rem" }}
            >
              <Typography sx={{ fontWeight: "bold", color: "rgb(8,152,169)" }}>
                Address
              </Typography>
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <Input
                  type="text"
                  name="address"
                  sx={{ fontSize: "0.8rem" }}
                  value={filters.address}
                  onChange={(e) => {
                    addFilters(e.target.name, e.target.value);
                  }}
                />
              </div>
            </div>

            <div style={{ padding: "1rem" }}>
              <Typography sx={{ fontWeight: "bold", color: "rgb(8,152,169)" }}>
                Salary
              </Typography>
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <Typography variant="body2">From</Typography>
                <Input
                  type="number"
                  name="salary"
                  sx={{ fontSize: "0.8rem" }}
                  value={filters.salary.lower_bound}
                  onChange={(e) => {
                    addFilters(e.target.name, {
                      lower_bound: e.target.value,
                      upper_bound: filters.salary.upper_bound,
                    });
                  }}
                />
                <Typography variant="body2">To</Typography>
                <Input
                  type="number"
                  name="salary"
                  sx={{ fontSize: "0.8rem" }}
                  value={filters.salary.upper_bound}
                  onChange={(e) => {
                    addFilters(e.target.name, {
                      lower_bound: filters.salary.lower_bound,
                      upper_bound: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "0.8rem",
            }}
          >
            <Button
              sx={{
                display: "flex",
                alignItems: "center",
                border: "thin solid rgb(8,152,169)",
                color: "rgb(8,152,169)",
              }}
              onClick={() => resetFilters()}
            >
              Reset Filters
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "rgb(8,152,169)" }}
              onClick={() => setShow(false)}
            >
              Save Filters
            </Button>
          </div>
        </Box>
      </Modal>

      <Button
        variant="contained"
        sx={{
          height: "100%",
          backgroundColor: "rgb(8,152,169)",
          fontSize: "0.8rem",
          ":hover": { backgroundColor: "rgb(8,152,169)" },
        }}
        onClick={() => setShow(true)}
      >
        Filters
      </Button>
    </div>
  );
};

export default FilterModal;
