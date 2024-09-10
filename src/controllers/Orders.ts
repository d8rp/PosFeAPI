import { Request, Response } from 'express';
import {  activeOrderSchemaJoi } from "../models/schema/ActiveOrder"
import {  finsihedOrderSchemaJoi } from "../models/schema/FinishedOrder"
import ActiveOrder from "../models/ActiveOrder"
import FinishedOrder from "../models/FinishedOrder"
import {IItemTotal} from "../models/ItemTotal";
import {validate} from "../models/schema/validator";

const MakeNewOrder = async (req: Request, res: Response) => {
    const { name, classNum, phone_number, item_total } = req.body;

    // TODO: Wait for mappings and map it
    const price = null;

    const orderToAdd = { name, class: classNum, phone_number, item_total, price }

    const validateResult = validate(activeOrderSchemaJoi, this)
    if (!validateResult.success) {
        res.status(validateResult.status).json({
            success: validateResult.success,
            message: validateResult.message
        });
    }

    const newActiveOrder = new ActiveOrder(orderToAdd)
    await newActiveOrder.save()
}

const CancelOrder = (req: Request, res: Response) => {}

export {MakeNewOrder, CancelOrder}