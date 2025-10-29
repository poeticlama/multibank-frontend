import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

type AccountLinkProps = {
  to: string;
  children: ReactNode;
}

const AccountLink = ({to, children}: AccountLinkProps) => {
  return (
    <Link
      to={to}
      className="font-semibold"
    >
      { children }
    </Link>
  )
}

export default AccountLink