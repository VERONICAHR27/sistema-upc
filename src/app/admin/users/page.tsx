'use client';

import { useState } from 'react';
import UserTable from '@/components/admin/UserTable';
import UserFormModal from '@/components/admin/UserFormModal';
import { FaPlus } from 'react-icons/fa';

// Definimos el tipo para un usuario para mayor seguridad de tipos
export type User = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  role: 'Coordinador' | 'Usuario' | 'Startup';
};

// Datos de ejemplo (mock data)
const initialUsers: User[] = [
  { id: 1, name: 'Veronica H.', lastname: 'Hernandez', email: 'veronica@example.com', password: 'veronica123', role: 'Coordinador' },
  { id: 2, name: 'Johel C.', lastname: 'Cruz', email: 'johel@example.com', password: 'johel123', role: 'Coordinador' },
  { id: 3, name: 'EcoSolutions Team', lastname: '', email: 'contact@ecosolutions.com', password: 'ecosolutions123', role: 'Usuario' },
  { id: 4, name: 'HealthTech Team', lastname: '', email: 'contact@healthtech.com', password: 'healthtech123', role: 'Usuario' },
  { id: 5, name: 'EdTech Solutions', lastname: '', email: 'contact@edtechsolutions.com', password: 'edtechsolutions123', role: 'Usuario' },
];

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleOpenModal = (user: User | null = null) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingUser(null);
    setIsModalOpen(false);
  };

  const handleSaveUser = (user: Omit<User, 'id'> & { id?: number }) => {
    if (user.id) {
      // Editar usuario existente
      const updatedUser: User = {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        role: user.role,
      };
      setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
    } else {
      // Crear nuevo usuario
      const newUser: User = {
        id: Date.now(),
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        role: user.role,
      };
      setUsers([...users, newUser]);
    }
    handleCloseModal();
  };

  const handleDeleteUser = (userId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
        setUsers(users.filter((user) => user.id !== userId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Gestión de usuarios</h1>
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2"
          >
            <FaPlus />
            <span>Crear Perfil</span>
          </button>
        </div>

        <UserTable users={users} onEdit={handleOpenModal} onDelete={handleDeleteUser} />
      </div>

      {isModalOpen && (
        <UserFormModal
          user={editingUser}
          onClose={handleCloseModal}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
}