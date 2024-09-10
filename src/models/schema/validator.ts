import { StatusCodes } from "http-status-codes";
import { Schema } from "joi";

// Function to validate the request body
const validate = (Schema: Schema, body: any) => {
    const { error } = Schema.validate(body, { abortEarly: false });

    if (error) {
        const errorMessages = error.details
            .map((detail) => detail.message)
            .join(", ");
        return {
            status: StatusCodes.BAD_REQUEST,
            success: false,
            message: `Validation errors: ${errorMessages}`,
        };
    }

    return {
        status: StatusCodes.OK,
        success: true,
        message: "Validation successful",
    };
};

export { validate };