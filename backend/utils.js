'use strict';

const fs = require('fs');
const path = require('path');

function saveState(name, state) {
	const stateFile = path.join(__dirname, `./backend/state/${name}.json`);
    console.log(`Try put state ${stateFile}`)
    fs.writeFileSync(stateFile, JSON.stringify(state));
}

exports.saveHouseState = (state) => {
    saveState('house', state);
}

exports.saveBoothState = (state) => {
    saveState('booth', state);
}