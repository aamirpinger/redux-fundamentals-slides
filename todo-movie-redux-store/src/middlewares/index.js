import {applyMiddleware} from 'redux'
import logger from './logger'
import middlewareChecker from './checker'

export default applyMiddleware(middlewareChecker, logger)

