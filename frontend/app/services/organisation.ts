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


export const assignManager = async (
  employeeId: string,
  managerId: string
) => {
  const res = await api.patch(
    `/organization/employees/${employeeId}/manager`,
    { managerId },
    {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    }
  );

  return res.data;
};

export const getReportees = async (employeeId: string) => {
  const res = await api.get(
    `/organization/employees/${employeeId}/reportees`,
    {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    }
  );

  return res.data;
};