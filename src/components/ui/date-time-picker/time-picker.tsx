import React from "react";
import { TimeValue } from "react-aria";
import { TimeFieldStateOptions } from "react-stately";
import { TimeField } from "./time-field";

const TimePicker = React.forwardRef<
  HTMLDivElement,
  Omit<TimeFieldStateOptions<TimeValue> & { className?: string }, "locale">
>((props) => {
  return <TimeField {...props} />;
});

TimePicker.displayName = "TimePicker";

export { TimePicker };
