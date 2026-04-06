"use client";

import { useEffect, useState } from "react";

interface QrLogoData {
  id: string;
  link: string;
  qrDataUrl: string | null;
}

export default function QrLogoBanner() {
  const [qrLogo, setQrLogo] = useState<QrLogoData | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/qr-logo/random`)
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        if (data?.qrDataUrl) setQrLogo(data);
      })
      .catch(() => {});
  }, []);

  return (
    <div
      className="relative mx-auto"
      style={{ width: 220, height: 90 }}
      onClick={qrLogo?.link ? () => window.open(qrLogo.link, "_blank") : undefined}
      title={qrLogo?.link || "Gilam Market"}
      role={qrLogo?.link ? "button" : undefined}
    >
      <img
        src="/shop/123.svg"
        width={220}
        height={90}
        alt="Gilam Market"
        style={{ width: 220, height: 90 }}
      />
      {qrLogo?.qrDataUrl && (
        <img
          src={qrLogo.qrDataUrl}
          alt="QR Code"
          className="absolute cursor-pointer"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 88,
            height: 88,
            objectFit: "contain",
            backgroundColor: "#fff",
          }}
        />
      )}
    </div>
  );
}
