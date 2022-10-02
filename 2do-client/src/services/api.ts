import { TodoType } from "@/components/Todo";

const baseUrl = "http://localhost:3000/api";

export const todoApi = {
  async getAll(): Promise<TodoType[]> {
    const req = await makeRequest("/todo");
    const json = await req.json();

    return json;
  },

  async create(todo: Partial<TodoType>): Promise<TodoType | null> {
    try {
      const req = await makeRequest("/todo", {
        method: "post",
        body: JSON.stringify(todo),
      });
      const json = await req.json();

      return json;
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  async update({ id, ...rest }: Partial<TodoType>) {
    try {
      const req = await makeRequest(`/todo/${id}`, {
        method: "put",
        body: JSON.stringify(rest),
      });
      const json = await req.json();

      return json;
    } catch (e) {
      console.error(e);
      return {};
    }
  },

  async batchUpdate(data: Partial<TodoType>[]) {
    try {
      const req = await makeRequest(`/todo/batch`, {
        method: "post",
        body: JSON.stringify(data),
      });
      const json = await req.json();

      return json;
    } catch (e) {
      console.error(e);
      return {};
    }
  },

  async delete(id: string) {
    try {
      const req = await makeRequest(`/todo/${id}`, {
        method: "delete",
      });
      const json = await req.json();

      return json;
    } catch (e) {
      console.error(e);
      return {};
    }
  },
};

const makeRequest = (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const opts = {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
  };

  return fetch(`${baseUrl}${endpoint}`, opts);
};
