'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  FaHome, 
  FaUsers, 
  FaChartLine, 
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaFileAlt,
  FaCog,
  FaBell,
  FaCalendarAlt,
  // FaAward,
  // FaBuilding,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import { useState } from 'react';

const menuItems = [
  { 
    href: '/admin/dashboard', 
    label: 'Dashboard', 
    icon: FaHome,
    description: '¿Como vamos con el programa?'
  },
  { 
    href: '/admin/users', 
    label: 'Usuarios', 
    icon: FaUsers,
    description: 'Registros y roles'
  },
  { 
  href: '/admin/postulaciones', 
  label: 'Postulaciones', 
  icon: FaChartLine,
  description: 'Buzón de postulaciones y seguimiento'
  },
  { 
    href: '/admin/convocatorias', 
    label: 'Convocatorias', 
    icon: FaFileAlt,
    description: 'Gestión completa de convocatorias'
  },
  { 
    href: '/admin/events', 
    label: 'Eventos', 
    icon: FaCalendarAlt,
    description: 'Programación de actividades'
  },
  // { 
  //   href: '/admin/mentors', 
  //   label: 'Red de Mentores', 
  //   icon: FaAward,
  //   description: 'Gestión de expertos'
  // },
  // { 
  //   href: '/admin/companies', 
  //   label: 'Empresas Colaboradoras', 
  //   icon: FaBuilding,
  //   description: 'Partners del ecosistema'
  // },
];

const quickActions = [
  { 
    href: '/admin/applications/new', 
    label: 'Nueva Convocatoria',
    color: 'bg-blue-500 hover:bg-blue-600'
  },
  { 
    href: '/admin/events/new', 
    label: 'Nuevo Evento',
    color: 'bg-green-500 hover:bg-green-600'
  },
  { 
    href: '/admin/users/new', 
    label: 'Nuevo Usuario',
    color: 'bg-purple-500 hover:bg-purple-600'
  }
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const [notifications] = useState(3); // Simulado

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white p-2 rounded-md shadow-lg border border-gray-200 relative"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notifications}
            </span>
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-white shadow-lg border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 bg-gradient-to-r from-pink-500 to-red-500">
            <span className="text-xl font-bold text-white">
              StartUPC Admin
            </span>
            {notifications > 0 && (
              <div className="relative">
                <FaBell className="text-white h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-900 text-xs rounded-full h-4 w-4 flex items-center justify-center font-semibold">
                  {notifications}
                </span>
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                {user?.name.charAt(0)}
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-600">{user?.role}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                  En línea
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-b border-gray-200">
            <button
              onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
              className="flex items-center justify-between w-full text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <span>Acciones Rápidas</span>
              {isQuickActionsOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            
            {isQuickActionsOpen && (
              <div className="mt-3 space-y-2">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-center py-2 px-3 rounded-md text-xs font-medium text-white transition-colors ${action.color}`}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Panel Principal
            </div>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    group flex flex-col px-3 py-3 rounded-md text-sm transition-all duration-200
                    ${isActive 
                      ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  <div className="flex items-center">
                    <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <span className={`text-xs mt-1 ml-8 ${isActive ? 'text-pink-100' : 'text-gray-500'}`}>
                    {item.description}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <Link
              href="/admin/settings"
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
            >
              <FaCog className="mr-3 h-4 w-4" />
              Configuración
            </Link>
            
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors"
            >
              <FaSignOutAlt className="mr-3 h-4 w-4" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}