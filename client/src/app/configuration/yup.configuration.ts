import * as YupSettings from "yup";

YupSettings.setLocale({
  mixed: {
    required: "Field is required",
    default: "WIP",
  },
  string: {
    email: "WIP",
    min: "WIP",
    max: "WIP",
  },
  number: {
    min: "WIP",
    max: "WIP",
  },
});

export default YupSettings;
