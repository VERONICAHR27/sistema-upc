import { Milestone } from '@/types/project';
import { FaCheckCircle, FaSpinner, FaClock } from 'react-icons/fa';

interface MilestoneTrackerProps {
  milestones: Milestone[];
}

const statusInfo = {
  Completed: { icon: <FaCheckCircle className="text-green-500" />, color: 'text-gray-500 line-through' },
  'In Progress': { icon: <FaSpinner className="text-blue-500 animate-spin" />, color: 'text-gray-800 font-semibold' },
  Pending: { icon: <FaClock className="text-gray-400" />, color: 'text-gray-600' },
};

export default function MilestoneTracker({ milestones }: MilestoneTrackerProps) {
  return (
    <div className="space-y-4">
      {milestones.map((milestone) => (
        <div key={milestone.id} className="flex items-start">
          <div className="mr-4 mt-1">{statusInfo[milestone.status].icon}</div>
          <div>
            <p className={`font-medium ${statusInfo[milestone.status].color}`}>
              {milestone.name}
            </p>
            <p className="text-xs text-gray-500">Vence: {milestone.dueDate}</p>
          </div>
        </div>
      ))}
    </div>
  );
}