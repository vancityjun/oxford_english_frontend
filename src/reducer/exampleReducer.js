export const reducer = (state, {index, value, type}) => {
  if (type === 'add' && (state.length < 1 || state[state.length - 1].content)) {
    return [...state, {content: ''}]
  } else if (type === 'remove') {
    if (state[index].id) { 
      Object.assign(state[index], {_destroy: true})
    } else {
      state.splice(index, 1)
    }
  } else if (!type) {
    state[index].content = value
  }
  return [...state]
}
