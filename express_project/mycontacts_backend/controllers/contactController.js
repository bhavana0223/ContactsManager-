const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModels");

//@desc Get all the contacts
//@router GET /api/contacts
//access :private
const getAllContacts = asyncHandler(async(request, response) => {
    console.log("Fetching contacts...");
    const allContacts = await Contact.find({ user_id: request.user.id });
    console.log("Fetched:", allContacts);

    response.status(200).json(allContacts);
});

//@desc Create a contact
//@router POST /api/contacts
//access :private
const createContact = asyncHandler(async(request, response) => {
    console.log(request.body);
    const { name, email, phone } = request.body;
    if (!name || !email || !phone) {
        response.status(400);
        throw new Error("All Feilds are mandatory !");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: request.user.id,
    });

    response.status(201).json(contact);
});

//@desc Get a contact
//@router GET /api/contacts/:id
//access :private
const getContact = asyncHandler(async(request, response) => {
    //console.log("Inside getContact");
    const contact = await Contact.findById(request.params.id);
    //console.log(`fetched ${contact}`);fetched null
    if (!contact) {
        //console.log(`fetched ${contact}`);fetched null
        response.status(404);
        throw new Error("Contact not found");
    }
    console.log(response.statusCode);
    s

    response.status(200).json(contact);
});

//@desc update a contact
//@router PUT /api/contacts/:id
//access :private
const updateContact = asyncHandler(async(request, response) => {
    const contact = await Contact.findById(request.params.id);
    if (!contact) {
        response.status(404);
        throw new Error("Contact not found");
    }
    //console.log(contact.user_id.toString());
    //console.log(request.user.id);
    if (contact.user_id.toString() !== request.user.id) {
        response.status(403);
        throw new Error("User cannot have access to update other users contacts");
    }
    const updateContact = await Contact.findByIdAndUpdate(
        request.params.id,
        request.body, { new: true }
    );

    response.status(200).json(updateContact);
});

//@desc Delete a contact
//@router GET /api/contacts/:id
//access :private
const deleteContact = asyncHandler(async(request, response) => {
    const contact = await Contact.findById(request.params.id);
    if (!contact) {
        response.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== request.user.id) {
        response.status(403);
        throw new Error("User cannot have access to delete other users contacts");
    }
    await Contact.findByIdAndDelete(request.params.id);
    response.status(200).json(contact);
});

module.exports = { getAllContacts, getContact, createContact, updateContact, deleteContact };