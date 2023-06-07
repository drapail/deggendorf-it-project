const BaseResponse = require("../BaseResponse")

class EscapeResponse extends BaseResponse {
    getKeywords() {
        return ['ESCAPE', 'RUN', 'FLEE', 'LEAVE', 'EXIT', 'OUT', 'AWAY', 'MOVE'];
    }

    getQuestActionKeyword(userResponse) {
        return `ESCAPE`;
    }
}

module.exports = EscapeResponse;
