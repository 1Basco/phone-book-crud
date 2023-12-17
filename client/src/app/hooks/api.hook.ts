import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { Contact } from "../entities/contact.entity";
import { ApiRoutes } from "../enums/api-route.enum";
import { ToastProvider } from "../providers/toast.provider";

const toast = new ToastProvider();
const getContacts = async (): Promise<Contact[]> => {
  const response = await fetch(ApiRoutes.getContacts);
  const data = await response.json();
  return data;
};

const getContactById = async (id: number): Promise<Contact | Response> => {
  const response = await fetch(ApiRoutes.getContactById(id));
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  if (response.status === 404) {
    toast.error("Contact not found!");
    return Promise.reject(await response.json());
  }
  return Promise.reject(await response.json());
};

const createContact = async (contact: Contact): Promise<Response> => {
  const response = await fetch(ApiRoutes.createContact, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });
  if (response.ok) {
    toast.success("Contact created successfully!");
    return response;
  }
  toast.error("Phone Number already in use!");
  return Promise.reject(await response.json());
};

const updateContact = async ({
  id,
  updatedContact,
}: {
  id: number;
  updatedContact: Contact;
}): Promise<Response> => {
  const response = await fetch(ApiRoutes.updateContact(id), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedContact),
  });
  if (response.ok) {
    toast.success("Contact updated successfully!");
    const data = await response.json();
    return data;
  }
  if (response.status === 500) {
    toast.error("Phone Number already in use!");
    return Promise.reject(await response.json());
  }
  toast.error(await response.json());
  return Promise.reject(await response.json());
};

const deleteContact = async (id: number): Promise<Response> => {
  const response = await fetch(ApiRoutes.deleteContact(id), {
    method: "DELETE",
  });
  if (response.ok) {
    toast.success("Contact deleted successfully!");
    return response;
  }
  return Promise.reject(await response.json());
};

const useContacts = () => {
  const queryClient = useQueryClient();
  return {
    useGetContactsQuery: () =>
      useQuery({ queryKey: ["contacts"], queryFn: () => getContacts() }),
    useGetContactByIdQuery: (id: number) =>
      useQuery({
        queryKey: ["contact", id],
        queryFn: () => getContactById(id),
        retry: false,
      }),
    useCreateContactMutation: () =>
      useMutation({
        mutationFn: (contact: Contact) => createContact(contact),
        onSuccess: () =>
          queryClient.invalidateQueries({ queryKey: ["contacts"] }),
      }),
    useUpdateContactMutation: () =>
      useMutation({
        mutationFn: (contact: Contact) =>
          updateContact({ id: contact.id, updatedContact: contact }),
        onSuccess: () =>
          queryClient.invalidateQueries({ queryKey: ["contacts"] }),
      }),
    useDeleteContactMutation: () =>
      useMutation({
        mutationFn: (id: number) => deleteContact(id),
        onSuccess: () =>
          queryClient.invalidateQueries({ queryKey: ["contacts"] }),
      }),
  };
};

export default useContacts;
