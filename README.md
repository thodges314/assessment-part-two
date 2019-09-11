# Hilton Assessment Part Two
##### Thomas Hodges

#### _assessment-part-two_
---

### introduction
While I have been working with React for years, this is my first experience with the nextjs platform. I had to pick up a lot of its particularities rather quickly. Also, while I am familiar with test-driven development concepts, I’ve usually left testing up to the QA folks - where I help them by answering questions that they may have, especially in testing my D3js work where adding data tags may be easier said than done. That being said, I’m confident that I’ve produced something worthy of my skills.

It is a not uncommon practice, on take-home coding interviews, so supplement the project assigned with as many extras as possible - sometimes including simulated login/logout to a webapp. However, being given explicit parameters for what was expected, along with a mock, I tried to come as close to those parameters as possible. To the extent that I did extra work, it was to create a structure that was suitable for an actual webapp. This includes things like setting up absolute referencing for imports relative to the top directory, building a themes directory and separating components and views (in this case, views being _pages_).

### to run and test this project
Any programmer who has had experience cloning and running npm projects from github.  First, clone this project to a local directory:
`git clone git@github.com:thodges314/assessment-part-two.git`
Enter your new project directory:
`cd assessment-part-two`
Install dependencies (after this step might be a good time to stretch your legs):
`npm i`
Run the project locally:
`npm run dev`
Open your browser to _localhost:3000_.

Follow the steps written in the project description to ensure that this app behaves as expected.  You will find that, if you have changed setting for your rooms, hit submit, and then closed and reopened your localhost tab, or even stopped and restarted the webapp __in any given browser__ that your settings will be preserved from one instance to another.

Formal testing is done with _react-testing-library_, a library endorsed (and created?) by the famous Kent C. Dodds.  While I have not had the opportunity to attend one of his online seminars, I have done my best with his testing libraries.

Drop in your project directory and run `npm run test`.  If you see a series of outouts indicating success, then all is well with the universe.

### setup and structure
This is a nextjs project, and as such, there are a number of assumptions about the structure of the project, routing, and so on.  Reactjs has the advantage of being fairly structurally agnostic, but nextjs, just like _create-react-app_ starts with some basic assumptions about project structure.

One of the things that I did was to define an absolute structure for imports beginning from the top directory.  This makes it possible to move components around and so forth without having to keep track of how many iterations of '../' are needed to get to the proper directory to import another component.  This is done by defining _NODE\_PATH_ in the _package.json_ scripts:
```
  "scripts": {
    "test": "NODE_PATH=. jest",
    "dev": "NODE_PATH=. next",
    "build": "NODE_PATH=. next build",
    "start": "next start"
  }
  ```
I have also used a structure of _index.js_ files int heprojects directory to simplify that process.

I have also created an _\_app.js_ file for top level styling, which in this case consisted of accessing the root header and setting _title_ for the tab title.  This would also be a place to put some global styling, or to implement things like a custom header component that is used app-wide.
