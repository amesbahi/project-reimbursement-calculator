# Project Reimbursment Calculator

## Overview

This project provides functionality to calculate reimbursements for various projects based on their start and end dates, and the city type (high cost or low cost). It includes a reimbursement calculator and associated Jest tests.

## Prerequisites

1. Node.js (v14.0.0 or later)
2. TypeScript (v5.1.6 or later)
3. Jest (v29.6.2 or later)
4. ts-jest (v29.1.1 or later)

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Run `npm install` to install dependencies

## Running the Reimbursement Calculator

1. Compile the TypeScript file by running `tsc projectReimbursement.ts`
2. Run the compiled JavaScript file by running `node projectReimbursement.js`
3. Check the terminal for the results

## Running the Jest Tests

1. Run `npm test` to run the Jest tests

This will execute all the tests defined in the Jest test files and display the results in the terminal.

## Project Structure

- projectReimbursement.ts: The main TypeScript file containing the reimbursement calculation logic.
- projectReimbursement.test.ts: The Jest test file containing the test cases for the reimbursement calculator.
- projectReimbursement.js: The compiled JavaScript file containing the reimbursement calculation logic.

## Reimbursement Rules

1. First and last days of a project are travel days.
2. Days in the middle of a project are full days.
3. Rates vary based on the city type (low cost or high cost).
4. Detailed rules can be found in the comments of the projectReimbursement.ts file.
