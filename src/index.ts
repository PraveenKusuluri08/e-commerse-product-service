import express from "express"
import dotenv from "dotenv"
import { client, connection } from "./dbConection"
import YAML from "yamljs"
import swaggerUi from "swagger-ui-express"
import { apiImpl } from "./impl/types"
import categoryServiceApi from "../dist/index"
import cors from "cors"
import passport from "passport"
import { Strategy as BearerStrategy } from "passport-http-bearer"
import session from "express-session"
import {Strategy} from "passport"
dotenv.config()

import { ServiceUtils } from "./utils/utils"
const swaggerDocument = YAML.load("../openapi.yaml")

const app = express()
let impl = new apiImpl()
app.use(express.json())
var options = {
  swaggerOptions: {
    url: "/api-docs/swagger.json",
  },
}
app.use(
	session({
		resave: false,
		saveUninitialized: true,
		secret: "SECRET",
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ origin: true }));

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user: any, done) => {
	done(null, user);
});

passport.use(new BearerStrategy(ServiceUtils.validateToken));

app.get("/api-docs/swagger.json", (req, res) => res.json(swaggerDocument))
app.use(
  "/api-docs",
  swaggerUi.serveFiles(undefined, options),
  swaggerUi.setup(undefined, options)
)
categoryServiceApi(app, impl)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`App is listing on port ${PORT}`)
})
