export const setSearchValue = (text) => ({
  type: 'SET_SEARCH_VALUE',
  payload: text,
});

export const clearSearchValue = () => ({
  type: 'CLEAR_SEARCH_VALUE',
});
