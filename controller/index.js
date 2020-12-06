module.exports = (request, h) => {
     const data = [
          { name: "Assignment-1 {METHOD: POST} ", path: "/", method: "POST", body: "JSON (Required)" },
          { name: "Assignment-2", path: "/git", method: "GET" },
          { name: "Swagger Docs", path: "/documentation" },
     ];

     let response = h.view("index", {
          data,
          title: "Test for Node.js",
     });
     return response;
};
