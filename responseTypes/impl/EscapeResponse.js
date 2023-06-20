const BaseResponse = require("../BaseResponse")
const KeywordsFileReader = require("../../service/KeywordsFileReader")

class EscapeResponse extends BaseResponse {
    getKeywords() {
        const reader = new KeywordsFileReader('responseTypes/keywords/EscapeKeywords.txt');
        return reader.getKeywords();
    }

    getQuestActionKeyword(userResponse) {
        return `ESCAPE`;
    }
}

module.exports = EscapeResponse;
