const TransactionReducer = (state, action) => {
  const { type } = action;
  switch (type) {
    case "WITHDRAW":
      return { ...state };

    case "COMPLIANCE":
      return { ...state };

    case "DEPOSIT":
      return { ...state };

    default:
      return { ...state };
  }
};

export default TransactionReducer;
