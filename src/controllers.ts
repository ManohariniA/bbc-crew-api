import { Request, Response } from 'express';
import { Show } from './models';
import { parseCSV } from './csvparser';

const shows: Show[] = [];

// Get all crew members from CSV data.
export const getAllCrewMembers = async (req: Request, res: Response) => {
  try {
    const crewMembers = await parseCSV();
    return res.json(crewMembers);  
  } catch (error) {
    res.status(500).json({ error: 'Failed to process CSV file' });
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

      // Add crew member to the corresponding department
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

// filter by departments
export const getDepartments = async (req: Request, res: Response): Promise<void> => {
  try {
    const crewMembers = await parseCSV(); // Fetch parsed CSV data

    const departmentsMap: Record<string, { total_crew: number; shows: Set<string> }> = {};

    crewMembers.forEach((crew) => {
      if (!departmentsMap[crew.department]) {
        departmentsMap[crew.department] = { total_crew: 0, shows: new Set() };
      }

      departmentsMap[crew.department].total_crew += 1;

      departmentsMap[crew.department].shows.add(crew.showName);
    });

    const formattedDepartments = Object.entries(departmentsMap).reduce(
      (acc, [department, data]) => {
        acc[department] = {
          total_crew: data.total_crew,
          shows: Array.from(data.shows),
        };
        return acc;
      },
      {} as Record<string, { total_crew: number; shows: string[] }>
    );

    res.json(formattedDepartments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ error: 'Failed to retrieve departments' });
  }
};

// filter crew members by show
export const getCrewMembersByShow = async (req: Request, res: Response): Promise<void> => {
  try {
    const { show } = req.query; 
    const crewMembers = await parseCSV(); 

    // If no show is provided, return all crew members
    if (!show) {
      res.json(crewMembers);
    }

    const filteredCrew = crewMembers.filter(
      (crew) => crew.showName.toLowerCase() === (show as string).toLowerCase()
    );

    // If no crew members are found for the show, return a message
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
    const crewMembers = await parseCSV(); 

    if (!query) {
      res.status(400).json({ error: 'Failed to filter crew members since query info is missing!' });
    }

    const filteredCrew = crewMembers.filter(
      (crew) => crew.crewMemberName.toLowerCase().includes((query as string).toLowerCase()) ||
      crew.showName.toLowerCase().includes((query as string).toLowerCase())
    );

    // If no crew members are found for the show, return a message
    if (filteredCrew.length === 0) {
      res.status(404).json({ error: `No crew members found with name '${query}'` });
    }

    res.json(filteredCrew);
  } catch (error) {
    console.error('Error filtering crew members:', error);
    res.status(500).json({ error: 'Failed to filter crew members' });
  }
};

