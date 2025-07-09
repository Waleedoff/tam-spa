import { useState } from "react";

export default function NewTaskForm({ onCreate, onClose }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({ title, description });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onClose} className="text-gray-500 hover:underline">Cancel</button>
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
          Create
        </button>
      </div>
    </form>
  );
}
