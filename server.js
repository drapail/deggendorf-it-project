const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const ResponseStrategy = require("./service/ResponseStrategy");
const BaseResponse = require("./responseTypes/BaseResponse");
const Conversation = require("./model/Conversation");
const UserInputParser = require("./service/UserInputParser")
const QuestManager = require("./service/QuestManager")
const conversation = new Conversation();

app.listen(8080, () => {
    console.log("Server is running on port 8080")
})


app.get("/", (req, res) => {
    res.send("Hello world")
});


app.post("/", bodyParser.json(), (req, res) => {
    const userResponse = req.body.user_response;
    let responseStrategyInstance;
    const responseStrategy = new ResponseStrategy();
    let userInputParser = new UserInputParser();
    let responseKeywords = userInputParser.parseUserInput(userResponse)
    let questManager = new QuestManager();
    let botResponse;

    if (conversation.hasOngoingConversation()) {
        responseStrategyInstance = conversation.getStrategyInstance();
        responseStrategyInstance = responseStrategy.getStrategy(responseKeywords);
        if (!responseStrategyInstance) {
            responseStrategyInstance = new BaseResponse();
        }
        botResponse = responseStrategyInstance.getAnswer(responseKeywords)
    } else {
        responseStrategyInstance = new ResponseStrategy();
        conversation.setStrategyInstance(responseStrategyInstance)
        let randomQuestPath = questManager.getRandomQuest();
        botResponse = questManager.getQuestIntro(randomQuestPath);
    }

    res.json({bot_response: botResponse})
})

