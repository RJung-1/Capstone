import { signInAnonymously } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const handleLogin = async () => {
    await signInAnonymously(auth);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">MindCare Companion</h1>
      <button onClick={handleLogin} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded">
        Demo Login
      </button>
    </div>
  );
}