import { BiSolidContact } from "react-icons/bi";
import useContacts from "../../app/hooks/api.hook";
import { useEffect, useState } from "react";
import { Contact } from "../../app/entities/contact.entity";
import { CardItem } from "../../components/card-item";
import { DeleteButton } from "../../components/buttons/delete";
import { Card } from "../../components/card";
import SearchForm from "../../components/forms/search";
import { PrimaryButton } from "../../components/buttons/primary";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../app/enums/route.enum";
import { Helmet } from "react-helmet";
export function ListContacts(): JSX.Element {
    const { useGetContactsQuery, useDeleteContactMutation } = useContacts();
    const { data, isSuccess } = useGetContactsQuery();
    const { mutate: deleteContact, isPending: isDeleting } = useDeleteContactMutation();
    const navigate = useNavigate();

    const [contacts, setContacts] = useState<Array<Contact>>([]);

    useEffect(() => {
        if (isSuccess) {
            setContacts(data || []);
        }
    }, [data, isSuccess]);

    const handleDelete = (contactId: number) => {
        deleteContact(contactId);
    };

    const handleSearch = (searchResult: Contact[]) => {
        if (searchResult) {
            setContacts(searchResult);
        }
    };

    return (
        <>
            <Helmet><title>Phone Book App</title></Helmet>
            <div className="w-full max-w-3xl p-8 rounded-md bg-gray-100">
                <section className="flex flex-row mx-auto gap-4 justify-center">
                    <BiSolidContact size={36} />
                    <h1 className="text-3xl font-bold text-center">Phone Book App</h1>
                </section>
                <section className="mt-8">
                    <div className="flex flex-row justify-between my-4">
                        <h2 className="text-2xl font-semibold">Contacts</h2>{" "}
                        <PrimaryButton
                            title="Add Contact"
                            startIcon={<FaPlus />}
                            onClick={() => {
                                navigate(AppRoutes.createContact)
                            }}
                        />
                    </div>
                    <div>
                        <SearchForm data={data} handleSearch={handleSearch} />
                    </div>
                </section>
                <section>
                    {contacts.length > 0 ? (
                        <Card>
                            {contacts.map((contact, index) => {
                                return (
                                    <CardItem
                                        key={contact.id}
                                        itemName={`${contact.firstName} ${contact.lastName}`}
                                        itemPhoneNumber={contact.phoneNumber}
                                        itemId={contact.id}
                                        isLastItem={index === contacts.length - 1}
                                        button={
                                            <DeleteButton onClick={() => handleDelete(contact.id)} disabled={isDeleting} />
                                        }
                                    />
                                );
                            })}
                        </Card>
                    ) : (<p className="text-center text-2xl font-semibold mt-4">No contacts found =( </p>)}
                </section>
            </div>
        </>
    );
}
