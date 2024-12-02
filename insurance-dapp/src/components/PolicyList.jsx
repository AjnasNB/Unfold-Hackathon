import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const PolicyList = ({ policies, onSelectPolicy }) => {
  return (
    <div>
      {policies.map((policy, index) => (
        <Card key={index} style={{ margin: "1rem" }}>
          <CardContent>
            <Typography variant="h5">{policy.name}</Typography>
            <Typography>Coverage: {policy.coverage}</Typography>
            <Typography>Premium: {policy.premium} ETH</Typography>
            <Typography>Payout: {policy.payout}</Typography>
            <Button variant="contained" onClick={() => onSelectPolicy(index + 1)}>
              Purchase
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PolicyList;
