import React, { useState } from "react";
import {
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

const CompanySchemeCalculator = ({
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
  // BELOW STATES ARE FOR 2 INPUTS OF COMPANY AND SCHEME

  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedScheme, setSelectedScheme] = useState("");

  // title options drop down
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

  // use state to store the NAV value from the selected scheme and setting it in the state
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
    <div style={{ marginLeft: 6, marginRight: 6 }}>
      <Typography
        variant="subtitle1"
        style={{
          marginTop: "10px",
          padding: "2%",
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Start by selecting a company to discover the schemes available for your
        preference.
      </Typography>

      {/* Imputs for company and scheme  */}
      <Container maxWidth="md" style={{ width: "100%" }}>
        <Paper style={{ padding: "2%" }}>
          <div style={{ display: "flex" }}>
            {/* Title dropdown */}
            <StyledFormControl variant="outlined">
              <InputLabel id="company-label">Company</InputLabel>
              <Select
                labelId="company-label"
                label="Company"
                style={{ maxWidth: 200, overflow: "hidden" }}
                value={selectedTitle}
                onChange={handleTitleChange}
              >
                <MenuItem value="" disabled>
                  Select a Company
                </MenuItem>
                {titleOptions.map((option, index) => (
                  <MenuItem
                    key={index}
                    value={option.value}
                    style={{ maxWidth: 250, whiteSpace: "pre-wrap" }}
                  >
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
                // autoWidth
                style={{ maxWidth: 200, overflow: "hidden" }}
              >
                <MenuItem value="" disabled>
                  Select a Scheme
                </MenuItem>
                {schemeOptions.map((option, index) => (
                  <MenuItem
                    key={index}
                    value={option.value}
                    style={{ maxWidth: 200, whiteSpace: "pre-wrap" }}
                  >
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

      <Typography
        variant="subtitle1"
        style={{
          marginTop: "1%",
          padding: "2%",
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Simply choose between 'Amount' and 'Units' tabs to get the relevant
        results.{" "}
      </Typography>

      <Paper style={TabStyle}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="Amount" value={0} style={TabStyle.tab} />
          <Tab label="Units" value={1} style={TabStyle.tab} />
        </Tabs>
      </Paper>

      {/* Main content for units , amounts and NAV*/}
      <Container maxWidth="md" style={containerStyle}>
        <Paper style={{ padding: "2%", marginTop: "2%" }}>
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
                    ? "Please select a Compay and a Scheme then you can add Amount"
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
                    ? "Please select a Compay and a Scheme then you can add Units"
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
const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginRight: theme.spacing(1),
  marginLeft: theme.spacing(1),
  maxWidth: 160,
  width: "100%",
}));
const TabStyle = {
  display: "flex",
  justifyContent: "center",
  width: "fit-content",
  margin: "auto",
  tab: {
    fontWeight: "bold",
  },
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

export default CompanySchemeCalculator;
