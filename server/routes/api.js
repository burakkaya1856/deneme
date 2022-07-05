const requester = require("request"),
  xss = require("xss");
  fs = require("fs");

module.exports = function (req, res) {
  const url = process.env.API + req.url.replace("/api", "");
  let options = {};

  if (url ==  process.env.API + "/admin/v1/auth/login") {
    options = {
      url: url,
      method: req.method,
      headers: {
        "X-FORWARDED-FOR": req.headers["x-forwarded-for"],
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": req.headers["user-agent"] || req.get("User-Agent"),
      },
      form: req.body,
      rejectUnauthorized: false
    };
  } else if (url.indexOf("/admin/v1/setting/file?file_type") != -1) {
    options = {
      url: url,
      method: req.method,
      headers: {
        "X-FORWARDED-FOR": req.headers["x-forwarded-for"],
        "Content-Type": "multipart/form-data",
        "User-Agent": req.headers["user-agent"] || req.get("User-Agent"),
      },
      formData: {
        file: {
          value: fs.createReadStream(req.files.file.tempFilePath),
          options: {
            filename: req.files.file.name,
            contentType: req.files.file.mimetype,
          },
        },
      },
      rejectUnauthorized: false,
    }
  } else {
    options = {
      url: url,
      method: req.method,
      headers: {
        "X-FORWARDED-FOR": req.headers["x-forwarded-for"],
        "Content-Type": "application/json",
        "User-Agent": req.headers["user-agent"] || req.get("User-Agent"),
      },
      body: xss(JSON.stringify(req.body)),
      rejectUnauthorized: false,
    };
  }

  if (req.headers["authorization"]) {
    options.headers["authorization"] = req.headers["authorization"];
  }

  console.log(options);

  requester(options, function (error, response, body) {
    if (!error) {
      console.log(body);
      try {
        const obj = JSON.parse(xss(body));
        if (response.headers["x-total-page-count"]) {
          res.setHeader(
            "x-total-page-count",
            response.headers["x-total-page-count"]
          );
          res.setHeader(
            "x-total-elements",
            response.headers["x-total-elements"]
          );
        }
        res.status(response.statusCode).json(obj);
      } catch (err) {
        console.log(err);
        res
          .status(500)
          .json({ code: "52401", message: "Response Parse Error" });
      }
    } else {
      console.log(error);
      res.status(500).json({
        code: "52400",
        message: "There is no API connection!",
        url: url,
        error: JSON.stringify(error),
      });
    }
  });
};
