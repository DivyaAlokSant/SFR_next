"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export default function CenteredTabs({ tabs, value, onChange }) {
  return (
    <Box sx={{ width: "100%", bgcolor: "transparent", display: "flex", justifyContent: "center" }}>
      <Tabs
        value={value}
        onChange={onChange}
        centered
        textColor="primary"
        indicatorColor="primary"
        sx={{ minHeight: 48 }}
      >
        {tabs.map((tab, idx) => (
          <Tab key={tab.label} label={tab.label} sx={{ minWidth: 120, fontWeight: 600 }} />
        ))}
      </Tabs>
    </Box>
  );
}