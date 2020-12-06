const { treeController, treeSchema } = require("../controller/tree-controller");
const { searchRepoController, querySchema } = require("../controller/githubRepo-controller");

module.exports = [
     {
          method: "POST",
          path: "/",
          options: {
               handler: treeController,
               description:
                    "Take JSON from the request and convert each child should be placed in the `children` array of its parent",
               notes: "Returns a JSON",
               tags: ["api"],
               validate: {
                    payload: treeSchema,
                    failAction: (request, h, err) => {
                         throw err;
                    },
               },
          },
     },
     {
          method: "GET",
          path: "/",
          options: {
               handler: require("../controller"),
          },
     },

     {
          method: ["POST", "GET"],
          path: "/git",
          options: {
               handler: searchRepoController,
          },
     },
];
