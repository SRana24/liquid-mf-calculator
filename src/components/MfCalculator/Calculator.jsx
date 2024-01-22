import React, { useState } from "react";
import { TextField, Switch, FormControlLabel } from "@mui/material";

const Calculator = () => {
  const [isAmountEnabled, setIsAmountEnabled] = useState(true);

  const handleSwitchChange = () => {
    setIsAmountEnabled(!isAmountEnabled);
  };

  return (
    <div style={{ padding: "5%", alignItems: "center" }}>
      <FormControlLabel
        control={
          <Switch
            checked={isAmountEnabled}
            onChange={handleSwitchChange}
            color="primary"
          />
        }
        label={isAmountEnabled ? "Amount" : "Units"}
      />
      <TextField
        label={isAmountEnabled ? "Amount" : "Units"}
        type="number"
        variant="outlined"
        disabled={!isAmountEnabled}
        // You can add other props or styling as needed
      />
      {/* Add more components or logic as required */}
    </div>
  );
};

export default Calculator;
