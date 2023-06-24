const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require("body-parser");
const ResponseStrategy = require("./service/ResponseStrategy");
const Conversation = require("./model/Conversation");
const UserInputParser = require("./service/UserInputParser")
const QuestManager = require("./service/QuestManager")
const BaseResponse = require("./responseTypes/BaseResponse");
const BotAnswer = require("./model/BotAnswer");

const conversation = new Conversation();
const questManager = new QuestManager();
const responseStrategy = new ResponseStrategy();
const userInputParser = new UserInputParser();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    transports: ['websocket'],
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

const handleBaseRoute = (socket, userResponse) => {
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
    socket.emit('message', {bot_response: botResponse});
}

const handleResetRoute = (socket) => {
    questManager.availableQuests = questManager.instantiateQuests();
    questManager.completedQuests = [];
    conversation.requestCount = 0;
    socket.emit('message', {bot_response: "Reset successful"});
}

const handleStatsRoute = (socket) => {
    socket.emit('message', {bot_response: questManager.getCompletedQuests().join("")});
}

io.on('connection', (socket) => {
    console.log('A client connected');

    socket.on('message', (data) => {
        if(data.route === "/") {
            handleBaseRoute(socket, data.user_response);
        } else if(data.route === "/reset") {
            handleResetRoute(socket);
        } else if(data.route === "/stats") {
            handleStatsRoute(socket);
        }
    });

    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
});

server.listen(8080, () => {
    console.log("Server is running on port 8080");
});
