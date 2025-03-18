export interface CrewMember {
    id: number;
    name: string;
    department: string;
  }
  
export interface Show {
    id: number;
    name: string;
    budget: number;
    crew: CrewMember[];
  }
  