class BaseResponse {
    getAnswer(userResponse) {
        return `Your question: ${userResponse}.\nI don't get it, try rephrasing`;
    }
}

module.exports = BaseResponse;