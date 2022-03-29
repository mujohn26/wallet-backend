import log4js from 'log4js';
import { config } from 'dotenv';

config();

export default (level = 'debug', message) => {
  let log;
  if (process.env.NODE_ENV === 'production') {
    log4js.configure({
      appenders: { wallet: { type: 'file', filename: 'wallet.log' } },
      categories: { default: { appenders: ['wallet'], level } }
    });
    log=log4js.getLogger('wallet')
  }
  else {
    log=log4js.getLogger()
  }

  log.level = level;

  switch (level) {
    case 'trace':
      log.trace(message)
      break;
    case 'debug':
      log.debug(message)
      break;
    case 'info':
      log.info(message)
      break;
    case 'warn':
      log.warn(message)
      break;
    case 'error':
      log.warn(message)
      break;
    case 'fatal':
      log.fatal(message)
      break;
    default:
      break;
  }

}