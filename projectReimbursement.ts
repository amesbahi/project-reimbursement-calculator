// Technical Exercise:
// You have a set of projects, and you need to calculate a reimbursement amount for the set.
// Each project has a start date and an end date.
// The first day of a project and the last day of a project are always "travel" days.
// Days in the middle of a project are "full" days.
// There are also two types of cities a project can be in, high cost cities and low cost cities.

// A few rules:
// First day and last day of a project, or sequence of projects, is a travel day.
// Any day in the middle of a project, or sequence of projects, is considered a full day.
// If there is a gap between projects, then the days on either side of that gap are travel days.
// If two projects push up against each other, or overlap, then those days are full days as well.
// Any given day is only ever counted once, even if two projects are on the same day.
// A travel day is reimbursed at a rate of 45 dollars per day in a low cost city.
// A travel day is reimbursed at a rate of 55 dollars per day in a high cost city.
// A full day is reimbursed at a rate of 75 dollars per day in a low cost city.
// A full day is reimbursed at a rate of 85 dollars per day in a high cost city.

// Given the following sets of projects, provide code that will calculate the reimbursement for each.

// Set 1:
//   Project 1: Low Cost City Start Date: 9/1/15 End Date: 9/3/15

// Set 2:
//   Project 1: Low Cost City Start Date: 9/1/15 End Date: 9/1/15
//   Project 2: High Cost City Start Date: 9/2/15 End Date: 9/6/15
//   Project 3: Low Cost City Start Date: 9/6/15 End Date: 9/8/15

// Set 3:
//   Project 1: Low Cost City Start Date: 9/1/15 End Date: 9/3/15
//   Project 2: High Cost City Start Date: 9/5/15 End Date: 9/7/15
//   Project 3: High Cost City Start Date: 9/8/15 End Date: 9/8/15

// Set 4:
//   Project 1: Low Cost City Start Date: 9/1/15 End Date: 9/1/15
//   Project 2: Low Cost City Start Date: 9/1/15 End Date: 9/1/15
//   Project 3: High Cost City Start Date: 9/2/15 End Date: 9/2/15
//   Project 4: High Cost City Start Date: 9/2/15 End Date: 9/3/15

export enum CityType {
  LowCost = "LowCost",
  HighCost = "HighCost",
}

export class Project {
  constructor(
    public cityType: CityType,
    public startDate: Date,
    public endDate: Date
  ) {}
}

const reimbursementRates = {
  travel: { [CityType.LowCost]: 45, [CityType.HighCost]: 55 },
  full: { [CityType.LowCost]: 75, [CityType.HighCost]: 85 },
};

export const calculateReimbursement = (projects: Project[]): number => {
  let totalReimbursement = 0;
  let millisecondsInDay = 86400000;

  // Sort projects by start date
  projects.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

  // Iterate through the projects to calculate reimbursement
  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    let { startDate, endDate, cityType } = project;

    // Add reimbursement for start date (travel day)
    totalReimbursement += reimbursementRates.travel[cityType];

    // Check for overlap or gap with next project
    if (i < projects.length - 1) {
      const nextProject = projects[i + 1];
      if (
        nextProject.startDate.getTime() - endDate.getTime() ===
        millisecondsInDay
      ) {
        // Overlapping: add full day reimbursement for end date
        totalReimbursement += reimbursementRates.full[cityType];
      } else if (
        nextProject.startDate.getTime() - endDate.getTime() >
        millisecondsInDay
      ) {
        // Gap: add travel day reimbursement for end date
        totalReimbursement += reimbursementRates.travel[cityType];
      }
    } else {
      // Last project: add travel day reimbursement for end date
      totalReimbursement += reimbursementRates.travel[cityType];
    }

    // Add reimbursement for full days
    for (
      let currentDate = new Date(startDate.getTime() + millisecondsInDay);
      currentDate < endDate;
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      totalReimbursement += reimbursementRates.full[cityType];
    }
  }

  return totalReimbursement;
};

const set1 = [
  new Project(CityType.LowCost, new Date("9/1/15"), new Date("9/3/15")),
];
const set2 = [
  new Project(CityType.LowCost, new Date("9/1/15"), new Date("9/1/15")),
  new Project(CityType.HighCost, new Date("9/2/15"), new Date("9/6/15")),
  new Project(CityType.LowCost, new Date("9/6/15"), new Date("9/8/15")),
];

const set3 = [
  new Project(CityType.LowCost, new Date("9/1/15"), new Date("9/3/15")),
  new Project(CityType.HighCost, new Date("9/5/15"), new Date("9/7/15")),
  new Project(CityType.HighCost, new Date("9/8/15"), new Date("9/8/15")),
];

const set4 = [
  new Project(CityType.LowCost, new Date("9/1/15"), new Date("9/1/15")),
  new Project(CityType.LowCost, new Date("9/1/15"), new Date("9/1/15")),
  new Project(CityType.HighCost, new Date("9/2/15"), new Date("9/2/15")),
  new Project(CityType.HighCost, new Date("9/2/15"), new Date("9/3/15")),
];

const projectSets = [set1, set2, set3, set4];

for (let i = 0; i < projectSets.length; i++) {
  const reimbursement = calculateReimbursement(projectSets[i]);
  console.log(`Reimbursement for Set ${i + 1}: $${reimbursement}`);
}
