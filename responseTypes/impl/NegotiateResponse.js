const BaseResponse = require("../BaseResponse")
const KeywordsFileReader = require("../../service/KeywordsFileReader");

class NegotiateResponse extends BaseResponse {
    getKeywords() {
        const reader = new KeywordsFileReader('responseTypes/keywords/NegotiateKeywords.txt');
        return reader.getKeywords();
    }

    getQuestActionKeyword(userResponse) {
        return `NEGOTIATE`;
    }
}

module.exports = NegotiateResponse;
