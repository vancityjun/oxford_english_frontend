
const reducer = (state, {target, active}) => {
  if(target){
    target.active = !target.active
    return [...state]
  } else {
    return state.map(({title}) => ({title: title, active: active }))
  }
}

export default reducer