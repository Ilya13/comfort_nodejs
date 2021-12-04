'use strict';

const fs = require('fs');
const path = require('path');

function saveState(name, state) {
	const stateFile = path.join(__dirname, `./state/${name}.json`);
    fs.writeFileSync(stateFile, JSON.stringify(state));
}

exports.saveHouseState = (state) => {
    saveState('house', state);
}

exports.saveBoothState = (state) => {
    saveState('booth', state);
}