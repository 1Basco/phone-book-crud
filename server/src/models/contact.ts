import { queryDB, queryDBFirst } from "../services/db";

export type Contact = {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

const listContacts = async () => {
  const sql = `SELECT id, first_name as firstName, last_name as lastName, phone_number as phoneNumber FROM contact`;
  const params: any = [];
  const rows = await queryDB(sql, params);
  return rows as Contact[];
};

const insertContact = async (contact: Contact): Promise<any> => {
  const sql = `INSERT INTO contact (first_name, last_name, phone_number) VALUES (?, ?, ?)`;
  const params = [contact.firstName, contact.lastName, contact.phoneNumber];
  await queryDB(sql, params);
  let rows = await queryDB(
    `SELECT seq AS Id FROM sqlite_sequence WHERE  name = 'contact'`
  );
  // check if error
  return getContact(rows[0].Id);
};

const getContact = async (id: number) => {
  const sql = `SELECT id, first_name as firstName, last_name as lastName, phone_number as phoneNumber FROM contact WHERE id = ?`;
  const params = [id];
  const rows = await queryDBFirst(sql, params);
  return rows as Contact | undefined;
};

const deleteContact = async (id: number) => {
  const sql = `DELETE FROM contact WHERE id = ?`;
  const params = [id];
  await queryDB(sql, params);
};

const updateContact = async (contact: Contact) => {
  const sql = `UPDATE contact SET first_name = ?, last_name = ?, phone_number = ? WHERE id = ?`;
  const params = [
    contact.firstName,
    contact.lastName,
    contact.phoneNumber,
    contact.id,
  ];
  await queryDB(sql, params);
  return getContact(contact.id);
};

export const contactModel = {
  listContacts,
  insertContact,
  getContact,
  deleteContact,
  updateContact,
};
