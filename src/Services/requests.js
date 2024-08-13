import httpCommon from "./httpCommon";

export const getMyOwnRequests = async (status, type, sortBy, limit, skip) => {
  const params = new URLSearchParams();
  if (status) params.append("status", status);
  if (type) params.append("type", type);
  if (sortBy) params.append("sortBy", sortBy);
  if (limit) params.append("limit", limit);
  if (skip) params.append("skip", skip);

  const response = await httpCommon.get(`/requests?${params.toString()}`);

  return response.data;
};

export const getAllRequests = async (status, sortBy, limit, skip) => {
  const params = new URLSearchParams();
  if (status) params.append("status", status);
  if (sortBy) params.append("sortBy", sortBy);
  if (limit) params.append("limit", limit);
  if (skip) params.append("skip", skip);

  const response = await httpCommon.get(`admin/requests?${params.toString()}`);

  return response.data;
};

export const addRequest = async (requestData) => {
  const response = await httpCommon.post("/requests", requestData);

  return response.data;
};

export const setRequestToApprove = async (requestId) => {
  const response = await httpCommon.patch(
    `/admin/requests/approve/${requestId}`
  );
  return response.data;
};

export const setRequestToUnapprove = async (requestId, unapprovedReason) => {
  const response = await httpCommon.patch(
    `/admin/requests/unApprove/${requestId}`,
    unapprovedReason
  );
  return response.data;
};
