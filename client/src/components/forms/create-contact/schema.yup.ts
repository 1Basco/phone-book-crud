import * as Yup from "yup";
import YupSettings from "../../../app/configuration/yup.configuration";

export const CreateContactValidationSchema = YupSettings.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{3}-\d{3}-\d{4}$/, "Invalid phone number")
    .required("Phone Number is required"),
});
