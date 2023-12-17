import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { MdOutlineAddIcCall } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { Contact } from "../../app/entities/contact.entity";
import { AppRoutes } from "../../app/enums/route.enum";
import useContacts from "../../app/hooks/api.hook";
import { EditContactForm } from "../../components/forms/edit-contact";
export function EditContactPage(): JSX.Element {
    const { contactId } = useParams();
    const navigate = useNavigate();
    const { useGetContactByIdQuery } = useContacts();
    const parsedContactId = parseInt(contactId ?? "");

    const { data, isError } = useGetContactByIdQuery(parsedContactId);

    const [contact, setContact] = useState<Contact | undefined>();

    // if not found, redirect to list
    useEffect(() => {
        if (isNaN(parsedContactId)) {
            navigate(AppRoutes.phoneBook);
        }
        if (isError) {
            navigate(AppRoutes.phoneBook);
        }
        if (data) {
            setContact(data as Contact);
        }
    }, [isError, data]);

    return (
        <>
            <Helmet>
                <title>Edit Contact</title>
            </Helmet>
            <div className="w-full max-w-3xl p-8 rounded-md bg-gray-100">
                <section className="flex flex-row mx-auto gap-4 justify-center">
                    <MdOutlineAddIcCall size={36} />
                    <h1 className="text-3xl font-bold text-center">Edit Contact</h1>
                </section>
                <section>{contact && <EditContactForm contact={contact} />}</section>
            </div>
        </>
    );
}
