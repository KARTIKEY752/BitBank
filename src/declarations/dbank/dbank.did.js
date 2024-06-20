export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'checkbalance' : IDL.Func([], [IDL.Float64], ['query']),
    'compoundInterest' : IDL.Func([], [], ['oneway']),
    'topup' : IDL.Func([IDL.Float64], [], ['oneway']),
    'withdraw' : IDL.Func([IDL.Float64], [], ['oneway']),
  });
};
export const init = ({ IDL }) => { return []; };
