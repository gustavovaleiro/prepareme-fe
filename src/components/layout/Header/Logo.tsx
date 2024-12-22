import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <Link to="/" className="text-xl font-bold text-blue-600">
      Prepare.me
    </Link>
  );
}