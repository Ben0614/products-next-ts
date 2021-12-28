import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storeSession from 'redux-persist/lib/storage/session'
import BrowserRecodeReducer from './reducers/browserRecodeReducer'

type RootState = ReturnType<typeof rootReducer>

const storageConfig = {
  key: 'root',
  storage: storeSession,
}

const rootReducer = combineReducers({
  browserRecode: BrowserRecodeReducer,
})

const myPersistReducer = persistReducer<RootState, any>(
  storageConfig,
  rootReducer
)

const store = createStore(myPersistReducer)
export const persistor = persistStore(store)
export default store
