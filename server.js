const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const ResponseStrategy = require("./service/ResponseStrategy");
const Conversation = require("./model/Conversation");
const UserInputParser = require("./service/UserInputParser")
const QuestManager = require("./service/QuestManager")
const BaseResponse = require("./responseTypes/BaseResponse");
const BotAnswer = require("./model/BotAnswer");
const conversation = new Conversation();
const questManager = new QuestManager();

app.listen(8080, () => {
    console.log("Server is running on port 8080")
})


app.get("/", (req, res) => {
    res.send("Hello world")
});


app.post("/", bodyParser.json(), (req, res) => {
    const userResponse = req.body.user_response;
    let responseStrategy = new ResponseStrategy();
    let userInputParser = new UserInputParser();
    let responseKeywords = userInputParser.parseUserInput(userResponse)
    let botResponse = new BotAnswer();
    let response = responseStrategy.getResponseType(responseKeywords);
    let randomQuestPath = questManager.getRandomQuest();

    if (conversation.requestCount === 0) {
        questManager.setCurrentQuest(randomQuestPath)
        botResponse.questIntro = questManager.getQuestIntro(randomQuestPath);
        conversation.requestCount++;
    } else if (conversation.requestCount >= 1) {
        if (response.constructor === BaseResponse) {
            botResponse.questResponse = response.getQuestActionKeyword(responseKeywords);
        } else {
            botResponse.questResponse = questManager.getQuestAction(questManager.getCurrentQuest(), response.getQuestActionKeyword(responseKeywords));
            botResponse.questIntro = questManager.getQuestIntro(randomQuestPath);
            conversation.requestCount = 0;
        }
    }
    res.json({bot_response: botResponse})
})

