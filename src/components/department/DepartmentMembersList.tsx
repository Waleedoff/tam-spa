import { useState } from 'react';
import { Users, Briefcase, Building2, DollarSign, Target } from 'lucide-react';

interface Member {
  username: string;
  email: string;
  role: string;
}

interface Department {
  department: string;
  members: Member[];
}

interface DepartmentMembersListProps {
  departments: Department[];
}

const departmentIcons: Record<string, JSX.Element> = {
  DEVOLOPER: <Users className="text-blue-500" size={20} />,
  BUSINESS: <Briefcase className="text-green-500" size={20} />,
  HR: <Building2 className="text-purple-500" size={20} />,
  FINAINC: <DollarSign className="text-yellow-500" size={20} />,
  HUNTER: <Target className="text-red-500" size={20} />,
};

export default function DepartmentMembersList({
  departments,
}: DepartmentMembersListProps) {
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (department: string) => {
    setOpen((prev) => (prev === department ? null : department));
  };

  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 md:pl-64 lg:grid-cols-3">
      {departments.map((dep) => {
        const isOpen = open === dep.department;
        const Icon = departmentIcons[dep.department] ?? (
          <Users size={20} className="text-gray-400" />
        );

        return (
          <div
            key={dep.department}
            className={`rounded-2xl border bg-white shadow-md transition-all duration-300 hover:shadow-xl ${
              isOpen ? 'border-tamPurple-tam' : 'border-gray-100'
            }`}
          >
            <button
              onClick={() => toggle(dep.department)}
              className="flex w-full items-center justify-between p-6 text-left"
            >
              <div className="flex items-center gap-3">
                {Icon}
                <div>
                  <h2 className="text-lg font-bold text-tamPurple-tam">
                    {dep.department}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {dep.members.length} member{dep.members.length !== 1 && 's'}
                  </p>
                </div>
              </div>

              <div
                className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              >
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>

            {isOpen && (
              <div className="border-t border-gray-100 px-6 pb-6">
                {dep.members.length === 0 ? (
                  <p className="pt-4 text-sm text-gray-400">
                    No members in this department.
                  </p>
                ) : (
                  <ul className="mt-4 space-y-3">
                    {dep.members.map((member, idx) => (
                      <li
                        key={idx}
                        className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm shadow-sm"
                      >
                        <p className="font-semibold text-tamPurple-tam">
                          {member.username}
                        </p>
                        <p className="text-gray-500">{member.email}</p>
                        <p className="text-xs italic text-gray-400">
                          {member.role}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
