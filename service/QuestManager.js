const fs = require('fs');
const path = require('path');

class QuestManager {
    constructor() {
        this.availableQuests = this.instantiateQuests();
        this.currentQuest = null;
        this.completedQuests = [];
    }


    instantiateQuests() {
        let availableQuests = []
        const strategiesFolderPath = path.join("/Users/drapail/my_drive/repositories/deggendorf-it-project/quests");
        fs.readdirSync(strategiesFolderPath)
            .forEach((file) => {
                availableQuests.push(path.join(strategiesFolderPath, file));
            });
        return availableQuests
    }

    getRandomQuest() {
        let randomQuest = this.availableQuests[Math.floor(Math.random() * this.availableQuests.length)];
        this.completedQuests.push(this.availableQuests.find(quest => quest === randomQuest))
        this.availableQuests = this.availableQuests.filter((quest) => quest !== randomQuest);
        return randomQuest;
    }

    getQuestIntro(questPath) {
        let fileContent = fs.readFileSync(questPath, 'utf8');
        let jsonData = JSON.parse(fileContent);
        return jsonData["INTRO"];
    }

    getQuestAction(questPath, action) {
        let fileContent = fs.readFileSync(questPath, 'utf8');
        let jsonData = JSON.parse(fileContent);
        return jsonData[action];
    }

    setCurrentQuest(quest) {
        this.currentQuest = quest;
    }

    getCurrentQuest() {
        return this.currentQuest;
    }

    getCompletedQuests() {
        return this.completedQuests;
    }

}

module.exports = QuestManager;
