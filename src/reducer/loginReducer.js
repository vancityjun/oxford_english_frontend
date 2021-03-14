export const initialState = {
  email: 'jun@example.com',
  password: ''
}

export const reducer = (state, {target}) => {
  return {...state, ...target}
}
