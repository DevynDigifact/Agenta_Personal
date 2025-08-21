"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, ClipboardList, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

type Contact = {
  id: number;
  name: string;
  phone: string;
  email: string;
};

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newContact, setNewContact] = useState<Contact>({
    id: Date.now(),
    name: "",
    phone: "",
    email: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("logged")) {
      router.push("/login");
      return;
    }

    setContacts([
      { id: 1, name: "Juan Pérez", phone: "3555-1234", email: "juan@test.com" },
      { id: 2, name: "Ana López", phone: "6555-5678", email: "ana@test.com" },
      { id: 3, name: "Samuel Perez", phone: "8515-5678", email: "perez@test.com" },
      { id: 4, name: "Diego Bercian", phone: "0525-5678", email: "diego@test.com" },
    ]);
  }, [router]);

  function deleteContact(id: number) {
    setContacts(contacts.filter((c) => c.id !== id));
    toast.success("Contacto eliminado");
  }

  function addContact() {
    if (!newContact.name.trim() || !newContact.phone.trim() || !newContact.email.trim()) {
      toast.error("Completa todos los campos");
      return;
    }
    setContacts([...contacts, { ...newContact, id: Date.now() }]);
    setNewContact({ id: Date.now(), name: "", phone: "", email: "" });
    setShowModal(false);
    toast.success("Contacto agregado");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      <Navbar />

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-10 max-w-7xl mx-auto">
        <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold tracking-wide">Mis Contactos</h2>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium 
                         bg-gradient-to-r from-cyan-500 to-blue-600 
                         hover:opacity-90 transition text-sm shadow"
            >
              <UserPlus size={16} />
              Agregar
            </button>
          </div>

          <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-2">
            {contacts.length > 0 ? (
              contacts.map((c) => (
                <div
                  key={c.id}
                  className="flex justify-between items-center bg-white/5 p-4 rounded-lg border border-white/10"
                >
                  <div>
                    <p className="font-medium">{c.name}</p>
                    <p className="text-xs text-gray-400">{c.phone}</p>
                    <p className="text-xs text-gray-500">{c.email}</p>
                  </div>
                  <button
                    onClick={() => deleteContact(c.id)}
                    className="p-2 rounded-lg hover:bg-red-500/20 transition"
                  >
                    <Trash2 className="text-red-400" size={16} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">No hay contactos aún</p>
            )}
          </div>
        </section>

        <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow flex flex-col justify-between overflow-hidden">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              Gestión de Tareas
            </motion.h2>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
              className="text-sm text-gray-300 mb-6"
            >
              Organiza tus pendientes y tareas diarias de forma sencilla. Crea,
              edita y marca como completadas tus actividades importantes.
            </motion.p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(0,200,255,0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/tasks")}
            className="flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-medium 
                       bg-gradient-to-r from-cyan-500 to-blue-600 
                       transition"
          >
            <ClipboardList size={20} />
            Ir a Tareas
          </motion.button>
        </section>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-white/10 rounded-xl shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Agregar Contacto</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nombre"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 
                           text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <input
                type="text"
                placeholder="Teléfono"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 
                           text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={newContact.email}
                onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 
                           text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
              >
                Cancelar
              </button>
              <button
                onClick={addContact}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 transition font-medium"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
