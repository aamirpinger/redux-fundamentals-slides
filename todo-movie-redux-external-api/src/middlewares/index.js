import {applyMiddleware} from 'redux'
import logger from './logger'
import middlewareChecker from './checker'

import thunk from 'redux-thunk'

export default applyMiddleware(thunk,middlewareChecker, logger)

