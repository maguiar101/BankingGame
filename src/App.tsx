import { useReducer } from "react";
import Button from "./components/Button";
import Header from "./components/Header";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

const OPEN_BAL = 500;
const DEPOSIT = 150;
const WITHDRAW = 50;
const LOAN = 5000;

function reducer(state: any, action: any) {
  if (!state.isActive && action.type !== "openAccount") return state;
  switch (action.type) {
    case "openAccount":
      return {
        ...state,
        isActive: true,
        balance: OPEN_BAL,
      };

    // For all other actions, require an active account
    case "deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };

    case "withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };

    case "requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload,
        balance: state.balance + action.payload
      }
    case "payLoan":
      if (state.loan === 0 || state.balance < state.loan) return state;
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
      }

    case "closeAccount":
      if (state.loan > 0 || state.balance !== 0) return state;
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

export default function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div>
      <>
        <Header balance={balance} loan={loan} />
        <Button
          className={
            isActive ? "disabled" : "bg-purple-500 hover:bg-purple-600"
          }
          onClick={() => {
            dispatch({ type: "openAccount" });
          }}
          disabled={isActive}
        >
          Open account
        </Button>

        <Button
          className={!isActive ? "disabled" : "bg-blue-500 hover:bg-blue-600"}
          onClick={() => dispatch({ type: "deposit", payload: DEPOSIT })}
          disabled={!isActive}
        >
          Deposit 150
        </Button>
        <Button
          className={!isActive ? "disabled" : "bg-blue-500 hover:bg-blue-600"}
          onClick={() => dispatch({ type: "withdraw", payload: WITHDRAW })}
          disabled={!isActive}
        >
          Withdraw 50
        </Button>
        <Button
          className={!isActive ? "disabled" : "bg-amber-500 hover:bg-amber-600"}
          onClick={() => dispatch({ type: "requestLoan", payload: LOAN })}
          disabled={!isActive}
        >
          Request a loan of 5000
        </Button>
        <Button
          className={!isActive ? "disabled" : "bg-green-500 hover:bg-green-600"}
          onClick={() => dispatch({ type: "payLoan" })}
          disabled={!isActive}
        >
          Pay loan
        </Button>

        <Button
          className={!isActive ? "disabled" : "bg-red-500 hover:bg-red-600"}
          onClick={() => dispatch({ type: "closeAccount" })}
          disabled={!isActive}
        >
          Close account
        </Button>
      </>
    </div>
  );
}
