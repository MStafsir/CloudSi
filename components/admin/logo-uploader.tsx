"use client";

import React, { useState } from "react";

export default function LogoUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
    setStatus(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("Pilih file terlebih dulu.");
      return;
    }

    setLoading(true);
    setStatus(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload-logo", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (res.ok) {
        setStatus("Logo berhasil di-upload. URL: " + json.path);
      } else {
        setStatus("Upload gagal: " + (json.error || "Unknown error"));
      }
    } catch (err) {
      setStatus("Upload failed");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl p-6 bg-white rounded shadow">
      <h3 className="text-lg font-bold mb-3">Upload Logo Angkatan</h3>
      <p className="text-sm mb-4">
        Upload PNG atau JPG agar tampil otomatis sebagai logo.
      </p>

      <input
        type="file"
        accept="image/png,image/jpeg"
        onChange={handleFileChange}
      />

      {preview && (
        <div className="mt-4">
          <div className="mb-2">Preview:</div>
          <img
            src={preview}
            alt="preview"
            className="h-28 object-contain border rounded"
          />
        </div>
      )}

      <div className="mt-4 flex items-center gap-2">
        <button
          className="px-3 py-1 bg-sky-500 text-white rounded disabled:opacity-50"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Uploading…" : "Upload"}
        </button>
        <button
          className="px-3 py-1 border rounded"
          onClick={() => {
            setFile(null);
            setPreview(null);
            setStatus(null);
          }}
        >
          Clear
        </button>
      </div>

      {status && <div className="mt-3 text-sm">{status}</div>}
    </div>
  );
}
