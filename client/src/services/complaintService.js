import API from "./api";

export const getComplaints = () => API.get("/complaints");

export const createComplaint = (data) => API.post("/complaints", data);

export const updateComplaintStatus = (id, status) =>
  API.put(`/complaints/${id}/status`, { status });