import { useEffect } from 'react';
import MembersList from 'src/components/member/MemberList';
import TasksModal from 'src/components/member/TaskModal';

import { useUserStore } from 'src/core/stores/memberStore';

export default function UsersContainer() {
  const {
    users,
    loading,
    q,
    selectedUserTasks,
    showTasksModal,
    setQuery,
    fetchUsers,
    fetchUserTasks,
    closeModal,
  } = useUserStore();

  useEffect(() => {
    fetchUsers(q);
  }, [q]);

  return (
    <>
      <MembersList
        users={users}
        loading={loading}
        query={q}
        setQuery={setQuery}
        onSelectUser={fetchUserTasks}
      />
      {showTasksModal && (
        <TasksModal tasks={selectedUserTasks} onClose={closeModal} />
      )}
    </>
  );
}
