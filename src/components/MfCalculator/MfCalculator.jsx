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
  FormHelperText,
} from "@mui/material";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  styled,
} from "@mui/material";

import { useSelector } from "react-redux";

const MfCalculator = () => {
  //  function to calculate 'units'
  function calculateUnits(amount, nav) {
    return amount / nav;
  }

  // function to calculate 'amount'
  function calculateAmount(units, nav) {
    return units * nav;
  }

  // NAV VALUE FROM DATA -----------------

  const navData = useSelector((state) => state.navData);
  console.log(navData, "navDatafromstore");

  const [selectedTab, setSelectedTab] = useState(0);
  const [amountInput, setAmountInput] = useState("");
  const [unitsInput, setUnitsInput] = useState("");

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setAmountInput("");
    setUnitsInput("");
  };

  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedScheme, setSelectedScheme] = useState("");

  const titleOptions = navData?.map((titleData) => ({
    key: titleData?.id,
    value: titleData.title,
    label: titleData.title,
    schemes: titleData.schemes,
  }));

  // Options for the schemes dropdown
  const schemeOptions = selectedTitle
    ? titleOptions
        .find((title) => title.value === selectedTitle)
        ?.schemes.map((scheme) => ({
          value: scheme.nav,
          label: scheme.schemeName,
          key: scheme.schemeCode,
        }))
    : [];

  const handleTitleChange = (event) => {
    const selectedTitle = event.target.value;
    setSelectedTitle(selectedTitle);
    // making it empty unitll the title is selected and then the scheme funciton below
    setSelectedScheme("");
  };

  const [selectedSchemeNav, setSelectedSchemeNav] = useState(null);

  const handleSchemeChange = (event) => {
    const selectedSchemeValue = event.target.value;
    const selectedSchemeObject = schemeOptions.find(
      (scheme) => scheme.value === selectedSchemeValue
    );
    const newValue = selectedSchemeObject ? selectedSchemeObject.value : null;
    setSelectedSchemeNav(newValue);

    setSelectedScheme(selectedSchemeValue);
  };

  // SELECTED FROM THE SELECTED SCHEME THIS NAV VALUE IS BEING USED IN THE CALCULATION ---------------------
  const navValue = selectedSchemeNav;

  // CORS policy not working

  // ("https://www.amfiindia.com/spages/NAVAll.txt?t=18022020035513")

  // CORS POLICY ISSUE COPY DATA CREATED IN DATA/DATA.JSON

  // AMOUNT INPUT FUNCTION
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

  // UNIT INPUT FUCNTION
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
    <div>
      {/* Header */}
      <AppBar position="static" style={appBarStyle}>
        <Toolbar>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Liquid MF Calculator
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ marginLeft: "2%", marginRight: "2%", paddingBottom: "5%" }}>
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

        <Typography
          variant="subtitle1"
          style={{
            marginTop: "10px",
            padding: "2%",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Start by selecting a company to discover the schemes available for
          your preference.
        </Typography>

        <Container maxWidth="md" style={{ width: "100%" }}>
          <Paper style={{ padding: "20px", marginTop: "20px" }}>
            <div style={{ display: "flex" }}>
              <StyledFormControl variant="outlined">
                <InputLabel id="company-label">Company</InputLabel>
                <Select
                  labelId="company-label"
                  label="Company"
                  autoWidth
                  value={selectedTitle}
                  onChange={handleTitleChange}
                >
                  <MenuItem value="" disabled>
                    Select a Company
                  </MenuItem>
                  {titleOptions.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {!selectedTitle ? "Please select a company first." : ""}
                </FormHelperText>
              </StyledFormControl>

              {/* Schemes Dropdown */}
              <StyledFormControl variant="outlined">
                <InputLabel id="scheme-label" style={{ whiteSpace: "normal" }}>
                  Scheme
                </InputLabel>
                <Select
                  labelId="scheme-label"
                  label="Scheme"
                  value={selectedScheme}
                  onChange={handleSchemeChange}
                  disabled={!selectedTitle}
                  autoWidth
                >
                  <MenuItem value="" disabled>
                    Select a Scheme
                  </MenuItem>
                  {schemeOptions.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {!selectedTitle ? "Please select a Scheme." : ""}
                </FormHelperText>
              </StyledFormControl>
            </div>
          </Paper>
        </Container>

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
                  disabled={!selectedTitle || !selectedScheme}
                  helperText={
                    !selectedTitle || !selectedScheme
                      ? "Please select a Compay and a Scheme"
                      : ""
                  }
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
                  disabled={!selectedTitle || !selectedScheme}
                  helperText={
                    !selectedTitle || !selectedScheme
                      ? "Please select a Compay and a Scheme"
                      : ""
                  }
                />
              )}

              <TextField
                label="NAV"
                variant="outlined"
                fullWidth
                value={selectedScheme ? selectedScheme : ""}
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
    </div>
  );
};

// STYLES ARE DEFINED HERE -------------------
const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginRight: theme.spacing(1),
  marginLeft: theme.spacing(1),
  minWidth: 150,
  width: "100%",
}));

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

export default MfCalculator;
