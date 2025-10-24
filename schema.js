const Joi = require("joi");


module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.object({
      url: Joi.string().allow("").required(),
      filename: Joi.string().allow("").optional()
    }).optional(),
    price: Joi.number().required().min(0),
    location: Joi.string().required(),
    country: Joi.string().required(),
    rooms: Joi.number().required().min(1), // added rooms
    categories: Joi.array().items(Joi.string().valid(
      "Trending",
      "Rooms",
      "Iconic Cities",
      "Nature",
      "Beaches",
      "Mountains",
      "Swimming Pools",
      "Castles",
      "Camping",
      "Ski Resorts",
      "Vineyards"
    )).required() // added categories
  }).required()
});
