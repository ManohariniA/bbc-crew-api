import { Request, Response } from 'express';
import { Show, CrewMember } from './models';
import { crewMembers, parseCSV } from './csvparser';

const shows: Show[] = [];

// Get all crew members from CSV data.
export const getAllCrewMembers = async (req: Request, res: Response) => {
  try {
    const crewMembers = await parseCSV();
    return res.json(crewMembers);
  } catch (error) {
    console.error('Error processing CSV:', error);
    return res.status(500).json({ error: 'Failed to process CSV file' });
  }
};

// Get all shows
export const getShows = async (req: Request, res: Response): Promise<void> => {
  try {
    const crewMembers = await parseCSV();
    const showsMap: Record<string, { budget: number; departments: Record<string, string[]> }> = {};

    crewMembers.forEach((crew) => {
      if (!showsMap[crew.showName]) {
        showsMap[crew.showName] = {
          budget: crew.showBudget,
          departments: {},
        };
      }

      if (!showsMap[crew.showName].departments[crew.department]) {
        showsMap[crew.showName].departments[crew.department] = [];
      }

      showsMap[crew.showName].departments[crew.department].push(crew.crewMemberName);
    });

    const formattedShows = Object.entries(showsMap).map(([showName, data]) => ({
      show: showName,
      budget: data.budget,
      departments: Object.entries(data.departments).map(([department, crewMembers]) => ({
        name: department,
        crew_count: crewMembers.length,
        crew_members: crewMembers,
      })),
    }));

    res.json(formattedShows);
  } catch (error) {
    console.error('Error fetching shows:', error);
    res.status(500).json({ error: 'Failed to retrieve shows' });
  }
};

// Get all departments
export const getDepartments = async (req: Request, res: Response): Promise<void> => {
  try {
    const crewMembers = await parseCSV();
    const departmentsMap: Record<string, { total_crew: number; shows: Set<string> }> = {};

    crewMembers.forEach((crew) => {
      if (!departmentsMap[crew.department]) {
        departmentsMap[crew.department] = { total_crew: 0, shows: new Set() };
      }
      departmentsMap[crew.department].total_crew += 1;
      departmentsMap[crew.department].shows.add(crew.showName);
    });

    const formattedDepartments = Object.entries(departmentsMap).map(([department, data]) => ({
      name: department,
      total_crew: data.total_crew,
      shows: Array.from(data.shows),
    }));

    res.json(formattedDepartments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ error: 'Failed to retrieve departments' });
  }
};

//  filter crew members by show
export const getCrewMembersByShow = async (req: Request, res: Response): Promise<void> => {
  try {
    const { show } = req.query; 
    if (!show) {
      res.status(400).json({ error: 'Show name is required' });
    }

    const crewMembers = await parseCSV();
    const filteredCrew = crewMembers.filter(
      (crew) => crew.showName.toLowerCase() === (show as string).toLowerCase()
    );

    if (filteredCrew.length === 0) {
      res.status(404).json({ error: `No crew members found for show '${show}'` });
    }

    res.json(filteredCrew);
  } catch (error) {
    console.error('Error filtering crew members:', error);
    res.status(500).json({ error: 'Failed to filter crew members' });
  }
};

// generic search by showName or crewMember name
export const getCrewMembersByName = async (req: Request, res: Response): Promise<void> => {
  try {
    const { query } = req.query;
    if (!query) {
      res.status(400).json({ error: 'Failed to filter crew members since query info is missing!' });
    }

    const crewMembers = await parseCSV();
    const filteredCrew = crewMembers.filter(
      (crew) =>
        (crew.crewMemberName?.toLowerCase()).includes((query as string).toLowerCase()) ||
        (crew.showName?.toLowerCase()).includes((query as string).toLowerCase())
    );

    if (filteredCrew.length === 0) {
      res.status(404).json({ error: `No crew members found with name '${query}'` });
    }

    res.json(filteredCrew);
  } catch (error) {
    console.error('Error filtering crew members:', error);
    res.status(500).json({ error: 'Failed to filter crew members' });
  }
};

// Add new crewMember
export const addCrewMember = async (req: Request, res: Response): Promise<void> => {
  try {
  const crewMember: CrewMember = {
    id: crewMembers.length + 1,
    crewMemberName: req.body.crewMemberName,
    department: req.body.department,
    showName: req.body.showName,  
    showBudget: req.body.showBudget
  };
  
  crewMembers.push(crewMember);
  console.log(crewMembers)

  res.status(200).json(crewMember);

} catch (error) {
  console.error('Error filtering crew members:', error);
  res.status(500).json({ error: 'Failed to filter crew members' });
}
};

