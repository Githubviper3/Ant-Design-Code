export interface ICategory {
  id: number;
  title: string;
}
export interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  category: { id: number };
}

export interface Ichoice {
  choice: string;
  setChoice(newVal: string): void;
}

export interface I_id {
  input_id: number|string;  
}

export interface IformParams {
  id: number|string;
  setId(newid: number|string): void;
}

export interface IgetGeneral {
  input_id: number|string;
  resourcetype: string;  
}