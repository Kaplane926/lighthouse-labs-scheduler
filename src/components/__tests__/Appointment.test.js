import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/appointments/index";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<Appointment />);
});