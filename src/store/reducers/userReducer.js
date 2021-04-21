const UserReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return { ...state };
    case "CONNECT":
      if (payload) {
        return {
          ...state,
          address: payload.address,
          balance: payload.balance,
          isConnected: true,
        };
      } else {
        return { ...state };
      }
    case "UPDATE_CONNECTION":
      console.log(payload);
      if (payload) {
        return {
          ...state,
          address: payload.address,
          balance: payload.balance,
          isConnected: payload.isConnected,
        };
      } else {
        return { ...state };
      }
  }
};

export default UserReducer;
