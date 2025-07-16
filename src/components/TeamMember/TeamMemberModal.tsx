import React from 'react';

interface TeamMember {
  nombres: string;
  apellidos: string;
  rol: string;
  tiempoCompleto: string;
  fechaNacimiento: string;
  lugarNacimiento: string;
  direccion: string;
  tipoDocumento: string;
  numeroDocumento: string;
  telefono: string;
  email: string;
  linkedin: string;
}

interface TeamMemberModalProps {
  isOpen: boolean;
  member: TeamMember;
  errors: Record<string, string>;
  isEditing: boolean;
  onClose: () => void;
  onChange: (field: keyof TeamMember, value: string) => void;
  onSave: () => void;
}

export default function TeamMemberModal({
  isOpen,
  member,
  errors,
  isEditing,
  onClose,
  onChange,
  onSave
}: TeamMemberModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            {isEditing ? 'Editar Miembro del Equipo' : 'Agregar Miembro del Equipo'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nombres */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombres completos *
            </label>
            <input
              type="text"
              value={member.nombres}
              onChange={(e) => onChange('nombres', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                errors.nombres ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Nombres completos"
            />
            {errors.nombres && (
              <p className="text-red-500 text-sm mt-1">{errors.nombres}</p>
            )}
          </div>

          {/* Apellidos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Apellidos completos *
            </label>
            <input
              type="text"
              value={member.apellidos}
              onChange={(e) => onChange('apellidos', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                errors.apellidos ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Apellidos completos"
            />
            {errors.apellidos && (
              <p className="text-red-500 text-sm mt-1">{errors.apellidos}</p>
            )}
          </div>

          {/* Rol */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rol en la Startup *
            </label>
            <input
              type="text"
              value={member.rol}
              onChange={(e) => onChange('rol', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                errors.rol ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ej.: CEO, CTO, COO, CMO, Cofundador, etc."
            />
            {errors.rol && (
              <p className="text-red-500 text-sm mt-1">{errors.rol}</p>
            )}
          </div>

          {/* Tiempo completo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ¿Se dedica tiempo completo a la startup? *
            </label>
            <div className="flex space-x-4 mt-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="SI"
                  checked={member.tiempoCompleto === 'SI'}
                  onChange={(e) => onChange('tiempoCompleto', e.target.value)}
                  className="mr-2 text-fuchsia-500 focus:ring-fuchsia-500"
                />
                Sí
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="NO"
                  checked={member.tiempoCompleto === 'NO'}
                  onChange={(e) => onChange('tiempoCompleto', e.target.value)}
                  className="mr-2 text-fuchsia-500 focus:ring-fuchsia-500"
                />
                No
              </label>
            </div>
            {errors.tiempoCompleto && (
              <p className="text-red-500 text-sm mt-1">{errors.tiempoCompleto}</p>
            )}
          </div>

          {/* Fecha de nacimiento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de nacimiento *
            </label>
            <input
              type="text"
              value={member.fechaNacimiento}
              onChange={(e) => onChange('fechaNacimiento', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                errors.fechaNacimiento ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="DD/MM/AAAA"
              maxLength={10}
            />
            {errors.fechaNacimiento && (
              <p className="text-red-500 text-sm mt-1">{errors.fechaNacimiento}</p>
            )}
          </div>

          {/* Lugar de nacimiento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lugar de nacimiento *
            </label>
            <input
              type="text"
              value={member.lugarNacimiento}
              onChange={(e) => onChange('lugarNacimiento', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                errors.lugarNacimiento ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ciudad y país"
            />
            {errors.lugarNacimiento && (
              <p className="text-red-500 text-sm mt-1">{errors.lugarNacimiento}</p>
            )}
          </div>

          {/* Dirección de residencia */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dirección de residencia actual *
            </label>
            <input
              type="text"
              value={member.direccion}
              onChange={(e) => onChange('direccion', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                errors.direccion ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Dirección completa de residencia"
            />
            {errors.direccion && (
              <p className="text-red-500 text-sm mt-1">{errors.direccion}</p>
            )}
          </div>

          {/* Tipo de documento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de documento de identidad *
            </label>
            <select
              value={member.tipoDocumento}
              onChange={(e) => onChange('tipoDocumento', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                errors.tipoDocumento ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Selecciona el tipo</option>
              <option value="DNI">DNI</option>
              <option value="PASAPORTE">PASAPORTE</option>
              <option value="CARNET_EXTRANJERIA">CARNET DE EXTRANJERÍA</option>
              <option value="OTROS">OTROS</option>
            </select>
            {errors.tipoDocumento && (
              <p className="text-red-500 text-sm mt-1">{errors.tipoDocumento}</p>
            )}
          </div>

          {/* Número de documento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número de documento *
            </label>
            <input
              type="text"
              value={member.numeroDocumento}
              onChange={(e) => onChange('numeroDocumento', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                errors.numeroDocumento ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Número del documento"
            />
            {errors.numeroDocumento && (
              <p className="text-red-500 text-sm mt-1">{errors.numeroDocumento}</p>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono de contacto *
            </label>
            <input
              type="text"
              value={member.telefono}
              onChange={(e) => onChange('telefono', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                errors.telefono ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Incluye código de país"
            />
            {errors.telefono && (
              <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico personal *
            </label>
            <input
              type="email"
              value={member.email}
              onChange={(e) => onChange('email', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="correo@ejemplo.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* LinkedIn */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enlace al perfil de LinkedIn *
            </label>
            <input
              type="url"
              value={member.linkedin}
              onChange={(e) => onChange('linkedin', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                errors.linkedin ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://linkedin.com/in/tuperfil"
            />
            {errors.linkedin && (
              <p className="text-red-500 text-sm mt-1">{errors.linkedin}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-gradient-to-r from-fuchsia-500 to-red-500 text-white rounded-md hover:from-fuchsia-600 hover:to-red-600"
          >
            {isEditing ? 'Actualizar' : 'Agregar'} Miembro
          </button>
        </div>
      </div>
    </div>
  );
}
