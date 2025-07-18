import { FaMale, FaFemale } from 'react-icons/fa';

interface UserCardProps {
  username: string;
  gender: 'MALE' | 'FEMALE';
  department: string;
}

export function UserCard({ username, gender, department }: UserCardProps) {
  const genderIcon =
    gender === 'MALE' ? (
      <FaMale className="text-blue-500" />
    ) : (
      <FaFemale className="text-pink-500" />
    );

  return (
    <div className="flex items-center justify-between rounded-xl border p-4 shadow-sm">
      <div className="space-y-1">
        <p className="text-lg font-semibold">{username}</p>
        <p className="text-sm text-gray-500">{department}</p>
      </div>
      <div className="text-2xl">{genderIcon}</div>
    </div>
  );
}
