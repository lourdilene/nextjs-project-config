import { useEffect, useState } from "react";

type Row = { id: string; title: string; payload: any; createdAt: string };

export default function DataLoadPage() {
  const [items, setItems] = useState<Row[]>([]);
  const [pending, setPending] = useState(false);

  async function saveDataLoad() {
    setPending(true);
    try {
      const res = await fetch("/api/v1/dataload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "My first load", payload: { count: 3 } }),
      });
      const json = (await res.json()) as Row;
      setItems((prev) => [json, ...prev]);
    } finally {
      setPending(false);
    }
  }

  useEffect(() => {
    fetch("/api/v1/dataload")
      .then((r) => r.json())
      .then(setItems);
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>DataLoad</h1>
      <button onClick={saveDataLoad} disabled={pending}>
        {pending ? "Saving..." : "Save example row"}
      </button>
      <ul>
        {items.map((it) => (
          <li key={it.id}>
            <strong>{it.title}</strong> —{" "}
            {new Date(it.createdAt).toLocaleString()}
            <pre>{JSON.stringify(it.payload, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}
