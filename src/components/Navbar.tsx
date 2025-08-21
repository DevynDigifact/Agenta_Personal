"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users, ClipboardList, LogOut, Menu, X } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  function logout() {
    localStorage.removeItem("logged");
    localStorage.removeItem("user");
    router.push("/login");
  }

  return (
    <nav
      className="sticky top-0 z-50 flex justify-between items-center px-6 md:px-10 py-4
                 bg-gradient-to-r from-slate-950/70 via-slate-900/50 to-slate-950/70
                 backdrop-blur-xl border-b border-cyan-400/20 shadow-[0_0_25px_rgba(0,200,255,0.25)]"
    >
      <div
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => router.push("/")}
      >
        <Users
          className="text-cyan-400 group-hover:text-cyan-300 transition 
                     drop-shadow-[0_0_10px_rgba(0,200,255,0.8)]"
          size={28}
        />
        <span
          className="text-xl md:text-2xl font-extrabold tracking-wide bg-gradient-to-r 
                     from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent
                     group-hover:drop-shadow-[0_0_15px_rgba(0,200,255,0.9)] transition"
        >
          Mi Agenda
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <button
          onClick={() => router.push("/contacts")}
          className="relative px-2 py-1 hover:text-cyan-400 transition
                     after:content-[''] after:block after:h-[2px] after:w-0 after:bg-cyan-400 
                     after:transition-all after:duration-300 hover:after:w-full after:rounded-full"
        >
          Contactos
        </button>

        <button
          onClick={() => router.push("/tasks")}
          className="relative px-2 py-1 hover:text-blue-400 transition
                     after:content-[''] after:block after:h-[2px] after:w-0 after:bg-blue-400 
                     after:transition-all after:duration-300 hover:after:w-full after:rounded-full"
        >
          Tareas
        </button>

        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg 
                     bg-gradient-to-r from-red-500/30 to-pink-600/30 
                     text-red-400 hover:text-red-300 hover:scale-105 
                     transition-transform shadow-[0_0_15px_rgba(255,0,70,0.4)]"
        >
          <LogOut size={18} />
          Salir
        </button>
      </div>

      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-cyan-400">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div
          className="absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-lg 
                     border-t border-cyan-400/20 flex flex-col items-center gap-6 py-6
                     animate-slideDown md:hidden"
        >
          <button
            onClick={() => {
              router.push("/contacts");
              setMenuOpen(false);
            }}
            className="text-lg hover:text-cyan-400 transition"
          >
            Contactos
          </button>

          <button
            onClick={() => {
              router.push("/tasks");
              setMenuOpen(false);
            }}
            className="text-lg hover:text-blue-400 transition"
          >
            Tareas
          </button>

          <button
            onClick={() => {
              logout();
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg 
                       bg-gradient-to-r from-red-500/30 to-pink-600/30 
                       text-red-400 hover:text-red-300 hover:scale-105 
                       transition-transform shadow-[0_0_15px_rgba(255,0,70,0.4)]"
          >
            <LogOut size={18} />
            Salir
          </button>
        </div>
      )}
    </nav>
  );
}
