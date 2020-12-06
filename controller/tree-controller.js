const Joi = require("joi");

// const data = require("../test/input.json");

/**
 * Retrieves each objects from the JSON payload.
 * @method
 * @param {JSON} payload  - This is the payload from the API POST request.
 * @returns {Object[]} -  Array contains all the individual objects.
 */

const seperateEachObject = (payload) => {
     // Initialize array to hold each object.
     let eachObject = [];
     //Getting all the keys from the payload object.
     for (const key in payload) {
          // Spread operator will convert array into object and push() will add them to the eachObject array.
          eachObject.push(...payload[key]);
     }
     return eachObject;
};

/**
 *
 * @param {*} root
 * @param {*} object
 */

function parseNode(root, object) {
     // Getting all the children from the object.
     let children = object.filter((element) => element.parent_id === root.id);

     //Adding the children to the root's children array.
     root.children = children;

     //This is the  base case for recursive function.
     if (children) {
          children.map((child) => parseNode(child, object));
     }
     return root;
}

/**
 *
 * Parsing data from the request object and passing it to the output generator function.
 * @returns {Object} - Returns the JSON Object as per the specification.
 * @param {Request} request - This is the request object from the hapi.js server.
 * @param {*} optional
 *
 */

module.exports.treeController = (request, h) => {
     const body = request.payload;

     const seperatedObject = seperateEachObject(body);

     const getParentNode = seperatedObject.find((element) => element.parent_id === null);

     const result = parseNode(getParentNode, seperatedObject);

     if (result) {
          let response = h.response(result);
          response.code(200);
          return response;
     } else {
          return h.response({ response: "Please check the JSON input" }).code(400);
     }
};

/**
 *
 * This is the schema for Joi which is a data validator for Javascript.
 * Schema for each object element in the JSON payload are mentioned below.
 *
 */

const elementSchema = Joi.array()
     .items(
          Joi.object({
               id: Joi.number(),
               title: Joi.string(),
               level: Joi.number(),
               children: Joi.array(),
               parent_id: Joi.number().allow(null),
          })
     )
     .label("Each-item-in-JSON");

module.exports.treeSchema = treeSchema = Joi.object({
     0: elementSchema,
     1: elementSchema,
     2: elementSchema,
}).label("Schema-for-the-JSON");
