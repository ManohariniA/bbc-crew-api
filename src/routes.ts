import express, { Request, Response } from 'express';
import { getShows, getAllCrewMembers, getDepartments, getCrewMembersByShow, getCrewMembersByName } from './controllers';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the BBC API!');
  });

router.get('/crew', async (req: Request, res: Response) => {
  await getAllCrewMembers(req, res);
});  

router.get('/shows', async (req: Request, res: Response): Promise<void> => {
  await getShows(req, res);  
});

router.get('/departments', async (req: Request, res: Response): Promise<void> => {
    await getDepartments(req, res);  
  });

router.get('/crewMembers', async (req: Request, res: Response): Promise<void> => {
    await getCrewMembersByShow(req, res);  
  });

router.get('/crewMembers/search', async (req: Request, res: Response): Promise<void> => {
    await getCrewMembersByName(req, res);  
  });   


export default router;
