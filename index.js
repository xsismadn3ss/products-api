const app = require("./app");
const config = require("./appConfig").app;

app.listen(config.port, () => {
  console.log("Servidor iniciado ✅");
});
