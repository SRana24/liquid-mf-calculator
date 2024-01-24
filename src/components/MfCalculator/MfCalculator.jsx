import React, { useState } from "react";
import { Toolbar, Typography, Paper, Tabs, Tab } from "@mui/material";
import CompanySchemeCalculator from "./CompanySchemeCalculator";
import SimpleCalculator from "./SimpleCalculator";

import { useSelector } from "react-redux";

const MfCalculator = () => {
  const [initialTab, setInitialTab] = useState(0);
  const handleInitialTab = (_, newValue) => {
    setInitialTab(newValue);
  };

  //  function to calculate 'units'
  function calculateUnits(amount, nav) {
    return amount / nav;
  }

  // function to calculate 'amount'
  function calculateAmount(units, nav) {
    return units * nav;
  }

  //DATA FROM STORE  -----------------
  const navData = useSelector((state) => state.navData);

  const [selectedTab, setSelectedTab] = useState(0);
  const [amountInput, setAmountInput] = useState("");
  const [unitsInput, setUnitsInput] = useState("");

  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
    setAmountInput("");
    setUnitsInput("");
  };

  // CORS policy not working

  // ("https://www.amfiindia.com/spages/NAVAll.txt?t=18022020035513")

  // CORS POLICY ISSUE COPY DATA CREATED IN DATA/DATA.JSON

  return (
    // <div>
    <>
      {/* Header */}

      <div style={appBarStyle}>
        <Toolbar>
          <Typography
            variant="h6"
            style={{ fontWeight: "bold", color: "#fff" }}
          >
            Liquid MF Calculator
          </Typography>
        </Toolbar>
      </div>

      <div style={containerStyle}>
        <div>
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
            informed decisions by providing insights into the expected outcomes
            of their liquid fund investments.{" "}
            <Typography style={{ fontWeight: "600" }}>
              Choose between the 'Simple Calculator' for quick calculations or
              the 'Company & Scheme' tab to explore and select specific
              companies and their schemes, and get the results.
            </Typography>
          </Typography>
        </div>

        <Paper style={TabStyle}>
          <Tabs value={initialTab} onChange={handleInitialTab}>
            <Tab label="Simple Calculator" value={0} style={TabStyle.tab} />
            <Tab label="Company & Scheme" value={1} style={TabStyle.Tab} />
          </Tabs>
        </Paper>

        {initialTab === 0 && (
          <SimpleCalculator
            navData={navData}
            calculateUnits={calculateUnits}
            calculateAmount={calculateAmount}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            amountInput={amountInput}
            setAmountInput={setAmountInput}
            unitsInput={unitsInput}
            setUnitsInput={setUnitsInput}
            handleTabChange={handleTabChange}
          />
        )}
        {initialTab === 1 && (
          <CompanySchemeCalculator
            navData={navData}
            calculateUnits={calculateUnits}
            calculateAmount={calculateAmount}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            amountInput={amountInput}
            setAmountInput={setAmountInput}
            unitsInput={unitsInput}
            setUnitsInput={setUnitsInput}
            handleTabChange={handleTabChange}
          />
        )}
      </div>
    </>
    // </div>
  );
};

// STYLES ARE DEFINED HERE -------------------

const appBarStyle = {
  backgroundColor: "#1976d2",
  height: 90,
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  width: "100%",
  display: "flex",
  top: 0,
  zIndex: 1000,
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

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2%",
  marginTop: 64,
};

export default MfCalculator;
