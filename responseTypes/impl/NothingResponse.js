const BaseResponse = require("../BaseResponse")

class NothingResponse extends BaseResponse {
    getKeywords() {
        return ['NOTHING', "NOT", "KNOW", "DON'T", "DO NOT", "NO", "NOPE", "NEIN"]
    }

    getQuestActionKeyword(userResponse) {
        return `NOTHING`;
    }
}

module.exports = NothingResponse;
