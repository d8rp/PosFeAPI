import Joi from 'joi';

// Define the JOI schema for itemTotal
const itemTotalSchemaJoi = Joi.object({
    id: Joi.string().valid(
        'cpn', 'cpd', 'cps', 'cpt', 'cpm', 'cpa',
        'trh', 'trmo', 'trhn', 'trd', 'trl', 'trml',
        'soc', 'sovq'
    ).required(),
    state: Joi.string().valid('hot', 'cold').required(),
    number: Joi.number().required(),
});

export { itemTotalSchemaJoi };