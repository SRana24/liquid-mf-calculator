import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Tabs,
  Tab,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";

// Function to calculate 'units'
function calculateUnits(amount, nav) {
  return amount / nav;
}

// Function to calculate 'amount'
function calculateAmount(units, nav) {
  return units * nav;
}

const MfCalculator = () => {
  const navData = useSelector((state) => state.navData);
  console.log(navData, "navDatafromstore");

  function getNav(navData, schemeName) {
    // Finding the particular scheneName
    const nav =
      navData
        .flatMap((brand) => brand.schemes)
        .find((scheme) => scheme.schemeName === schemeName)?.nav ?? null;

    if (nav !== null) {
      // searching the nav value
      return nav;
    } else {
      return null;
    }
  }

  //  usage
  const Value = getNav(navData, "Motilal Oswal Liquid Fund - Direct Growth");

  if (Value !== null) {
    console.log(Value);
  }

  const [selectedTab, setSelectedTab] = useState(0);
  const [amountInput, setAmountInput] = useState("");
  const [unitsInput, setUnitsInput] = useState("");

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setAmountInput("");
    setUnitsInput("");
  };

  // const apicall = async () => {
  //   await fetch("https://www.amfiindia.com/spages/NAVAll.txt?t=18022020035513")
  //     .then((res) => {
  //       setdata(res);
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       setdataerr(error);
  //       console.log(dataerr);
  //     });
  // };

  // useEffect(() => {
  //   apicall();
  // }, []);
  // CORS POLICY ISSUE COPY DATA CREATED IN DATA/DATA.JSON

  const navValue = Value;

  const appBarStyle = {
    backgroundColor: "#4CAF50",
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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

  const handleAmountInputChange = (event) => {
    const value = event.target.value;
    setAmountInput(value);
    // Checking the value
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

  const handleUnitsInputChange = (event) => {
    const value = event.target.value;
    setUnitsInput(value);
    // Checking the value
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
    <div>
      {/* Header */}
      <AppBar position="static" style={appBarStyle}>
        <Toolbar>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Liquid MF Calculator
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ marginLeft: "2%", marginRight: "2%" }}>
        <Typography
          variant="subtitle1"
          style={{
            marginTop: "10px",
            padding: "2%",
          }}
        >
          A Liquid Mutual Fund (MF) calculator is a financial tool that helps
          investors estimate potential returns from investing in liquid mutual
          funds. Liquid funds focus on short-term, highly liquid assets. The
          calculator considers factors like investment amount, duration, and
          interest rates to project returns. It assists investors in making
          informed decisions by providing insights into the expected outcomes of
          their liquid fund investments.{" "}
          <Typography style={{ fontWeight: "600" }}>
            Simply choose between 'Amount' and 'Units' tabs, and watch as the
            results dynamically update to match your selection.
          </Typography>
        </Typography>

        <Paper style={{ display: "flex", justifyContent: "center" }}>
          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab label="Amount" value={0} />
            <Tab label="Units" value={1} />
          </Tabs>
        </Paper>

        {/* Main Content */}
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
              />
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default MfCalculator;
