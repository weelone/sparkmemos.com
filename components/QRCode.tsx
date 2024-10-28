"use client";

import { METADATA } from "@/constants/metadata";
import { QRCodeSVG } from "qrcode.react";

export function AppStoreQRCode() {
  return (
    <QRCodeSVG
      className="w-20 h-20"
      value={METADATA.appStoreLink}
      bgColor="transparent"
      fgColor="currentColor"
    />
  );
}
