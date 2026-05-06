import { http, unwrap } from "./http";

export type Receipt = {
  id: string;
  storeName?: string;
  vendor?: string;
  merchant?: string;
  total?: number;
  amount?: number;
  date?: string;
  uploadedAt?: string;
  category?: string;
  paymentMethod?: string;
  taxes?: number;
  items?: Array<{ name: string; price: number; quantity?: number }>;
  imageUrl?: string;
  status?: string;
};

export type ReceiptHistoryParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type ReceiptHistory = {
  data: Receipt[];
  pagination?: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
};

export async function uploadReceipt(file: File) {
  const fd = new FormData();
  fd.append("file", file);
  const { data } = await http.post("/receipts/upload", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return unwrap<Receipt>(data);
}

export async function getReceiptHistory(params: ReceiptHistoryParams = {}) {
  const { data } = await http.get("/receipts/history", { params });
  const payload = unwrap<ReceiptHistory | Receipt[]>(data);
  if (Array.isArray(payload)) return { data: payload } as ReceiptHistory;
  return payload as ReceiptHistory;
}

export async function getReceiptById(id: string) {
  const { data } = await http.get(`/receipts/${id}`);
  return unwrap<Receipt>(data);
}