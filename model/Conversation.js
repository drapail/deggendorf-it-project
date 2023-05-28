class Conversation {
    constructor() {
        this.strategyInstance = null;
    }

    setStrategyInstance(strategyInstance) {
        this.strategyInstance = strategyInstance;
    }

    getStrategyInstance() {
        return this.strategyInstance;
    }

    clearStrategyInstance() {
        this.strategyInstance = null;
    }

    hasOngoingConversation() {
        return this.strategyInstance !== null;
    }
}

module.exports = Conversation;
