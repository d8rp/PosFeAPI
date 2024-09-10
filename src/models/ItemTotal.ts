import { Schema } from "mongoose";

type OrderItem = "cpn" | "cpd" | "cps" | "cpt" | "cpm" | "cpa" | "trh" | "trmo" | "trhn" | "trd" | "trl" | "trml" | "soc" | "sovq";
interface IItemTotal {
    id: OrderItem;
    fullName: string;
    state: "hot" | "cold";
    number: number;
}

const itemTotalSchema = new Schema({
    id: {
        type: String,
        enum: ["cpn" , "cpd" , "cps" , "cpt" , "cpm" , "cpa" , "trh" , "trmo" , "trhn" , "trd" , "trl" , "trml" , "soc" , "sovq"],
        required: true,
    },
    fullName: {
        type: String,
    },
    state: {
        type: String,
        enum: ["hot", "cold"],
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
});

const fullItemName: Record<OrderItem, string> = {
    cpn: "Cà phê nâu",
    cpd: "Cà phê đen",
    cps: "Cà phê sữa",
    cpt: "Cà phê trứng",
    cpm: "Cà phê muối",
    cpa: "Americano",
    trh: "Hồng Trà",
    trmo: "Trà Mật Ong",
    trhn: "Trà Hoa Nhài",
    trd: "Trà Đá",
    trl: "Lipton",
    trml: "Matcha Latte",
    soc: "Soda Chanh",
    sovq: "Soda Việt Quất",
};

itemTotalSchema.pre("save", function(next){
    this.fullName = fullItemName[this.id as OrderItem];

    next()
})

export {itemTotalSchema, IItemTotal}