const BaseResponse = require("../BaseResponse")

class NegotiateResponse extends BaseResponse {
    getKeywords() {
        return ['NEGOTIATE', 'COMMUNICATE', 'SPEAK', 'TALK', 'DISCUSS', 'CONVERSATION', 'CONVERSE', 'DIALOGUE', 'DIPLOMACY', 'DIPLOMATIC', 'PEACE', 'AGREEMENT', 'AGREE', 'COMPROMISE', 'COMPROMISE', 'BARGAIN', 'BARTER'];
    }

    getQuestActionKeyword(userResponse) {
        return `NEGOTIATE`;
    }
}

module.exports = NegotiateResponse;
