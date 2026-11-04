// Everything personal on the site lives here, so updating the page never means touching components.
export const profile = {
  name: 'Aidan Ferriera',
  tagline: 'Computer science senior learning to ship software end to end, from requirements to the cloud.',
  githubUser: '0nTheWall',
  links: {
    github: 'https://github.com/0nTheWall',
    linkedin: 'https://www.linkedin.com/in/aidan-ferriera/',
    // Put a copy without your phone number or address in public/ and set this to 'resume.pdf'.
    resume: '',
  },
  about: [
    "I'm a computer science senior in my capstone year. This quarter I'm focused on the whole delivery process, not just the code: writing requirements and architecture docs, working in Git with a team, and getting what I build deployed where people can use it.",
    'My coursework so far has leaned toward systems and data: Java, C, SQL and distributed systems. Now I am adding the front-end and cloud side with React, REST APIs and AWS, and this site is where I practice all of it.',
  ],
  skills: [
    { group: 'Languages', items: ['Java', 'C', 'JavaScript', 'SQL'] },
    { group: 'Web', items: ['React', 'Vite', 'HTML & CSS', 'REST APIs'] },
    { group: 'Cloud & tools', items: ['AWS S3', 'Git & GitHub', 'MySQL', 'Vitest'] },
  ],
  now: [
    {
      label: 'Capstone',
      text: 'Building and shipping this site end to end: a React front end, live data from the GitHub REST API, hosted on Amazon S3.',
    },
    {
      label: 'Hackathon',
      text: 'AWS Kiro Buildathon: built AfterFire with a team, a web app that helps Washington wildfire recovery officials track damage assessments and draft recovery reports.',
    },
    {
      label: 'Cloud',
      text: 'Working through AWS Academy in the Learner Lab, starting with S3 static website hosting.',
    },
    {
      label: 'Problem solving',
      text: 'Practicing data structures and algorithms on LeetCode.',
    },
  ],
}

// Extra detail for repos, keyed by repo name. A repo not listed here shows GitHub's own description.
export const projectDetails = {
  portfolio: {
    title: 'This portfolio',
    summary:
      'The site you are looking at. A React app that loads my repositories live from the GitHub REST API, falls back to a saved copy if GitHub does not answer, and is deployed as a static site on Amazon S3.',
    tags: ['React', 'Vite', 'GitHub REST API', 'AWS S3', 'Vitest'],
    featured: true,
  },
  'Database-Project': {
    title: 'Water Treatment Decision Support',
    summary:
      'Database Systems class project: a MySQL schema for water treatment facilities, water sources, investments and regulations, plus a Java command-line program that runs 13 reporting queries over JDBC. The SQL and connection settings live in an XML file, and queries that take user input use prepared statements.',
    tags: ['Java', 'JDBC', 'MySQL', 'SQL', 'XML'],
  },
  FireDataSite: {
    title: 'AfterFire',
    summary:
      'AWS Kiro Buildathon team project built with Kiro: a web app that helps Washington wildfire recovery officials map damage assessments, review them, and prepare draft recovery reports.',
    tags: ['Hackathon', 'Kiro', 'TypeScript', 'React', 'Leaflet', 'Tailwind CSS'],
  },
}
