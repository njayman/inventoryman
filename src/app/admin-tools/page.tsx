"use client";

import { useState } from "react";

export default function AdminTools() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [restoreFile, setRestoreFile] = useState<File | null>(null);

  const handleSetReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/admin-tools/api/set-reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    setMessage(data.message || "Operation completed.");
  };

  const handleBackup = async () => {
    const response = await fetch("/admin-tools/api/backup");
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sqlite_backup.db";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleRestore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!restoreFile) {
      setMessage("Please select a file to restore.");
      return;
    }
    const formData = new FormData();
    formData.append("file", restoreFile);

    const response = await fetch("/admin-tools/api/restore", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    setMessage(data.message || "Restore completed.");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold text-center mb-8">Admin Tools</h1>

      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Set/Reset Admin</h2>
        <form onSubmit={handleSetReset} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              placeholder="Leave empty to generate"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              placeholder="Leave empty to generate"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Set/Reset Admin
          </button>
        </form>
      </div>

      <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-8">
        <h2 className="text-xl font-bold mb-4">Backup Database</h2>
        <button
          onClick={handleBackup}
          className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Download Backup
        </button>
      </div>

      <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-8">
        <h2 className="text-xl font-bold mb-4">Restore Database</h2>
        <form onSubmit={handleRestore} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload SQLite File
            </label>
            <input
              type="file"
              accept=".db"
              onChange={(e) => setRestoreFile(e.target.files?.[0] || null)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Restore Database
          </button>
        </form>
      </div>

      {message && (
        <div className="max-w-md mx-auto bg-yellow-100 p-4 rounded shadow mt-4">
          <p className="text-yellow-800">{message}</p>
        </div>
      )}
    </div>
  );
}
