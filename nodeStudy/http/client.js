let http = require("http");
http
  .request(
    {
      host: "127.0.0.1",
      port: "3000",
      url: "/",
      method: "get"
    },
    res => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", data => {
        body += data;
        console.log(data);
      });
      res.on("end", () => {
        console.log(`we got ${body}`);
      });
    }
  )
  .end();
