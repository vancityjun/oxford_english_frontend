export const initialState = [
  { title: 'a1', active: false },
  { title: 'a2', active: false },
  { title: 'b1', active: false },
  { title: 'b2', active: false },
  { title: 'c1', active: false }
]

export const reducer = (state, {target, active}) => {
  if(target){
    target.active = !target.active
    return [...state]
  } else {
    return state.map(({title}) => ({title: title, active: active }))
  }
}
