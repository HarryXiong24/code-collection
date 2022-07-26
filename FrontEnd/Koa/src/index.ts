import Koa from './core/application';
import logger from './plugins/logger';
import Router from './plugins/router';

export default Koa;

export { logger, Router };
