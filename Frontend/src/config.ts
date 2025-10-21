const raw = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
const backendUrl = raw.replace(/\/+$/, "");
export default backendUrl;
