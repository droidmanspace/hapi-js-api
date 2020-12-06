"use strict";

const Lab = require("@hapi/lab");
const { expect } = require("@hapi/code");
const { afterEach, beforeEach, describe, it } = (exports.lab = Lab.script());
const { start } = require("../server");

const input = require("./input.json");
const result = require("./result.json");

describe("GET /", () => {
     let server;

     beforeEach(async () => {
          server = await start();
     });

     afterEach(async () => {
          await server.stop();
     });

     it("responds with 200", async () => {
          const res = await server.inject({
               method: "get",
               url: "/",
          });

          expect(res.statusCode).to.equal(200);
     });
});

describe("POST /git", () => {
     let server;

     beforeEach(async () => {
          server = await start();
     });

     afterEach(async () => {
          await server.stop();
     });

     it("responds with 200", async () => {
          const res = await server.inject({
               method: "post",
               url: "/git",
               payload: { q: "nodejs", page: 1, per_page: 10 },
          });

          expect(res.statusCode).to.equal(200);
          expect(res.result.length).not.equal(0);
     });
});

describe("POST /", () => {
     let server;

     beforeEach(async () => {
          server = await start();
     });

     afterEach(async () => {
          await server.stop();
     });

     it("responds with 200", async () => {
          const res = await server.inject({
               method: "post",
               url: "/",
               payload: input,
          });

          expect(res.statusCode).to.equal(200);
          expect(res.result).to.equal(result);
     });
});

describe("POST / with empty body", () => {
     let server;

     beforeEach(async () => {
          server = await start();
     });

     afterEach(async () => {
          await server.stop();
     });

     it("responds with 400 without JSON body", async () => {
          const res = await server.inject({
               method: "post",
               url: "/",
          });

          expect(res.statusCode).to.equal(400);
     });
});
