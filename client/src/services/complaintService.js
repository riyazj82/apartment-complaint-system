import API from "./api";

export const getComplaints = () => {
  return API.get("/complaints");
};

export const createComplaint = (data) => {
  return API.post("/complaints", data);
};

export const updateComplaintStatus = (id, status) => {
  return API.put(`/complaints/${id}/status`, { status });
};