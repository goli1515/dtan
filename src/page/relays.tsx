import { useState } from "react";
import { Button } from "../element/button";
import { useRelays } from "../relays";
import { sanitizeRelayUrl } from "@snort/shared";
import { workerRelay } from "../system";

export function RelaysPage() {
  const relays = useRelays();
  const [newRelay, setNewRelay] = useState("");
  const [clearing, setClearing] = useState(false);

  const clearCache = async () => {
    if (!confirm("Are you sure you want to clear all cached data?")) return;
    setClearing(true);
    try {
      await workerRelay.wipe();
      alert("Cache cleared successfully!");
    } catch (e) {
      console.error(e);
      alert("Failed to clear cache");
    } finally {
      setClearing(false);
    }
  };

  return (
    <>
      <h2>Relays</h2>
      <br />
      <div className="flex flex-col gap-2">
        {relays.relays.map((a) => (
          <div key={a} className="bg-neutral-800 px-3 py-2 rounded-xl flex justify-between items-center">
            {a}
            <Button type="danger" onClick={() => relays.remove(a)}>
              Remove
            </Button>
          </div>
        ))}
      </div>
      <br />
      <div className="flex gap-4">
        <input
          type="text"
          value={newRelay}
          onChange={(e) => setNewRelay(e.target.value)}
          placeholder="wss://myrelay.com"
        />
        <Button
          type="primary"
          onClick={() => {
            const url = sanitizeRelayUrl(newRelay);
            if (url) {
              relays.add(url);
              setNewRelay("");
            }
          }}
        >
          Add
        </Button>
      </div>
      <br />
      <Button type="danger" onClick={clearCache} disabled={clearing}>
        {clearing ? "Clearing..." : "Clear Cache"}
      </Button>
    </>
  );
}
