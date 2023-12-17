import { useFormik } from "formik";
import { useState } from "react";
import { Contact } from "../../../app/entities/contact.entity";
import { FaSearch } from "react-icons/fa";

interface SearchFormProps {
    data: Contact[] | undefined;
    handleSearch: (results: Contact[]) => void;
}
const SearchForm = ({ data, handleSearch }: SearchFormProps) => {
    const [searchTerm, setSearchTerm] = useState("");

    const formik = useFormik({
        initialValues: {
            search: "",
        },
        onSubmit: (values) => {
            const filteredResults = data?.filter((item) =>
                item.lastName.toLowerCase().includes(values.search.toLowerCase())
            );
            handleSearch(filteredResults || []);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="relative">
                <input
                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-10 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                    type="text"
                    id="search"
                    name="search"
                    placeholder="Search for contact by last name..."
                    onChange={(e) => {
                        formik.handleChange(e);
                        setSearchTerm(e.target.value);
                        formik.submitForm();
                    }}
                    value={searchTerm}
                />
                <div className="absolute text-gray-400 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch size={18} />
                </div>
            </div>
        </form>
    );
};

export default SearchForm;
