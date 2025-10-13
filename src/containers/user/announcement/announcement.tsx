import { useEffect } from 'react';
import AnnouncementList from 'src/components/announcement/announcement-list';
import { useAnnouncementStore } from 'src/core/stores/announcementStore';

export default function AnnouncementContainer() {
  const { announcements, loading, fetchAnnouncements } = useAnnouncementStore();

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <AnnouncementList announcements={announcements} />
      )}
    </div>
  );
}
