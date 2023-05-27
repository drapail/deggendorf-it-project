const express = require('express');
const bodyParser = require("body-parser");
const ResponseStrategy = require("./service/ResponseStrategy");
const BaseResponse = require("./responseTypes/BaseResponse");
const app = express();

app.listen(8080, () => {
    console.log("Server is running on port 8080")
})


app.get("/", (req, res) => {
    res.send("Hello world")
});


app.post("/", bodyParser.json(), (req, res) => {
    const userResponse = req.body.user_response;
    const responseStrategy = new ResponseStrategy();
    let responseStrategyInstance = responseStrategy.getStrategy(userResponse.toUpperCase());
    if (!responseStrategyInstance) {
        responseStrategyInstance = new BaseResponse();
    }
    const botResponse = responseStrategyInstance.getAnswer(userResponse)
    res.json({bot_response: botResponse})
})

