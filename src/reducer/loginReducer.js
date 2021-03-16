export const initialState = {
  email: '',
  password: ''
}

export const reducer = (state, {target}) => {
  return {...state, ...target}
}
