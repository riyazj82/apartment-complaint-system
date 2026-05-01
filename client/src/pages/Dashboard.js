import { useEffect, useState } from "react";
import {
  getComplaints,
  updateComplaintStatus,
} from "../services/complaintService";
import CreateComplaintForm from "../components/CreateComplaintForm";
import Navbar from "../components/Navbar";

function Dashboard() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await getComplaints();

      const data =
        response.data.complaints ||
        response.data.data ||
        response.data ||
        [];

      setComplaints(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch complaints:", error);
      setComplaints([]);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateComplaintStatus(id, status);
      alert("Status updated successfully");
      fetchComplaints();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-6">
        <div className="mx-auto max-w-5xl">
          {user?.role !== "admin" && (
            <div className="mb-6 rounded-lg bg-white p-4 shadow">
              <CreateComplaintForm onComplaintCreated={fetchComplaints} />
            </div>
          )}

          <div className="rounded-lg bg-white p-4 shadow">
            <h3 className="mb-4 text-xl font-semibold">
              {user?.role === "admin" ? "All Complaints" : "My Complaints"}
            </h3>

            {Array.isArray(complaints) && complaints.length === 0 ? (
              <p className="text-gray-500">No complaints found</p>
            ) : (
              complaints.map((c) => (
                <div
                  key={c.id}
                  className="mb-4 rounded-lg border bg-white p-4 shadow"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold">
                      {c.title || "No title"}
                    </h4>

                    <span
                      className={`rounded px-3 py-1 text-sm font-medium ${
                        c.status === "Resolved"
                          ? "bg-green-100 text-green-700"
                          : c.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {c.status || "Open"}
                    </span>
                  </div>

                  <p className="mt-2 text-gray-600">
                    {c.description || "No description"}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
                    <span>Category: {c.category || "N/A"}</span>
                    <span>Priority: {c.priority || "N/A"}</span>

                    {user?.role === "admin" && (
                      <>
                        <span>User: {c.user_name || "N/A"}</span>
                        <span>Email: {c.user_email || "N/A"}</span>
                      </>
                    )}
                  </div>

                  {user?.role === "admin" && (
                    <select
                      className="mt-4 w-full rounded border p-2"
                      value={c.status || "Open"}
                      onChange={(e) =>
                        handleStatusChange(c.id, e.target.value)
                      }
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;