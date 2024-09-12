import Joi from 'joi';
import {itemTotalSchemaJoi} from "./ItemTotal";

// Define the JOI schema for activeOrder
const activeOrderSchemaJoi = Joi.object({
    order_id: Joi.string().max(6).required(),
    name: Joi.string().required(),
    class: Joi.string().max(4).required(),
    phone_number: Joi.string().min(9).max(10).optional(),
    items_total: Joi.array().items(itemTotalSchemaJoi).required(),
    price: Joi.number().required(),
    posted: Joi.boolean(),
});

export { activeOrderSchemaJoi };