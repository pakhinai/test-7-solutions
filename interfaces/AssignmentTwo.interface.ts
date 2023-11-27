interface HairSummary {
  [color: string]: number;
}

interface AddressSummary {
  [user: string]: string;
}

export interface DepartmentResult {
  male: number;
  female: number;
  ageRange: string;
  hair: HairSummary;
  addressUser: AddressSummary;
}

export interface ResultData {
  [department: string]: DepartmentResult;
}
