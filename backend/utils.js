'use strict';

const fs = require('fs');

function saveState(name, state) {
    fs.writeFile(`state/${name}.json`, JSON.stringify(state), () => {});
}

exports.saveHouseState = (state) => {
    saveState('house', state);
}

exports.saveBoothState = (state) => {
    saveState('house', state);
}