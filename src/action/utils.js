export const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    return {
      success: false,
      statusCode: res.status,
      data,
    };
  }
  return {
    success: true,
    statusCode: res.status,
    data,
  };
};
