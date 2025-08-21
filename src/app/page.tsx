"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Lock, NotebookPen } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    if (username === "Devyn Tubac" && password === "Abc123**") {
      localStorage.setItem("logged", "true");
      localStorage.setItem("user", username);
      toast.success("¡Bienvenido " + username + "!");
      setTimeout(() => router.push("/contacts"), 1200);
    } else {
      toast.error("Credenciales incorrectas");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen 
                    bg-gradient-to-br from-slate-950 via-slate-900 to-black 
                    text-white px-4">
      <div className="flex flex-col items-center w-full max-w-md">
        <div className="w-full bg-white/10 backdrop-blur-xl border border-white/10 
                        rounded-2xl shadow-[0_0_25px_rgba(0,200,255,0.3)] 
                        p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="flex flex-col items-center mb-8">
              <NotebookPen 
                size={50} 
                className="text-cyan-400 drop-shadow-[0_0_10px_rgba(0,200,255,0.7)] mb-3" 
              />
              <h3 className="text-4xl font-extrabold tracking-wide text-center 
                             bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 
                             bg-clip-text text-transparent drop-shadow-lg">
                AGENDA PERSONAL
              </h3>
            </div>

            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg 
                            border border-white/10 focus-within:ring-2 
                            focus-within:ring-cyan-400">
              <User className="text-cyan-400" size={20} />
              <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1 bg-transparent outline-none 
                           placeholder-gray-400 text-white"
                required
              />
            </div>

            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg 
                            border border-white/10 focus-within:ring-2 
                            focus-within:ring-blue-500">
              <Lock className="text-blue-400" size={20} />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent outline-none 
                           placeholder-gray-400 text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-bold tracking-wider 
                         bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 
                         hover:scale-105 transition-transform duration-200 
                         shadow-[0_0_20px_rgba(0,200,255,0.5)]"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
