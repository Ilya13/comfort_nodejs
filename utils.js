'use strict';

const fs = require('fs');

exports.saveBoothState = (state) => {
    fs.writeFile('assets/booth_state.json', JSON.stringify(state), () => {});
}