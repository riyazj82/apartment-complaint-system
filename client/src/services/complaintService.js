import API from "./api";

export const getComplaints = () => {
  return API.get("/api/complaints");
};

export const createComplaint = (data) => {
  return API.post("/api/complaints", data);
};

export const updateComplaintStatus = (id, status) => {
  return API.put(`/api/complaints/${id}/status`, { status });
};