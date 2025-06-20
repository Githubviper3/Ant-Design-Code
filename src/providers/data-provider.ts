import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

const fetcher = async (url: string, options?: RequestInit) =>
  fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
    },
  });

export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    let skillincludes;
    let value: any;
    const params = new URLSearchParams();

    if (pagination) {
      params.append("_start", (pagination.current - 1) * pagination.pageSize);
      params.append("_end", pagination.current * pagination.pageSize);
    }

    if (sorters && sorters.length > 0) {
      params.append("_sort", sorters.map((sorter) => sorter.field).join(","));
      params.append("_order", sorters.map((sorter) => sorter.order).join(","));
    }

    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        if ("field" in filter) {
          if (filter.operator === "eq") {
            params.append(filter.field, filter.value);
          } else if (filter.operator === "in") {
            if (filter.field != "skills") {
              if (Array.isArray(filter.value)) {
                filter.value.forEach((val) => params.append(filter.field, val));
                console.log(params);
              } else {
                params.append(filter.field, filter.value);
              }
            } else {
              skillincludes = true;
              value = filter.value;
            }
          }
        }
      });
    }
    let send:any[] = [];
    if (skillincludes) {
      let getall = await fetcher(`${API_URL}/${resource}`);
      let alldata = await getall.json();
      value.forEach((skill:string) => {
        alldata.forEach((data:any) => {
          if (data.skills.includes(skill) && !send.includes(data)) {
            send.push(data);
          }
        });
      });

      const total = Number(getall.headers.get("x-total-count"));
      return {
        data: send,total
      }

    }
    const response = await fetcher(
      `${API_URL}/${resource}?${params.toString()}`
    );

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    const total = Number(response.headers.get("x-total-count"));

    return {
      data,
      total,
    };
  },
  getMany: async ({ resource, ids, meta }) => {
    const params = new URLSearchParams();

    if (ids) {
      ids.forEach((id) => params.append("id", id));
    }

    const response = await fetcher(
      `${API_URL}/${resource}?${params.toString()}`
    );

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  getOne: async ({ resource, id, meta }) => {
    const response = await fetcher(`${API_URL}/${resource}/${id}`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  create: async ({ resource, variables }) => {
    const response = await fetcher(`${API_URL}/${resource}`, {
      method: "POST",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  update: async ({ resource, id, variables }) => {
    const response = await fetcher(`${API_URL}/${resource}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  getApiUrl: () => API_URL,

  deleteOne: async ({ resource, id }) => {
    const response = await fetcher(`${API_URL}/${resource}/${id}`, {
      method: "DELETE",
    });

    if (response.status < 200 || response.status > 299) throw response;
    const data = await response.json();
    return { success: true, message: "Item successfully deleted.", data: data };
  },
};
