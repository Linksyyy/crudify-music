import { useState } from "react";
import { Trash2 } from "lucide-react";

export default function CommentSection({
  initialComments,
  onAddComment,
  onDeleteComment,
  onGetComments,
  musicID,
}) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(initialComments);

  function handleSubmit(e) {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(musicID, newComment);
      setComments(onGetComments());
      setNewComment("");
    }
  }

  function handleDelete(commentID) {
    onDeleteComment(musicID, commentID);
    setComments(onGetComments());
  }

  return (
    <div className="mt-6">
      <h3 className="text-2xl font-bold mb-4">Comments</h3>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add your comment..."
          className="flex-1 bg-zinc-800 p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Send
        </button>
      </form>
      <div className="space-y-4">
        {comments &&
          comments.map((comment, index) => (
            <div
              key={index}
              className="bg-zinc-800 hover:bg-secondary p-3 rounded flex flex-row group relative"
            >
              <div className="w-full">
                <p>{comment.text}</p>
                <div className="flex w-full justify-between items-center">
                  <h6 className="text-xs text-gray-500">{comment.date} </h6>
                  <h6 className="text-xs text-gray-600">id: {comment.id}</h6>
                </div>
              </div>
              <div className="absolute right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        {(!comments || comments.length === 0) && (
          <p className="text-zinc-400">
            Still dont have comments, be the first!
          </p>
        )}
      </div>
    </div>
  );
}
