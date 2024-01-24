import React from "react";
import {
  Typography,
  Container,
  Paper,
  Tabs,
  Tab,
  TextField,
} from "@mui/material";

const SimpleCalculator = ({
  navData,
  calculateUnits,
  calculateAmount,
  selectedTab,
  amountInput,
  setAmountInput,
  unitsInput,
  setUnitsInput,
  handleTabChange,
}) => {
  // to get the required data
  function getNav(navData, schemeName) {
    // Find the scheme and get its nav value
    const companyName = navData.find((companyScheme) => {
      const foundScheme = companyScheme.schemes.find(
        (scheme) => scheme.schemeName === schemeName
      );
      return foundScheme !== undefined;
    });

    if (companyName) {
      // Return the nav value
      return companyName.schemes.find((s) => s.schemeName === schemeName).nav;
    } else {
      console.log(`NAV not found for '${schemeName}'.`);
      return null;
    }
  }
  //   the nav value from data
  const navValue = getNav(navData, "Motilal Oswal Liquid Fund - Direct Growth");

  //   AMOUNT INPUT FUNCTION
  const handleAmountInputChange = (event) => {
    const value = event.target.value;
    setAmountInput(value);
    // see the value
    if (!isNaN(value)) {
      const calculatedUnits = calculateUnits(parseFloat(value), navValue);
      // after the calculation to check if the the is valid
      if (!isNaN(calculatedUnits)) {
        const roundedUnits = calculatedUnits.toFixed(2);
        setUnitsInput(roundedUnits.toString());
      } else {
        setUnitsInput("");
      }
    } else {
      setUnitsInput("");
    }
  };

  //   UNIT INPUT FUCNTION
  const handleUnitsInputChange = (event) => {
    const value = event.target.value;
    setUnitsInput(value);
    // see the value
    if (!isNaN(value)) {
      const calculatedAmount = calculateAmount(parseFloat(value), navValue);
      // after the calculation to check if the the is valid
      if (!isNaN(calculatedAmount)) {
        const roundedAmount = calculatedAmount.toFixed(2);
        setAmountInput(roundedAmount.toString());
      } else {
        setAmountInput("");
      }
    } else {
      setAmountInput("");
    }
  };

  return (
    <div style={{ marginLeft: 6, marginRight: 6 }}>
      <Typography
        variant="subtitle1"
        style={{
          //   marginTop: "1%",
          padding: "1%",
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        ( Explore the NAV (Net Asset Value) of Motilal Oswal Liquid Fund -
        Direct Growth. )
      </Typography>

      <Typography
        variant="subtitle1"
        style={{
          //   marginTop: "1%",
          padding: "1%",
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Simply choose between 'Amount' and 'Units' tabs to get the relevant
        results.
      </Typography>
      <Paper style={TabStyle}>
        <Tabs value={selectedTab} onChange={handleTabChange} TabIndicatorProps>
          <Tab label="Amount" value={0} style={TabStyle.tab} />
          <Tab label="Units" value={1} style={TabStyle.tab} />
        </Tabs>
      </Paper>

      {/* Main content for units , amounts and NAV*/}
      <Container maxWidth="md" style={containerStyle}>
        <Paper style={{ padding: "20px", marginTop: "20px" }}>
          <div style={rowContainerStyle}>
            {selectedTab === 0 && (
              <TextField
                label="Enter Amount"
                variant="outlined"
                fullWidth
                value={amountInput}
                type="number"
                inputProps={{ pattern: "[0-9]*" }}
                onChange={handleAmountInputChange}
                style={columnChildStyle}
                helperText="Enter the Amount"
              />
            )}
            {selectedTab === 1 && (
              <TextField
                label="Enter Units"
                variant="outlined"
                fullWidth
                style={columnChildStyle}
                value={unitsInput}
                type="number"
                inputProps={{ pattern: "[0-9]*" }}
                onChange={handleUnitsInputChange}
                helperText="Enter the Units"
              />
            )}

            <TextField
              label="NAV"
              variant="outlined"
              fullWidth
              value={navValue}
              InputProps={{
                readOnly: true,
                style: { outline: "none" },
              }}
              style={columnChildStyle}
            />
          </div>

          {selectedTab !== undefined && (
            <TextField
              label={` ${selectedTab === 0 ? "Units" : "Amount"}`}
              InputProps={{
                style: { outline: "none" },
              }}
              variant="outlined"
              disabled
              fullWidth
              value={selectedTab === 0 ? unitsInput : amountInput}
              style={resultStyle}
              sx={{
                "& .MuiInputBase-input.MuiOutlinedInput-input.Mui-disabled": {
                  opacity: 1,
                  WebkitTextFillColor: "#1976d2",
                  fontWeight: "bold",
                  fontSize: 20,
                },
              }}
            />
          )}
        </Paper>

        <div style={{ display: "flex", padding: "3%" }}>
          {selectedTab !== undefined && (
            <TextField
              label={` ${selectedTab === 0 ? "Total Units" : "Total Amount"}`}
              InputProps={{
                style: { outline: "none" },
              }}
              variant="outlined"
              disabled
              fullWidth
              value={selectedTab === 0 ? unitsInput : amountInput}
              style={resultStyle}
              helperText={selectedTab === 0 ? "Total Units" : "Total Amount"}
              sx={{
                "& .MuiInputBase-input.MuiOutlinedInput-input.Mui-disabled": {
                  opacity: 1,
                  WebkitTextFillColor: "#1976d2",
                  fontWeight: "bold",
                  fontSize: 20,
                },
              }}
            />
          )}
        </div>
      </Container>
    </div>
  );
};

// styles here
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const TabStyle = {
  display: "flex",
  justifyContent: "center",
  width: "fit-content",
  margin: "auto",
  tab: {
    fontWeight: "bold",
  },
};

const rowContainerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
};

const columnChildStyle = {
  width: "48%",
};
const resultStyle = {
  flex: 1,
  marginTop: "6%",
  color: "#2243b6",
};

export default SimpleCalculator;
