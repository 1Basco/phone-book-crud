import { Helmet } from "react-helmet";
import { CreateContactForm } from "../../components/forms/create-contact";
import { MdOutlineAddIcCall } from "react-icons/md";
export function CreateContactPage(): JSX.Element {
    return <>
        <Helmet><title>Create Contact</title></Helmet>
        <div className="w-full max-w-3xl p-8 rounded-md bg-gray-100">
            <section className="flex flex-row mx-auto gap-4 justify-center">
                <MdOutlineAddIcCall size={36} />
                <h1 className="text-3xl font-bold text-center">Create Contact</h1>
            </section>
            <section>
                <CreateContactForm />
            </section>
        </div>
    </>;
}