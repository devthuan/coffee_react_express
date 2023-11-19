const express = require("express");

const cartRoute = require("./cart.route");
const employeeRoute = require("./employee.route");
const orderRoute = require("./order.route");
const productRoute = require("./product.route");
const userRoute = require("./user.route");
const salesRoute = require("./sales.route");
const sendEmail = require("./sendEmail.route");
const testRoute = require("./test.route");

const apiRoute = express();

apiRoute.use("/cart", cartRoute);
apiRoute.use("/employees", employeeRoute);
apiRoute.use("/", orderRoute);
apiRoute.use("/product", productRoute);
apiRoute.use("/", userRoute);
apiRoute.use("/", salesRoute);
apiRoute.use("/", sendEmail);
apiRoute.use("/", testRoute);

module.exports = apiRoute;
