export class ApiError extends Error {
  status?: number;
  info?: unknown;

  constructor(message: string, status?: number, info?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.info = info;
  }
}

export async function fetcher<T>(url: string): Promise<T> {
  let response: Response;

  try {
    response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
      credentials: "same-origin",
      cache: "no-store",
    });
  } catch {
    throw new ApiError("Server bilan bog‘lanib bo‘lmadi.");
  }

  let data: unknown = null;
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  } else {
    try {
      data = await response.text();
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof (data as { message?: unknown }).message === "string"
        ? (data as { message: string }).message
        : `So‘rov bajarilmadi (${response.status})`;

    throw new ApiError(message, response.status, data);
  }

  return data as T;
}
