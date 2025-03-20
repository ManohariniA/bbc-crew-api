export interface CrewMember {
  id: number;
  crewMemberName: string;
  department: string;
  showName: string;
  showBudget: number;
}

export interface Show {
    id: number;
    name: string;
    budget: number;
    crew: CrewMember[];
  }
  