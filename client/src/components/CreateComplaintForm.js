import { useState } from "react";
import { createComplaint } from "../services/complaintService";

function CreateComplaintForm({ onComplaintCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createComplaint({
        title,
        description,
        category,
        priority,
      });

      alert("Complaint created successfully");

      setTitle("");
      setDescription("");
      setCategory("");
      setPriority("");

      onComplaintCreated();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create complaint");
    }
  };

  return (
  <form onSubmit={handleSubmit} className="space-y-4">
    <h3 className="text-lg font-semibold">Create Complaint</h3>

    <input
      className="w-full rounded border p-3"
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />

    <textarea
      className="w-full rounded border p-3"
      placeholder="Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />

    <select
  className="w-full rounded border p-3"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="">Select Category</option>
  <option value="Plumbing">Plumbing</option>
  <option value="Electrical">Electrical</option>
  <option value="Lift">Lift</option>
  <option value="Cleaning">Cleaning</option>
  <option value="Security">Security</option>
  <option value="Parking">Parking</option>
  <option value="Other">Other</option>
</select>

    <select
      className="w-full rounded border p-3"
      value={priority}
      onChange={(e) => setPriority(e.target.value)}
    >
      <option value="">Select Priority</option>
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </select>

    <button
      className="w-full rounded bg-green-600 p-3 text-white hover:bg-green-700"
      type="submit"
    >
      Submit Complaint
    </button>
  </form>
);
}
export default CreateComplaintForm;