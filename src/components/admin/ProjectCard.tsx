'use client';

import { useState } from 'react';
import { Project } from '@/types/project';
import { FaChevronDown, FaChevronUp, FaUsers, FaBullseye, FaTasks } from 'react-icons/fa';
import KpiDisplay from './KpiDisplay';
import MilestoneTracker from './MilestoneTracker';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300">
      {/* Encabezado de la tarjeta (siempre visible) */}
      <div className="p-6 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{project.name}</h3>
            <p className="text-sm text-gray-500 font-medium flex items-center mt-1">
              <FaUsers className="mr-2" /> {project.team.join(', ')}
            </p>
          </div>
          <button className="text-gray-500 hover:text-blue-500">
            {isExpanded ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
          </button>
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-blue-600">{project.currentStage}</span>
            <span className="text-sm font-bold text-gray-700">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
          </div>
        </div>
      </div>

      {/* Contenido expandible */}
      {isExpanded && (
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <p className="text-gray-700 mb-6">{project.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                <FaBullseye className="mr-2 text-green-500"/> KPIs de Crecimiento e Impacto
              </h4>
              <KpiDisplay kpis={project.kpis} />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                <FaTasks className="mr-2 text-purple-500"/> Hitos del Proyecto
              </h4>
              <MilestoneTracker milestones={project.milestones} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}