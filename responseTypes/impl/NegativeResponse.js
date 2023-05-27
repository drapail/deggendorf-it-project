const BaseResponse = require("../BaseResponse")

class NegativeResponse extends BaseResponse {
    getKeywords() {
        return ['NO', 'NAH', 'NOPE'];
    }

    getAnswer(userResponse) {
        return `Your question: ${userResponse}.\nAnswer is NO`;
    }
}

module.exports = NegativeResponse;
