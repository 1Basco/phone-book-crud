import { FormikValues, useFormik } from "formik";
import InputMask from 'react-input-mask';
import { CreateContactValidationSchema } from "./schema.yup";
import { PrimaryButton } from "../../buttons/primary";
import useContacts from "../../../app/hooks/api.hook";
import { Contact } from "../../../app/entities/contact.entity";
import { AppRoutes } from "../../../app/enums/route.enum";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function CreateContactForm(): JSX.Element {
    const { useCreateContactMutation } = useContacts();
    const { mutate: createContact, isSuccess: isSuccessMutation, isPending } = useCreateContactMutation();
    const navigate = useNavigate();

    const handleSubmit = (values: FormikValues) => {
        const contact = {
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: values.phoneNumber
        } as Contact;

        createContact(contact);
    }
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
        },
        validationSchema: CreateContactValidationSchema,
        onSubmit: (values) => {
            handleSubmit(values);
        },

    });

    useEffect(() => {
        if (isSuccessMutation) {
            navigate(AppRoutes.phoneBook);
        }
    }, [isSuccessMutation])

    return (
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto mt-4">
            <div className="mb-4">
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-600">
                    First Name
                </label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    className={`mt-1 p-2 w-full border ${formik.touched.firstName && formik.errors.firstName
                        ? 'border-red-500'
                        : 'border-gray-300'
                        } rounded-md`}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                    <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
                )}
            </div>

            <div className="mb-4">
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-600">
                    Last Name
                </label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    className={`mt-1 p-2 w-full border ${formik.touched.lastName && formik.errors.lastName
                        ? 'border-red-500'
                        : 'border-gray-300'
                        } rounded-md`}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                    <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
                )}
            </div>

            <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-600">
                    Phone Number
                </label>
                <InputMask
                    mask="999-999-9999"
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phoneNumber}
                    className={`mt-1 p-2 w-full border ${formik.touched.phoneNumber && formik.errors.phoneNumber
                        ? 'border-red-500'
                        : 'border-gray-300'
                        } rounded-md`}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <div className="text-red-500 text-sm">{formik.errors.phoneNumber}</div>
                )}
            </div>

            <PrimaryButton type="submit" title="Create Contact" isLoading={isPending} />
        </form>
    );
}