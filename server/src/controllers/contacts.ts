import { Request, Response } from "express";
import { Contact, contactModel } from "../models/contact";
import { badRequest, internalServerError, notFound } from "../services/utils";

const listContacts = ({}: Request, res: Response) => {
  contactModel
    .listContacts()
    .then((contacts) => {
      res.json(contacts as Contact[]);
    })
    .catch((err) => internalServerError(res, err));
};

const insertContact = (req: Request, res: Response) => {
  if (req.body) {
    const contact = req.body;

    if (!contact.firstName || !contact.lastName || !contact.phoneNumber) {
      return badRequest(res, "Missing some fields");
    }
  }

  const contact = req.body as Contact;

  contactModel
    .insertContact(contact)
    .then((contact) => {
      res.json(contact);
    })
    .catch((err) => internalServerError(res, err));
};

const updateContact = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (req.body) {
    const contact = req.body;

    if (!contact.firstName || !contact.lastName || !contact.phoneNumber) {
      return badRequest(res, "Missing some fields");
    }
    const contactSaved = await contactModel.getContact(id);
    if (!contactSaved) return notFound(res);
  }

  const contact = req.body as Contact;
  contact.id = id;
  contactModel
    .updateContact(contact)
    .then((contact) => res.json(contact))
    .catch((err) => internalServerError(res, err));
};

const deleteContact = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (id > 0) {
    contactModel
      .deleteContact(id)
      .then((contact) => res.json(contact))
      .catch((err) => internalServerError(res, err));
  }
};

const getContact = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (id > 0) {
    contactModel
      .getContact(id)
      .then((contact) => {
        if (!contact) return notFound(res);
        return res.json(contact as Contact);
      })
      .catch((err) => internalServerError(res, err));
  }
};

export const contactController = {
  listContacts,
  insertContact,
  updateContact,
  deleteContact,
  getContact,
};
