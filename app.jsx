import { useEffect, useState } from 'react';

export default function Page() {
  const [version, setVersion] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/version')
      .then(res => res.json())
      .then(data => setVersion(data.version))
      .catch(err => console.error(err));
  }, []);

  return <div>Postgres version: {version}</div>;
}
