export interface TokenPayload {
  iad: number;
  exp: number;
  sub: string;
}

export interface IParent {
  name: string;
  age: number;
  pedigree: boolean;
}

export interface IParentUpdate {
  name?: string;
  age?: number;
  pedigree?: boolean;
}

export interface IChildren {
  parent_id: string;
  name: string;
  age: number;
  vaccinated: boolean;
}

export interface IChildrenUpdate {
  parent_id: string;
  name?: string;
  age?: number;
  vaccinated?: boolean;
}
