const fs = require('fs');
const path = require('path');
const BaseResponse = require('../responseTypes/BaseResponse')

class ResponseStrategy {
    constructor() {
        this.registry = new Map();
        this.instantiateResponseTypes();
    }

    instantiateResponseTypes() {
        const strategiesFolderPath = path.join("/Users/drapail/my_drive/repositories/deggendorf-it-project/responseTypes/impl");

        fs.readdirSync(strategiesFolderPath)
            .forEach((file) => {
                const strategyFilePath = path.join(strategiesFolderPath, file);
                const StrategyClass = require(strategyFilePath);
                const strategyInstance = new StrategyClass();
                const keywords = strategyInstance.getKeywords();
                keywords.forEach((keyword) => {
                    this.registry.set(keyword, strategyInstance);
                });
            });
    }

    getStrategy(keyword) {
        return this.registry.get(keyword);
    }
}

module.exports = ResponseStrategy;