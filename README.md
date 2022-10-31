# Frontend Dev Challenge

**FORK this repo into your own account and email the link to your project when finished.**

<br>

Thanks for applying to be a dev at Beacon! Instead of asking you to solve a leetcode problem - we'd like to see you work on something that is actually something you'd do on the job.

Your task is to take the page design that's included below and recreate it as a page in a NextJS project.

<br>

## There are three required features:

1. Fetch a list of schools from the Beacon API and then display it in a list like the one shown in the provided design.
2. Request permission to access the browser's location. If granted, sort the list of schools from closest -> furthest. If denied, sort the list in alphabetical order (by school name).
3. Include a search bar to allow the user to search by school name. 

<br>

## Important Details
- The design can be viewed [here](https://www.figma.com/file/nS3D3sSjVFrZNKHlB5Z6yH/Frontend-Dev-Challenge?node-id=0%3A1)
    - Take note of the comments on the page as they clarify some of the details.
    - For the background gradient, you can do one from the top left -> bottom right (colors: #4502D9 to #000000)
    - If you have trouble with Figma please email me!
- Install the packages with `npm install` and run the project with `npm run dev`
- Request the list of schools by performing a `GET` request to `api.sendbeacon.com/team/schools`.
- You must run the project on host `3000` or else your browser will get blocked by CORS (this is the default, just don't change it).
- Your work should be done in `src/pages/index.tsx` and all styles should be added to `src/styles/Home.module.css`.
- Bootstrap v5 has been included and you're free to use it.
- Your project must be responsive (work on both mobile and desktop).
- The Beacon logo and the search bar icon are already included in the  `src/assets/` directory.
- Please comment your code to make it easier to review.
