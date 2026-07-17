import api from "../lib/axios";

const getToken = () => localStorage.getItem("token");

export const getMyProfile = async () => {
  const token = getToken();

  const res = await api.get("/profile/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const updateMyProfile = async (data: {
  name: string;
  phone: string;
}) => {
  const token = getToken();

  const res = await api.put("/profile/me", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};