import fs from 'fs';
import csvParser from 'csv-parser';
import path from 'path';
import { CrewMember } from './models';

let crewMembers: CrewMember[] = [];
let nextCrewId = 1;
let isParsed = false; 

// Path to the CSV file
const csvFilePath = path.resolve(__dirname, '../crew_data.csv');

export const parseCSV = async (): Promise<CrewMember[]> => {
  if (isParsed) {
    return crewMembers; // Return cached crew members if already parsed
  }

  return new Promise((resolve, reject) => {
    
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on('data', (row) => {
      
        //  CSV headers should match these field names
        crewMembers.push({
          id: nextCrewId++,  
          crewMemberName: row['Crew Member Name'],
          department: row['Department'],
          showName: row['Show Name'],
          showBudget: parseFloat(row['Show Budget']),
        });
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
        isParsed = true; // Mark the CSV as parsed
        resolve(crewMembers);
      })
      .on('error', (error) => {
        console.error('Error processing CSV file:', error);
        reject(error);
      });
  });
};

export { crewMembers };
