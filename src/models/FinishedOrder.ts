import mongoose, { Schema } from "mongoose";
import {itemTotalSchema} from "./ItemTotal";

const finishedOrder = new Schema({
    order_id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: false,
    },
    items_total: {
        type: [itemTotalSchema],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    posted: {
        type: Boolean,
        required: true,
    },
    status: {
        type: String,
        enum: ["cancelled", "completed"],
        required: true,
    },
    completion_time: {
        type: Number,
        default: Math.floor(Date.now()/1000),
        required: true,
    },
});

export = mongoose.model("finished-orders", finishedOrder);