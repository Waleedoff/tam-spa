import { useState } from 'react';
import {
  CommentOnAnnouncementService,
  getCommentsForAnnouncementService,
  voteOnAnnouncementService,
} from 'src/services/https-service';

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

interface AnnouncementListProps {
  announcements: Announcement[];
}

interface CommentType {
  content: string;
  username: string;
  created: Date;
}

export default function AnnouncementList({
  announcements: initial,
}: AnnouncementListProps) {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initial);
  const [voted, setVoted] = useState<
    Record<string, 'HELPFUL' | 'UNHELPFUL' | null>
  >({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [replyBoxOpen, setReplyBoxOpen] = useState<Record<string, boolean>>({});
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});
  const [announcementComments, setAnnouncementComments] = useState<
    Record<string, CommentType[]>
  >({});

  const handleToggleComments = async (id: string) => {
    setOpenComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    if (!announcementComments[id]) {
      try {
        const comments = await getCommentsForAnnouncementService(id);
        setAnnouncementComments((prev) => ({
          ...prev,
          [id]: comments,
        }));
      } catch (err) {
        console.error('Failed to fetch comments', err);
      }
    }
  };

  const handleCommentSubmit = async (id: string) => {
    const content = comments[id]?.trim();
    if (!content) return;

    try {
      await CommentOnAnnouncementService({ content }, id);

      const newComment: CommentType = {
        content,
        username: 'You',
        created: new Date(),
      };

      setAnnouncementComments((prev) => ({
        ...prev,
        [id]: [...(prev[id] || []), newComment],
      }));

      setComments((prev) => ({ ...prev, [id]: '' }));
      setReplyBoxOpen((prev) => ({ ...prev, [id]: false }));
    } catch (error) {
      console.error('Comment failed:', error);
    }
  };

  const handleVote = async (id: string, type: 'HELPFUL' | 'UNHELPFUL') => {
    setVoted((prev) => ({ ...prev, [id]: type }));
    setAnnouncements((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              vote: {
                ...a.vote,
                helpfull:
                  type === 'HELPFUL' ? a.vote.helpfull + 1 : a.vote.helpfull,
                unhelpfull:
                  type === 'UNHELPFUL'
                    ? a.vote.unhelpfull + 1
                    : a.vote.unhelpfull,
              },
            }
          : a,
      ),
    );
    try {
      await voteOnAnnouncementService(id, type);
    } catch (error) {
      console.error('Vote failed:', error);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-4">
      {announcements.map((a) => {
        const voteStatus = voted[a.id];
        return (
          <div
            key={a.id}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition hover:shadow-lg"
          >
            {a.media_url && (
              <img
                src={a.media_url}
                alt={a.title}
                className="mb-4 h-60 w-full rounded-xl object-cover"
              />
            )}

            <h2 className="mb-2 text-xl font-semibold text-tamPurple-tam">
              {a.title}
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-gray-700">
              {a.content}
            </p>

            {/* Voting Section */}
            <div className="mb-4 flex items-center gap-4 text-sm text-gray-600">
              {voteStatus !== 'UNHELPFUL' && (
                <button
                  onClick={() => handleVote(a.id, 'HELPFUL')}
                  disabled={!!voteStatus}
                  className="flex items-center gap-1 transition hover:text-green-600"
                >
                  👍 <span>{a.vote.helpfull}</span>
                </button>
              )}
              {voteStatus !== 'HELPFUL' && (
                <button
                  onClick={() => handleVote(a.id, 'UNHELPFUL')}
                  disabled={!!voteStatus}
                  className="flex items-center gap-1 transition hover:text-red-600"
                >
                  👎 <span>{a.vote.unhelpfull}</span>
                </button>
              )}
              <button
                onClick={() => handleToggleComments(a.id)}
                className="ml-auto text-sm text-blue-600 hover:underline"
              >
                {openComments[a.id] ? 'Hide Comments' : 'View Comments'}
              </button>
            </div>

            {/* Comments Section */}
            {openComments[a.id] && (
              <div className="mt-3 max-h-64 space-y-3 overflow-y-auto rounded-lg border bg-gray-50 p-4">
                {announcementComments[a.id]?.length ? (
                  announcementComments[a.id].map((comment, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg bg-white p-3 shadow-sm"
                    >
                      <div className="mb-1 text-xs text-gray-500">
                        {comment.username} •{' '}
                        {new Date(comment.created).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-700">
                        {comment.content}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm italic text-gray-400">
                    No comments yet.
                  </p>
                )}
              </div>
            )}

            {/* Reply Input */}
            {replyBoxOpen[a.id] ? (
              <div className="mt-4 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Write a reply..."
                  className="flex-1 rounded-full border px-4 py-2 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
                  value={comments[a.id] || ''}
                  onChange={(e) =>
                    setComments((prev) => ({ ...prev, [a.id]: e.target.value }))
                  }
                />
                <button
                  onClick={() => handleCommentSubmit(a.id)}
                  className="rounded-full bg-tamPurple-tam px-4 py-2 text-sm text-white hover:bg-purple-700"
                >
                  Send
                </button>
              </div>
            ) : (
              <button
                className="mt-4 text-sm text-gray-500 transition hover:text-purple-600"
                onClick={() =>
                  setReplyBoxOpen((prev) => ({ ...prev, [a.id]: true }))
                }
              >
                💬 Reply
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
