'use client';

import ProjectCard from '@/components/admin/ProjectCard';
import { Project } from '@/types/project';

// Datos de ejemplo
const projects: Project[] = [
	{
		id: 1,
		name: 'EcoSolutions',
		team: ['Carlos Mendoza', 'Laura Paez'],
		description:
			'Plataforma para conectar recicladores con empresas que necesitan materia prima reciclada.',
		currentStage: 'Desarrollo de MVP',
		progress: 60,
		kpis: [
			{ label: 'Usuarios Registrados', value: '150', target: '500', isImpactMetric: false },
			{ label: 'Empresas Afiliadas', value: '12', target: '25', isImpactMetric: false },
			{ label: 'Toneladas de CO2 Reducidas', value: '5', target: '20', isImpactMetric: true },
			{ label: 'Empleos Verdes Creados', value: '8', target: '15', isImpactMetric: true },
		],
		milestones: [
			{ id: 1, name: 'Investigación de Mercado', status: 'Completed', dueDate: '2025-05-30' },
			{ id: 2, name: 'Diseño UX/UI', status: 'Completed', dueDate: '2025-06-15' },
			{ id: 3, name: 'Desarrollo del Backend', status: 'In Progress', dueDate: '2025-07-20' },
			{ id: 4, name: 'Lanzamiento Beta', status: 'Pending', dueDate: '2025-08-10' },
		],
	},
	{
		id: 2,
		name: 'HealthTech',
		team: ['Ana Rojas', 'Miguel Castro'],
		description:
			'Aplicación móvil para el monitoreo remoto de pacientes con enfermedades crónicas.',
		currentStage: 'Pruebas de Usuario',
		progress: 85,
		kpis: [
			{ label: 'Pacientes Activos', value: '80', target: '100' },
			{ label: 'Médicos Registrados', value: '25', target: '30' },
			{ label: 'Vidas Impactadas Directamente', value: '80', target: '100', isImpactMetric: true },
			{ label: 'Reducción de Hospitalizaciones', value: '15%', target: '25%', isImpactMetric: true },
		],
		milestones: [
			{ id: 1, name: 'Definición de Features', status: 'Completed', dueDate: '2025-06-01' },
			{ id: 2, name: 'Desarrollo de App', status: 'Completed', dueDate: '2025-07-01' },
			{ id: 3, name: 'Fase de Pruebas Internas', status: 'Completed', dueDate: '2025-07-15' },
			{ id: 4, name: 'Piloto con Pacientes', status: 'In Progress', dueDate: '2025-08-05' },
		],
	},
	{
		id: 3,
		name: 'EdTech Solutions',
		team: ['Sofia Lopez', 'Ricardo Herrera'],
		description:
			'Plataforma de aprendizaje adaptativo para estudiantes de educación básica.',
		currentStage: 'Validación de Mercado',
		progress: 45,
		kpis: [
			{ label: 'Estudiantes Activos', value: '200', target: '1000' },
			{ label: 'Colegios Afiliados', value: '8', target: '20' },
			{ label: 'Mejora en Rendimiento Académico', value: '25%', target: '40%', isImpactMetric: true },
			{ label: 'Estudiantes de Bajos Recursos Beneficiados', value: '120', target: '500', isImpactMetric: true },
		],
		milestones: [
			{ id: 1, name: 'Investigación Pedagógica', status: 'Completed', dueDate: '2025-05-15' },
			{ id: 2, name: 'Desarrollo de Algoritmo', status: 'Completed', dueDate: '2025-06-30' },
			{ id: 3, name: 'Pruebas en Colegios Piloto', status: 'In Progress', dueDate: '2025-07-30' },
			{ id: 4, name: 'Lanzamiento Comercial', status: 'Pending', dueDate: '2025-09-15' },
		],
	},
];

export default function ProjectTrackingPage() {
	return (
		<div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
			<div className="max-w-7xl mx-auto">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-800">Seguimiento y Acompañamiento</h1>
					<p className="text-lg text-gray-600 mt-2">
						Monitorea el progreso y el impacto de las startups del portafolio StartUPC.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
					{projects.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>
			</div>
		</div>
	);
}