"use client";

import { useState } from "react";
import { Plus, Trash2, Edit3, X, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";

type Task = {
    text: string;
    priority: "Alta" | "Media" | "Baja";
    done: boolean;
};

export default function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskText, setTaskText] = useState("");
    const [priority, setPriority] = useState<"Alta" | "Media" | "Baja">("Media");
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editText, setEditText] = useState("");
    const [editPriority, setEditPriority] = useState<"Alta" | "Media" | "Baja">("Media");

    const priorityOrder = { Alta: 1, Media: 2, Baja: 3 };

    const addTask = () => {
        if (!taskText.trim()) {
            toast.error("Escribe una tarea.");
            return;
        }
        setTasks([...tasks, { text: taskText.trim(), priority, done: false }]);
        setTaskText("");
        toast.success("Tarea agregada");
    };

    const startEditTask = (index: number) => {
        setIsEditing(true);
        setEditIndex(index);
        setEditText(tasks[index].text);
        setEditPriority(tasks[index].priority);
    };

    const saveEditTask = () => {
        if (editIndex === null) return;
        if (!editText.trim()) {
            toast.error("La tarea no puede estar vacía");
            return;
        }
        const updated = [...tasks];
        updated[editIndex].text = editText.trim();
        updated[editIndex].priority = editPriority;
        setTasks(updated);
        setIsEditing(false);
        setEditIndex(null);
        setEditText("");
        toast.success("Tarea editada");
    };

    const deleteTask = (index: number) => {
        const updated = [...tasks];
        updated.splice(index, 1);
        setTasks(updated);
        toast.success("Tarea eliminada");
    };

    const toggleDone = (index: number) => {
        const updated = [...tasks];
        updated[index].done = !updated[index].done;
        setTasks(updated);
        toast.success(updated[index].done ? "Tarea completada 🎉" : "Tarea reactivada");
    };

    const PriorityBadge = ({ level }: { level: "Alta" | "Media" | "Baja" }) => {
        const colors =
            level === "Alta"
                ? "bg-red-500/20 text-red-400 border-red-400/30"
                : level === "Media"
                    ? "bg-yellow-500/20 text-yellow-300 border-yellow-400/30"
                    : "bg-green-500/20 text-green-400 border-green-400/30";
        return (
            <span
                className={`text-xs px-2 py-1 rounded-lg border font-medium ${colors}`}
            >
                {level}
            </span>
        );
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-6 md:p-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent text-center">
                    Mis Tareas
                </h1>

                <div className="flex flex-col sm:flex-row gap-4 mb-10 max-w-3xl mx-auto">
                    <input
                        type="text"
                        value={taskText}
                        onChange={(e) => setTaskText(e.target.value)}
                        placeholder="Escribe una nueva tarea..."
                        className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />

                    <div className="flex gap-2">
                        {["Alta", "Media", "Baja"].map((lvl) => (
                            <button
                                key={lvl}
                                onClick={() => setPriority(lvl as "Alta" | "Media" | "Baja")}
                                className={`px-3 py-2 rounded-lg text-sm font-medium border transition ${priority === lvl
                                        ? lvl === "Alta"
                                            ? "bg-red-500/20 text-red-400 border-red-400"
                                            : lvl === "Media"
                                                ? "bg-yellow-500/20 text-yellow-300 border-yellow-400"
                                                : "bg-green-500/20 text-green-400 border-green-400"
                                        : "bg-white/10 text-gray-400 border-white/20 hover:bg-white/20"
                                    }`}
                            >
                                {lvl}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={addTask}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:scale-105 transition-transform font-medium shadow-lg"
                    >
                        <Plus size={18} /> Agregar
                    </button>
                </div>

                <ul className="space-y-4 max-w-3xl mx-auto">
                    {tasks
                        .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
                        .map((task, index) => (
                            <li
                                key={index}
                                className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10 shadow backdrop-blur-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => toggleDone(index)}
                                        className={`p-1 rounded-full transition ${task.done ? "text-green-400" : "text-gray-400 hover:text-green-400"
                                            }`}
                                    >
                                        <CheckCircle
                                            size={20}
                                            className={task.done ? "fill-green-500" : ""}
                                        />
                                    </button>
                                    <div>
                                        <p
                                            className={`font-medium ${task.done ? "line-through text-gray-500" : ""
                                                }`}
                                        >
                                            {task.text}
                                        </p>
                                        <PriorityBadge level={task.priority} />
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => startEditTask(index)}
                                        className="p-2 rounded-lg hover:bg-blue-500/20 transition"
                                    >
                                        <Edit3 size={16} className="text-blue-400" />
                                    </button>
                                    <button
                                        onClick={() => deleteTask(index)}
                                        className="p-2 rounded-lg hover:bg-red-500/20 transition"
                                    >
                                        <Trash2 size={16} className="text-red-400" />
                                    </button>
                                </div>
                            </li>
                        ))}
                </ul>

                {isEditing && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
                        <div className="bg-slate-900 border border-white/10 p-6 rounded-xl shadow-lg w-96 max-w-[90%]">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">Editar Tarea</h2>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />

                            <div className="flex gap-2 mb-4">
                                {["Alta", "Media", "Baja"].map((lvl) => (
                                    <button
                                        key={lvl}
                                        onClick={() => setEditPriority(lvl as "Alta" | "Media" | "Baja")}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium border transition ${editPriority === lvl
                                                ? lvl === "Alta"
                                                    ? "bg-red-500/20 text-red-400 border-red-400"
                                                    : lvl === "Media"
                                                        ? "bg-yellow-500/20 text-yellow-300 border-yellow-400"
                                                        : "bg-green-500/20 text-green-400 border-green-400"
                                                : "bg-white/10 text-gray-400 border-white/20 hover:bg-white/20"
                                            }`}
                                    >
                                        {lvl}
                                    </button>
                                ))}
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={saveEditTask}
                                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 transition font-medium"
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
