import { createStore, applyMiddleware } from 'redux'
import {reducer as formReducer} from 'redux-form'
import reducer from '../reducers'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

export default store;