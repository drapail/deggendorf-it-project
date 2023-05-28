const fs = require('fs');
const path = require('path');

class QuestManager {
    constructor() {
        this.availableQuests = this.instantiateQuests();
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
        this.availableQuests = this.availableQuests.filter((quest) => quest !== randomQuest);
        return randomQuest;
    }

    getQuestIntro(questPath) {
        let fileContent = fs.readFileSync(questPath, 'utf8');
        let jsonData = JSON.parse(fileContent);
        return jsonData["INTRO"];
    }
}

module.exports = QuestManager;
