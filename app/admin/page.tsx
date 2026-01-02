"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const LogoUploader = dynamic(
  () => import("../../components/admin/logo-uploader"),
  { ssr: false }
);

export default function AdminPage() {
  const logosPath = "/images/logos/logo-angkatan-25.png";
  const [logoExists, setLogoExists] = useState(false);

  useEffect(() => {
    // Check if logo exists by trying to load it
    const img = new Image();
    img.onload = () => setLogoExists(true);
    img.onerror = () => setLogoExists(false);
    img.src = logosPath;
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Admin - Upload Logo</h2>
      <p className="mb-6">
        Upload logo baru untuk otomatis tampil di website. File akan disimpan
        ke: <code>{logosPath}</code>
      </p>

      <div className="mb-6">
        <LogoUploader />
      </div>

      <div>
        <h3 className="font-semibold mb-2">Current logo</h3>
        {logoExists ? (
          <img
            src={logosPath}
            alt="Current logo"
            className="h-24 object-contain border rounded"
          />
        ) : (
          <div className="text-sm text-gray-600">
            Belum ada logo. Silahkan upload.
          </div>
        )}
      </div>
    </div>
  );
}
