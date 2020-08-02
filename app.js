var url = require("url");
var fs = require("fs");

var body = "";
const date = new Date();

const allFiles = fs.readFileSync("./note.json", "utf8");

module.exports = {
  handleRequest: function(request, response) {
    response.writeHead(200, { "Content-Type": "application/json" });
    var path = url.parse(request.url).pathname;
    const Data = JSON.parse(allFiles);

    switch (path) {
      case "/":
        if (request.method == "GET") {
          response.end(allFiles);
          break;
        } else if (request.method == "POST") {
          var body = "";
          request.on("data", function(chunk) {
            body += chunk;
          });

          request.on("end", function() {
            response.writeHead(200);
            const newBody = JSON.parse(body);

            if (
              typeof newBody.category == "undefined" &&
              typeof newBody.note == "undefined"
            ) {
              response.end("Category Path and Note Path is not define");
            } else if (typeof newBody.category == "undefined") {
              response.end("Category Path is not define");
            } else if (typeof newBody.note == "undefined") {
              response.end("Note Path is not define");
            } else {
              if (
                newBody.category == "work" ||
                newBody.category == "social" ||
                newBody.category == "personal"
              ) {
                const newNote = {
                  id: date,
                  category: newBody.category,
                  note: newBody.note
                };

                Data.push(newNote);
                fs.writeFile("./note.json", JSON.stringify(Data), err => {
                  if (err) throw err;
                  response.end("Saved Successfully");
                });
              } else {
                response.end(
                  "Please Kindly Select a Valid Category. Example - social, personal, work"
                );
              }
            }
          });

          break;
        } else {
          response.end("not found");
        }
      case "/personal":
        const personal = Data.filter(data => {
          return data.category === "personal";
        });

        if (personal.length >= 1) {
          response.end(JSON.stringify(personal));
        } else {
          response.writeHead(200);
          response.end("No Data in the Directory!!!!!");
        }

        break;
      case "/work":
        const work = Data.filter(data => {
          return data.category === "work";
        });

        if (work.length >= 1) {
          response.end(JSON.stringify(work));
        } else {
          response.writeHead(200);
          response.end("No Data in the Directory!!!!!");
        }

        break;

      case "/social":
        const social = Data.filter(data => {
          return data.category === "social";
        });

        if (social.length >= 1) {
          response.end(JSON.stringify(social));
        } else {
          response.writeHead(200);
          response.end("No Data in the Directory!!!!!");
        }

        break;

      default:
        response.writeHead(404);
        response.write("Route not defined");
        response.end();
    }
  }
};
