import api from "../lib/axios";

const token = () => localStorage.getItem("token");

export const getOrganizationTree = async () => {
  const res = await api.get("/organization/tree", {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });

  return res.data;
};