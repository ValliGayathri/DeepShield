import { useRef, useState } from "react";
import AuthLayout from "../components/AuthLayout";

const EncryptPage = () => {
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fileName, setFileName] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // inside EncryptPage component
const [copiedPassword, setCopiedPassword] = useState(false);
const [copiedUrl, setCopiedUrl] = useState(false);
  const handleChooseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      if (!fileName) setFileName(file.name);
    }
  };

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const copyText = async (text) => {
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (_) {}
    try {
      const el = document.createElement("textarea");
      el.value = text;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(el);
      return ok;
    } catch (_) {
      return false;
    }
  };

  const handleEncrypt = async (e) => {
    e.preventDefault();
    setError("");

    if (!selectedFile) return setError("Please select a file");
    if (!password || !confirmPassword) return setError("Please enter password");
    if (password !== confirmPassword) return setError("Passwords do not match");

    const token = localStorage.getItem("token");
    if (!token) return setError("You are not logged in");

    try {
      setLoading(true);
      setDownloadUrl("");

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("password", password);
      formData.append("fileName", fileName || selectedFile.name);

      const response = await fetch(`${API_URL}/api/files/encrypt`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  body: formData,
});

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Encryption failed");
      }

      setDownloadUrl(data.fileUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Encrypt Your File">
      <form onSubmit={handleEncrypt} className="space-y-5">
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* File Selector */}
        <div>
          <div className="flex gap-3">
            <input
              type="text"
              readOnly
              value={selectedFile ? selectedFile.name : ""}
              placeholder="No file chosen"
              className="flex-1 p-3 rounded-lg border
                bg-white dark:bg-[#140033]
                text-[#140033] dark:text-[#ccc]
                border-[#d8b4fe] dark:border-[#6d28d9]
                focus:outline-none focus:ring-2 focus:ring-[#a855f7]
                transition"
            />
            <button
              type="button"
              onClick={handleChooseClick}
              className="px-5 py-3 rounded-lg font-semibold
                border border-[#a855f7]
                text-[#a855f7]
                hover:bg-[#a855f7] hover:text-white
                transition whitespace-nowrap"
            >
              Choose
            </button>
          </div>
        </div>

        {/* File Name */}
        <div>
          <input
            type="text"
            placeholder="Output File Name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="w-full p-3 rounded-lg border
              bg-white dark:bg-[#140033]
              text-[#140033] dark:text-[#ccc]
              border-[#d8b4fe] dark:border-[#6d28d9]
              focus:outline-none focus:ring-2 focus:ring-[#a855f7]
              transition"
          />
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="File Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg border
              bg-white dark:bg-[#140033]
              text-[#140033] dark:text-[#ccc]
              border-[#d8b4fe] dark:border-[#6d28d9]
              focus:outline-none focus:ring-2 focus:ring-[#a855f7]
              transition"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 rounded-lg border
              bg-white dark:bg-[#140033]
              text-[#140033] dark:text-[#ccc]
              border-[#d8b4fe] dark:border-[#6d28d9]
              focus:outline-none focus:ring-2 focus:ring-[#a855f7]
              transition"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        {/* Encrypt Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold
            bg-gradient-to-r from-[#a855f7] to-[#6366f1]
            text-white
            hover:scale-105 transition-transform duration-300
            disabled:opacity-50"
        >
          {loading ? "Encrypting..." : "Encrypt"}
        </button>
      </form>

      {/* 🔹 Success Outputs (Outside Form) */}
      {downloadUrl && (
        <div className="mt-6 space-y-4">
          {/* Cloud URL */}
          <div className="flex gap-2 items-center">
            <input
              type="text"
              readOnly
              value={downloadUrl}
              className="flex-1 p-3 rounded-lg border
                bg-white dark:bg-[#140033]
                text-[#140033] dark:text-[#ccc]
                border-[#d8b4fe] dark:border-[#6d28d9]
                focus:outline-none focus:ring-2 focus:ring-[#a855f7]
                transition"
            />
            <button
    onClick={async () => {
      const ok = await copyText(downloadUrl);
      setCopiedUrl(true);
      if (!ok) setCopiedUrl(false);
      setTimeout(() => setCopiedUrl(false), 2000);
    }}
    className="px-4 py-2 rounded-lg bg-[#a855f7] text-white hover:bg-[#9333ea] transition"
  >
    {copiedUrl ? "✔️" : "Copy"}
  </button>
          </div>

          {/* Password */}
          <div className="flex gap-2 items-center">
            <input
              type="text"
              readOnly
              value={password}
              className="flex-1 p-3 rounded-lg border
                bg-white dark:bg-[#140033]
                text-[#140033] dark:text-[#ccc]
                border-[#d8b4fe] dark:border-[#6d28d9]
                focus:outline-none focus:ring-2 focus:ring-[#a855f7]
                transition"
            />
            <button
    onClick={async () => {
      const ok = await copyText(password);
      setCopiedPassword(true);
      if (!ok) setCopiedPassword(false);
      setTimeout(() => setCopiedPassword(false), 2000);
    }}
    className="px-4 py-2 rounded-lg bg-[#a855f7] text-white hover:bg-[#9333ea] transition"
  >
    {copiedPassword ? "✔️" : "Copy"}
  </button>
          </div>

          <p className="text-red-400 text-xs mt-2 text-center">
            ⚠ Save this password securely. It cannot be recovered.
          </p>
        </div>
      )}
    </AuthLayout>
  );
};

export default EncryptPage;
