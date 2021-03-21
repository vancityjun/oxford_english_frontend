export const initialState = {
  perPage: 20,
  levels: [],
  after: null,
  before: null,
}

export const reducer = (state, {target}) => {
  return {...state, ...target}
}
