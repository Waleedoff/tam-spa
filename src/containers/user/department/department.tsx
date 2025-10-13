// src/containers/department/DepartmentMembersContainer.tsx
import { useEffect } from 'react';
import DepartmentMembersList from 'src/components/department/DepartmentMembersList';
import DepartmentSkeleton from 'src/core/skeleton/DepartmentSkeleton';
import { useDepartmentStore } from 'src/core/stores/departmentStore';

export default function DepartmentMembersContainer() {
  const { departments, loading, fetchDepartments } = useDepartmentStore();

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div className="pt-10">
      <h1 className="mb-6 text-center text-3xl font-bold text-tamPurple-tam">
        Departments & Members
      </h1>
      {loading ? (
        <DepartmentSkeleton />
      ) : (
        <DepartmentMembersList departments={departments} />
      )}
    </div>
  );
}
