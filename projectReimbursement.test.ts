import {
  Project,
  CityType,
  calculateReimbursement,
} from "./projectReimbursement";

describe("calculateReimbursement", () => {
  const projectSets = [
    [new Project(CityType.LowCost, new Date("9/1/15"), new Date("9/3/15"))],
    [
      new Project(CityType.LowCost, new Date("9/1/15"), new Date("9/1/15")),
      new Project(CityType.HighCost, new Date("9/2/15"), new Date("9/6/15")),
      new Project(CityType.LowCost, new Date("9/6/15"), new Date("9/8/15")),
    ],
    [
      new Project(CityType.HighCost, new Date("9/1/15"), new Date("9/3/15")),
      new Project(CityType.LowCost, new Date("9/5/15"), new Date("9/7/15")),
      new Project(CityType.HighCost, new Date("9/8/15"), new Date("9/8/15")),
    ],
    [
      new Project(CityType.LowCost, new Date("9/1/15"), new Date("9/1/15")),
      new Project(CityType.LowCost, new Date("9/1/15"), new Date("9/1/15")),
      new Project(CityType.HighCost, new Date("9/2/15"), new Date("9/2/15")),
      new Project(CityType.HighCost, new Date("9/2/15"), new Date("9/3/15")),
    ],
  ];

  const expectedReimbursements = [165, 595, 500, 330];

  for (let i = 0; i < projectSets.length; i++) {
    it(`should calculate reimbursement for project set ${i + 1}`, () => {
      const reimbursement = calculateReimbursement(projectSets[i]);
      expect(reimbursement).toBe(expectedReimbursements[i]);
    });
  }
});
