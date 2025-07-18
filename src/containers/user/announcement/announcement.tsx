// // src/pages/Login.tsx
// import { CreateAnnouncemnt } from 'src/core/types/user.type';
import { GetAllAnnouncementService } from 'src/services/https-service';
// import { useNavigate } from 'react-router-dom';
// import { appRoutesObj } from 'src/app.paths';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import CreateAnnouncementForm from 'src/components/announcement/CreateAnnouncementForm';
// import { useEffect, useState } from 'react';

// export default function Announcement() {
//   const navigate = useNavigate();
//   const [announcements, setAnnouncements] = useState<CreateAnnouncemnt[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAnnouncements()
//       .then((res) => setAnnouncements(res))
//       .finally(() => setLoading(false));
//   }, [fetchAnnouncements]);



//   const handleSubmit = async (data: CreateAnnouncemnt) => {
//     try {
//       await CreateAnnouncementService(data);
//       console.log(toast.success('Logged in successfully!'));
//       toast.success('Logged in successfully!');
//       navigate(appRoutesObj.getHomePath());
//     } catch (error) {
//       console.error(error);
//       toast.error('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <>
//       <AnnouncementsList fetchAnnouncements={getAllAnnouncementsService} />
//       <CreateAnnouncementForm onSubmit={handleSubmit} />
//       <ToastContainer position="top-right" autoClose={3000} />
//     </>
//   );
// }

import { useEffect, useState } from 'react';
import AnnouncementList from 'src/components/announcement/announcement-list';

interface Announcement {
  id: string;
  title: string;
  content: string;
  media_url: string;
  vote: {
    helpfull: number;
    unhelpfull: number;
  };
  
}

export default function Announcement() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAnnouncements = async () => {
    try {
      const data = await GetAllAnnouncementService();
      setAnnouncements(data);
    } catch (error) {
      console.error('Error loading announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    // <div className="pt-10 md:pl-64">
    <div>
      {/* <h1 className="text-center text-3xl font-bold text-tamPurple-tam mb-6"></h1> */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <AnnouncementList announcements={announcements} />
      )}
      </div>
    // </div>
  );
}
