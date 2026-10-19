"use client";

import { useEffect, useRef, useState } from "react";
import { BluetoothIcon } from "@/app/components/icons";
import { DEVICES } from "@/app/lib/onboarding-data";

export default function DeviceScanner({ onConnected }: { onConnected: (device: string) => void }) {
  const [scanning, setScanning] = useState(false);
  const [scanFound, setScanFound] = useState(false);
  const [devPick, setDevPick] = useState<number | null>(null);
  const [connecting, setConnecting] = useState(false);

  const scanTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const connectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    return () => {
      if (scanTimer.current) clearTimeout(scanTimer.current);
      if (connectTimer.current) clearTimeout(connectTimer.current);
    };
  }, []);

  function handleScan() {
    setScanning(true);
    setScanFound(false);
    setDevPick(null);
    scanTimer.current = setTimeout(() => {
      setScanning(false);
      setScanFound(true);
    }, 1400);
  }

  function handleConnect() {
    if (devPick == null) return;
    const device = DEVICES[devPick];
    setScanFound(false);
    setConnecting(true);
    connectTimer.current = setTimeout(() => {
      setConnecting(false);
      onConnected(device);
    }, 2000);
  }

  if (connecting) {
    return (
      <div className="card sync-card" role="status" aria-live="polite">
        <span className="spinner" aria-hidden="true" />
        <p><strong>Connexion en cours…</strong></p>
        <p className="small">ne fermez pas l&apos;application.</p>
      </div>
    );
  }

  if (scanning) {
    return (
      <div className="card" role="status" aria-live="polite">
        <p><strong>Recherche d&apos;appareils…</strong></p>
        <p className="small">Gardez le podomètre allumé et proche du téléphone.</p>
      </div>
    );
  }

  if (scanFound) {
    return (
      <>
        <fieldset className="choices" aria-labelledby="dev-t">
          <h2 id="dev-t">Appareils trouvés</h2>
          <label className="choice">
            <input
              type="radio"
              name="device"
              value={0}
              checked={devPick === 0}
              onChange={() => setDevPick(0)}
            />
            <span><strong>{DEVICES[0]}</strong></span>
          </label>
        </fieldset>
        <button className="btn primary" type="button" onClick={handleConnect} disabled={devPick == null}>
          Connecter cet appareil
        </button>
      </>
    );
  }

  return (
    <button className="btn secondary" type="button" onClick={handleScan}>
      <BluetoothIcon />
      <span>Rechercher un podomètre Bluetooth</span>
    </button>
  );
}
