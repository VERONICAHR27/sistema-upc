import React, { useState, useEffect } from 'react';

// Mejor importar el tipo User desde el contexto o un archivo de tipos, no desde la página
import { User } from '@/contexts/AuthContext';

type Props = {
  user: User | null;
  onClose: () => void;
  onSave: (user: Omit<User, 'id'> & { id?: number }) => void;
};

export default function UserFormModal({ user, onClose, onSave }: Props) {
  const [form, setForm] = useState<Omit<User, 'id'>>({
    name: '',
    lastname: '',
    email: '',
    password: '',
    role: 'Usuario',
  });

  useEffect(() => {
    if (user) {
      // Si estamos editando, carga los datos
      const { ...rest } = user;
      setForm(rest);
    } else {
      // Si estamos creando, limpia el formulario
      setForm({
        name: '',
        lastname: '',
        email: '',
        password: '',
        role: 'Usuario',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.lastname || !form.email || !form.password) return;
    if (user && typeof user.id === 'number') {
      onSave({ ...form, id: user.id });
    } else {
      onSave(form);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full border border-pink-200">
        <h2 className="text-xl font-bold text-pink-700 mb-6">{user ? 'Editar Usuario' : 'Crear Usuario'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            required
          />
          <input
            name="lastname"
            type="text"
            placeholder="Apellido"
            value={form.lastname}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            required
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="Usuario">Usuario</option>
            <option value="Coordinador">Coordinador</option>
          </select>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-pink-600 text-white font-bold hover:bg-pink-700 transition"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}