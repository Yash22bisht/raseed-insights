export type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
  path?: string;
};

export type ReceiptItem = {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  status: string;
  uploadedAt: string;
  extractedVendor?: string;
  extractedAmount?: number;
  extractedDate?: string;
  ocrData?: unknown;
};

export type ReceiptListResponse = {
  data: ReceiptItem[];
  pagination?: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(options.headers || {}),
    },
  });

  const payload = (await response.json()) as ApiEnvelope<T>;

  if (!response.ok || !payload.success) {
    throw new Error(payload.message || 'Request failed');
  }

  return payload.data;
}

export async function uploadReceipt(file: File): Promise<ReceiptItem> {
  const formData = new FormData();
  formData.append('file', file);

  return request<ReceiptItem>('/receipts/upload', {
    method: 'POST',
    body: formData,
  });
}

export async function fetchReceipts(page = 1, pageSize = 20): Promise<ReceiptListResponse> {
  return request<ReceiptListResponse>(`/receipts?page=${page}&pageSize=${pageSize}`);
}

export async function fetchReceiptById(id: string): Promise<ReceiptItem> {
  return request<ReceiptItem>(`/receipts/${id}`);
}

export async function askAiAssistant(question: string, userId?: string): Promise<any> {
  return request<any>('/ai/assistant', {
    method: 'POST',
    body: JSON.stringify({ question, userId }),
  });
}

export async function getAiInsights(userId?: string): Promise<any> {
  const suffix = userId ? `?userId=${encodeURIComponent(userId)}` : '';
  return request<any>(`/ai/financial-insights${suffix}`);
}