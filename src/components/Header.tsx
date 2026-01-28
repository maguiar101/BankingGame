interface HeaderProps {
  balance: number;
  loan: number;
}

function Header({balance, loan}: HeaderProps) {
  return (
    <header className="text-center p-2 mt-2 mb-4">
      <h1 className="text-4xl font-bold">Banking Game</h1>
      <div className="flex justify-center gap-4 mt-2">
        <p>Balance: {balance}</p>
        <p>Loan: {loan}</p>
      </div>
    </header>
  );
}

export default Header;
