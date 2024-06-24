# J241 - Cell Growth Simulation

This is the repository for the take-home project from Jitto.

Simulate the growth of bacterial cells within an enclosed environment. Adjust simulation settings such as environment size and growth rate.
Assumes that each bacterial cell splits once every time interval.

## Background
Understanding the growth patterns of bacterial colonies is important in fields such as
microbiology, medicine, and environmental science. In this challenge, you will simulate these
growth patterns using web technologies. By using React and TypeScript, you'll create an
interactive simulation that demonstrates how bacterial cells divide and spread within a confined
space.

## Objective
Design and implement a React application that simulates the growth of a bacterial colony based
on specific biological rules. The application should be capable of starting, pausing, and resetting
the simulation, as well as adjusting the growth interval.

## Features
- Bacterial colony growth simulation on a grid
- Dynamic bacteria placement
- Adjustable growth rate and grid size
- Start, pause, and reset simulation
- Keyboard shortcuts (SPACE to start/pause sim, R to reset)
- Dynamic graph representing bacterial growth rate over time

## Project Structure
**App.tsx**
- Main program
- Contains the logic to split cells every interval
- Counts the bacterial growth rate every interval
**PetriDish.tsx**
- Is a component that is passed props from `App.tsx`
- Handles cell creation/deletion from user
- Displays all cells and cells after each split
**Controls.tsx**
- Handles Start/Pause, reset, and time interval and grid size changes
**Graph.tsx**
- Is passed each interval's growth count as a prop
- Draws the graph automatically each time interval
- Real time bacterial growth rate

## Performance Metrics
- Performance Score: 100
  - Largest Contentful Pain: 0.3s
  - Speed Index: 0.4s
- Accessibility Score: 100
- Best Practices: 100
- SEO: 90
Sourced from PageSpeed Insights

## Usage
1. Fork this repository
2. In your terminal, `cd` into `J241-Cell-Growth-Simulation` and run the following:
     1. `npm install`
     2. `npm run dev`
3. Go to `http://localhost:5173` in your browser
