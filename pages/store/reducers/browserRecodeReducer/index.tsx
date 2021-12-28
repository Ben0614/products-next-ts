interface Action {
  type: string
  payload: {}
}

export default function BrowserRecodeReducer(state = {}, action: Action) {
  console.log(action)
  switch (action.type) {
    case 'browser_recode':
      return action.payload

    default:
      return state
  }
}
