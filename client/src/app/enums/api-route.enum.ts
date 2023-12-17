const URL = "http://localhost:3000/";
export const ApiRoutes = {
  getContacts: URL,
  createContact: URL,
  getContactById: (id: number) => `${URL}${id}`,
  updateContact: (id: number) => `${URL}${id}`,
  deleteContact: (id: number) => `${URL}${id}`,
};
