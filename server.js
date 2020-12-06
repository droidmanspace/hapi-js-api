"use strict";

const Hapi = require("@hapi/hapi");
const Vision = require("@hapi/vision");
const Inert = require("@hapi/inert");
const HapiSwagger = require("hapi-swagger");
const Handlebars = require("handlebars");

Handlebars.logger.level = 0; //for Debug

const SERVER_CONFIG = require("./config");
const Pack = require("./package");
const routes = require("./routes");

exports.init = async () => {
     const server = Hapi.server(SERVER_CONFIG);
     await server.initialize();
     return server;
};

exports.start = async () => {
     const server = Hapi.server(SERVER_CONFIG);
     // register plugins with Hapi server.
     await server.register([
          Inert,
          Vision,
          {
               plugin: HapiSwagger,
               options: {
                    info: {
                         title: "API Documentation with Swagger",
                         version: Pack.version,
                    },
               },
          },
     ]);

     // add routes
     server.route(routes);

     server.views({
          engines: {
               hbs: Handlebars,
          },
          relativeTo: __dirname,
          path: "templates",
     });

     await server.start();
     console.log("Server running on %s", server.info.uri);
     return server;
};

process.on("unhandledRejection", (err) => {
     console.error(err);
     process.exit(1);
});
