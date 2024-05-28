import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

api.interceptors.request.use(request => {
  return request;
});

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log("Error:", error);
    return Promise.reject(error);
  }
);

export const fetchInvoices = async () => {
  try {
    const response = await api.get("/invoices");
    return response.data;
  } catch (error) {
    console.error("Error fetching invoices", error);
    throw error;
  }
};

export const deleteInvoice = async id => {
  try {
    await api.delete(`/invoices/${id}`);
  } catch (error) {
    console.error("Error deleting invoice", error);
    throw error;
  }
};

export const downloadInvoice = async id => {
  try {
    const response = await api.get(`/invoices/${id}/pdf`, {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `invoice_${id}.pdf`);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error("Error downloading invoice", error);
    throw error;
  }
};

export const uploadInvoice = async file => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Error uploading invoice", error);
    throw error;
  }
};
