import React from 'react';
import { render } from "@testing-library/react";
import App from "./App";


test("render page header", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Comparison chart/i);
  expect(linkElement).toBeInTheDocument();
});


