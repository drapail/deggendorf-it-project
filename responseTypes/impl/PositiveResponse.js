const BaseResponse = require("../BaseResponse")

class PositiveResponse extends BaseResponse {
    getKeywords() {
        return ['YES', 'YEP', 'YEAH'];
    }

    getAnswer(userResponse) {
        return `Your question: ${userResponse}.\nAnswer is YES`;
    }
}

module.exports = PositiveResponse;
