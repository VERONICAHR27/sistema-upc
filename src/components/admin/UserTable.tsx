import { User } from '@/app/admin/users/page';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: number) => void;
}

export default function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full leading-normal">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
            <th className="py-3 px-6 text-left">Nombre</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-center">Rol</th>
            <th className="py-3 px-6 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-4 px-6 text-left whitespace-nowrap">{user.name}</td>
              <td className="py-4 px-6 text-left">{user.email}</td>
              <td className="py-4 px-6 text-center">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    user.role === 'Coordinador' ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'
                }`}>
                  {user.role}
                </span>
              </td>
              <td className="py-4 px-6 text-center">
                <button 
                  onClick={() => onEdit(user)} 
                  className="text-blue-500 hover:text-blue-700 mr-4"
                  title="Editar usuario"
                >
                  <FaEdit size={18} />
                </button>
                <button 
                  onClick={() => onDelete(user.id)} 
                  className="text-red-500 hover:text-red-700"
                  title="Eliminar usuario"
                >
                  <FaTrash size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}