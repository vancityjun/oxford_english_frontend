export const reducer = (state, {index, value, type}) => {
  if (type === 'add' && (state.length < 1 || state[state.length - 1])) {
    state.push('')
  } else if (type === 'remove') {
    state.splice(index, 1)
  } else {
    state[index] = value
  }
  return [...state]
}
