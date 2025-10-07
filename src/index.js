// index.js
'use strict';

require('dotenv').config();
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console()],
});

class GasOptimizerCore {
  constructor(threshold = 0.75) {
    this.threshold = threshold;
  }

  score(value, velocity, count) {
    const vSig = Math.min(value / 1_000_000, 1.0);
    const velSig = Math.min(velocity / 500, 1.0);
    const cntSig = Math.min(count / 100, 1.0);
    return vSig * 0.5 + velSig * 0.3 + cntSig * 0.2;
  }

  process(data) {
    const { value = 0, velocity = 0, count = 0 } = data;
