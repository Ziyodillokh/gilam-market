"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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

  if (!qrLogo?.qrDataUrl) {
    return (
      <Image
        src="/logo.svg"
        width={220}
        height={90}
        alt="Gilam Market"
        title="Gilam Market"
        priority
        unoptimized
      />
    );
  }

  return (
    <div
      className="relative cursor-pointer"
      style={{ width: 220, height: 90 }}
      onClick={() => window.open(qrLogo.link, "_blank")}
      title={qrLogo.link}
    >
      {/* 123.svg — QR pattern on both sides with white center */}
      <Image
        src="/123.svg"
        width={220}
        height={90}
        alt="QR Banner"
        priority
        unoptimized
        className="absolute inset-0"
      />
      {/* QR code in the white center area */}
      <img
        src={qrLogo.qrDataUrl}
        alt="QR Code"
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 70,
          height: 70,
          objectFit: "contain",
        }}
      />
    </div>
  );
}
