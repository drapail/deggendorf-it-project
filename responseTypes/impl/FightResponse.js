const BaseResponse = require("../BaseResponse")

class FightResponse extends BaseResponse {
    getKeywords() {
        return ['FIGHT', 'KICK', 'HIT', 'SWORD', 'FIGHTING', 'BAT', 'BATTLE', 'CHALLENGE', 'KILL', 'ATTACK'];
    }

    getAnswer(userResponse) {
        return `FIGHT`;
    }
}

module.exports = FightResponse;
