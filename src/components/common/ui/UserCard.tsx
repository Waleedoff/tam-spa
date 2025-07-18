import { HiOutlineUser } from 'react-icons/hi';
import { FaMale, FaFemale } from 'react-icons/fa';
import { MdOutlineChecklist } from 'react-icons/md';

interface UserCardProps {
  username: string;
  specialization: string;
  gender: string;
  onClick?: () => void;

}

export function UserCard({
  username,
  specialization,
  gender,
  onClick,
}: UserCardProps): JSX.Element {
  const genderIcon =
    gender === 'MALE' ? (
      <FaMale className="text-xl text-blue-500" />
    ) : (
      <FaFemale className="text-xl text-pink-500" />
    );

  const specializationColors: Record<string, string> = {
    DEVELOPER: 'bg-blue-100 text-blue-800',
    BUSINESS: 'bg-yellow-100 text-yellow-800',
    HR: 'bg-green-100 text-green-800',
    FINANCE: 'bg-purple-100 text-purple-800',
    HUNTER: 'bg-red-100 text-red-800',
  };

  const specializationStyle =
    specializationColors[specialization.toUpperCase()] ||
    'bg-gray-100 text-gray-800';

  return (
    <div
    className="w-full rounded-xl border bg-white p-4 shadow-md hover:shadow-lg cursor-pointer transition"
    onClick={onClick}
  >
      <div className="flex items-center space-x-4">
        {/* Avatar Icon */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
          {genderIcon}
        </div>

        {/* User Info */}
        <div className="flex-1">
          <h4 className="text-md flex items-center gap-1 font-semibold text-gray-800">
            <HiOutlineUser className="text-gray-500" />
            {username}
          </h4>

          {/* Specialization Badge */}
          <span
            className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${specializationStyle}`}
          >
            {specialization.toLowerCase()}
          </span>
        </div>
        <MdOutlineChecklist className="text-tamPurple-tam text-xl hover:text-tamPurple-dark" title="View Tasks" />
      </div>
    </div>
  );
}
