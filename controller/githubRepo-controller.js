const axios = require("axios");

const GITHUB_URL = "https://api.github.com/search/repositories";

/**
 *
 * @param {string} - query is the search term which is used to be search in Github.
 * @returns {Promise} - Returns promise of the gAPI Call.
 */
const getReposFromGithub = async (query) => {
     let { q, page = 1, per_page = 10 } = query;

     try {
          return await axios.get(GITHUB_URL, {
               params: {
                    q,
                    per_page,
                    page,
               },
          });
     } catch (error) {
          throw error;
     }
};

/**
 *
 * @param {*} request - Request object from the hapi.js server
 * @param {*} h - Reponse Toolkit from the hapi.js server
 * @returns {*} - Response based on the method.
 */

module.exports.searchRepoController = async (request, h) => {
     switch (request.method) {
          case "get":
               return h.view("github-repo");
          case "post":
               const paramsFromRequest = request.payload;
               const { headers, data } = await getReposFromGithub(paramsFromRequest);
               if (data) {
                    const total_pages = headers.link.split("&page=")[2].split(">")[0];
                    return { total_pages, data };
               } else {
                    return { data: "Try later" };
               }
     }
};
