import { useEffect, useState } from 'react';
import DepartmentMembersList from 'src/components/department/DepartmentMembersList';
import { GetDepartmentsService } from 'src/services/https-service';

interface Member {
  username: string;
  email: string;
  role: string
}

interface Department {
  department: string;
  members: Member[];
}

export default function DepartmentMembersContainer() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDepartments = async () => {
    try {
      const data = await GetDepartmentsService();
      setDepartments(data);
    } catch (err) {
      console.error('Error fetching departments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div className="pt-10">
      <h1 className="text-center text-3xl font-bold text-tamPurple-tam mb-6">Departments & Members</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <DepartmentMembersList departments={departments} />
      )}
    </div>
  );
}
