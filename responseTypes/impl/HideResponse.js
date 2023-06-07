const BaseResponse = require("../BaseResponse")

class HideResponse extends BaseResponse {
    getKeywords() {
        return ['HIDE', 'COVER', 'DISAPPEAR', 'BEHIND'];
    }

    getQuestActionKeyword(userResponse) {
        return `HIDE`;
    }
}

module.exports = HideResponse;
