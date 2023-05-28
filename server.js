const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const ResponseStrategy = require("./service/ResponseStrategy");
const Conversation = require("./model/Conversation");
const UserInputParser = require("./service/UserInputParser")
const QuestManager = require("./service/QuestManager")
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
    let botResponse;
    let randomQuestPath;

    if (conversation.requestCount === 0) {
        let randomQuestPath = questManager.getRandomQuest();
        questManager.setCurrentQuest(randomQuestPath)
        botResponse = questManager.getQuestIntro(randomQuestPath);
    } else if (conversation.requestCount >= 1) {
        let response = responseStrategy.getResponseType(responseKeywords);
        let action = response.getAnswer(responseKeywords)
        botResponse = questManager.getQuestAction(questManager.getCurrentQuest(), action);
    }
    conversation.requestCount++;
    res.json({bot_response: botResponse})
})

