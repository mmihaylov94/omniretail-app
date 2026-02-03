import { useEffect, useState } from "react";
import { getHealth } from "./api/health";

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getHealth()
      .then(setData)
      .catch(err => setError(err.message));
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1 class="text-red-500">Omniretail Frontend</h1>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!error && !data && <p>Loading…</p>}

      {data && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}
