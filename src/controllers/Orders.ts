import { Request, Response } from 'express';
import {  activeOrderSchemaJoi } from "../models/schema/ActiveOrder"
import ActiveOrder from "../models/ActiveOrder"
import {IItemTotal} from "../models/ItemTotal";
import {validate} from "../models/schema/validator";

type OrderItem = "cpn" | "cpd" | "cps" | "cpt" | "cpm" | "cpa" | "trh" | "trmo" | "trhn" | "trd" | "trl" | "trml" | "soc" | "sovq";
const fullItemName: Record<OrderItem, number | string> = {
    cpn: "20k",
    cpd: "20k",
    cps: "25k",
    cpt: "30k",
    cpm: "30k",
    cpa: "20k",
    trh: "15k",
    trmo: "20k",
    trhn: "Trà Hoa Nhài",
    trd: "15k",
    trl: "Lipton",
    trml: "25k",
    soc: "Soda Chanh",
    sovq: "Soda Việt Quất",
};

const getPrice = (key: string) => {
    const validOrderItems = Object.values<OrderItem>(<const>[
        "cpn", "cpd", "cps", "cpt", "cpm", "cpa",
        "trh", "trmo", "trhn", "trd", "trl", "trml",
        "soc", "sovq"
    ]);

    if (!validOrderItems.includes(key as OrderItem)){
        return {
            success: false,
            message: "Invalid Price Key"
        }
    }

    const price = fullItemName[key as OrderItem]

    if (typeof price === "number" && Number.isInteger(price)){
        return {
            success: true,
            price: price
        } // Price is number so proceed
    }
    else if (typeof price === "string"){
        // Price is string so parse k into 1000
        const match = price.match(/^(\d+)k$/);

        // If there's no match, return null (invalid format)
        if (!match) {
            return {
                success: false,
                message: "Invalid Price Format"
            };
        }

        // Extract the number part and append '000' to it
        const numberPart = match[1];
        const parsedPrice = parseInt(numberPart + "000", 10);

        return {
            success: true,
            price: parsedPrice
        }
    }

    return {
        success: false,
        message: "Type of Price isn't string or number"
    }
}

const MakeNewOrder = async (req: Request, res: Response) => {
    const { name, classNum, phone_number, item_total }: { name: string, classNum: string, phone_number: string, item_total: IItemTotal[]} = req.body;

    // TODO: Wait for mappings and map it
    const price = [...item_total.map((item) => {
        const result = getPrice(item.id)

        if (!result.success){
            throw new Error(result.message)
        }

        return result.price!
    })].reduce((a, b) => a + b, 0);

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