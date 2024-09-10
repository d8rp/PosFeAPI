import mongoose, { Schema } from "mongoose";
import {itemTotalSchema} from "./ItemTotal";

const activeOrder = new Schema({
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
        default: false,
    },
});

/**
 * Generates a unique 6-character hexadecimal string.
 *
 * @returns {string} The unique hexadecimal string.
 */
function Uid(): string {
    // Generate a random 6-character hexadecimal string
    return Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
}

activeOrder.pre("save", function(){
    if (this.isNew) {
        this.order_id = Uid();
        console.log('A new order is being created:', this.order_id);
    }
})

export = mongoose.model("active-orders", activeOrder);