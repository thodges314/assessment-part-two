# Hilton Assessment Part Two
##### Thomas Hodges

#### _assessment-part-two_
---

### introduction
While I have been working with React for years, this is my first experience with the nextjs platform. I had to pick up a lot of its particularities rather quickly. Also, while I am familiar with test-driven development concepts, I’ve usually left testing up to the QA folks - where I help them by answering questions that they may have, especially in testing my D3js work where adding data tags may be easier said than done. That being said, I’m confident that I’ve produced something worthy of my skills.

It is a not uncommon practice, on take-home coding interviews, to supplement the project assigned with as many extras as possible - sometimes including simulated login/logout to a webapp. However, being given explicit parameters for what was expected, along with a mock, I tried to come as close to those parameters as possible. To the extent that I did extra work, it was to create a structure that was suitable for an actual webapp. This includes things like setting up absolute referencing for imports relative to the top directory, building a themes directory and separating components and views (in this case, views being _pages_).

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

Follow the steps written in the project description to ensure that this app behaves as expected.  You will find that, if you have changed patron counts for your rooms, hit submit, and then closed and reopened your localhost tab, or even stopped and restarted the webapp __in any given browser__ that your settings will be preserved from one instance to another.  Data is not preserved cross-browser because this would require server storage and a login.

Formal testing is done with _react-testing-library_, a library endorsed (and created?) by the famous Kent C. Dodds.  While I have not had the opportunity to attend one of his online seminars, I have done my best with his testing libraries.

Drop into your project directory and run `npm run test`.  If you see a series of outputs indicating success, then all is well with the universe.

### setup and structure
This is a nextjs project, and as such, there are a number of assumptions about the structure of the project, routing, and so on.  Reactjs has the advantage of being fairly structurally agnostic, but nextjs, just like _create-react-app_, starts with some basic assumptions about project structure.

One of the things that I did was to define an absolute structure for imports beginning from the top directory.  This makes it possible to move components around and so forth without having to keep track of how many iterations of '../' are needed to get to the proper directory to import another component.  This is done by defining _NODE\_PATH_ in the _package.json_ scripts:
```
  "scripts": {
    "test": "NODE_PATH=. jest",
    "dev": "NODE_PATH=. next",
    "build": "NODE_PATH=. next build",
    "start": "next start"
  }
  ```
I have also used a structure of _index.js_ files in the projects directory to simplify that process.

I have also created an _\_app.js_ file for top level styling, which in this case consisted of accessing the root header and setting _title_ for the tab title.  This would also be a place to put some global styling, or to implement things like a route to a custom header component that is used app-wide.

Finally, notice that I created a color theme object in a theme directory in the project root.  This is to emulate the standard practice of storing colors and so on in a central file to make it easier to manage the styles across a large webapp and make sure that everything is consistant.  This is also a place that one might place font styling or materialui tweaks.  In this case, I have only used it for colors.

### solving the problem
In solving this project, I tried to take into consideration what I expected data might look like coming from backend, or how it might be sent to backend. I assumed, in it’s simplest form, an array of one or more room objects with ‘adults’ and ‘children’ members designating the numbers of each of those two in the respective rooms. So, when I add rooms I add entries to the array of rooms (with default values) and when I remove rooms I remove entries from the room array. What is rendered on the screen is an exact representation of the room array stored in state.

For an individual room, I created a separate stateless controlled styled component that displays the given room number, an optional checkbox to activate or deactivate that room selection, and dropdowns to select the number of adults or children in that room. (The deactivation checkbox is unavailable on room 1). When a room is deactivated, the drop-down selectors are deactivated, and the room box changes style. You will notice that I tried to match the style on the mock as closely as possible.

The selectors and click handlers are arrow functions originating from the main page, and therefore executing in the context of and accessing the state of the main page. I used currying to create a checkbox click handler to pass to each _RoomBox_  hard-wired with the respective room number. For selectors, I pass in a curried function that is wired with the room number, which upon entering the _RoomBox_ component, attaches to each selector wired with the name of the field it is handling (either adults or children).

You will notice that in the _index.js_ file, I look for data stored in local storage (from previous times that the app may have been used) before displaying any room panels. If we were working with redux calls before displaying those panels, then it may be useful to display some kind of loading animation, but since we are only reaching out to local storage, I didn’t deem that necessary.

### testing
Testing was performed with _react-testing-library_ (imported in its current incarnation, as suggested by npm, as _@testing-library/react_ and _@testing-library/jest-dom_). After giving myself a crash course in using the libraries, most of my work was divided between working out how to tag items in the _DOM_, working out how to conduct the actual tests and working out what was appropriate to test. In some cases, the act felt not unlike that of Bertrand Russel _et al._ who would attempt to prove all of mathematics beginning with axioms so elementary that he had to drive basic principles like additive commutativity (a + b = b + a).

In testing _RoomBox_, if I wanted to prove that changing the value of a controlled component would have some effect consisted of seven steps: 1) verifying starting data, 2) rendering the component with this starting data, 3) verifying that the component rendered accurately representing this starting data, 4) firing a change (simulating a selection), 5) verifying that the callback worked correctly (that the associated local data was changed), 6) triggering a rerender, 7) verifying that the selector in the component has updated to reflect this updated backend data. I wrote rudimentary functions to simulate the expected results of various data changes. My test of activating/deactivating the component was the most extensive because I verified not only that the selectors were disabled/enabled but that the values they displayed updated also.

Having verified these, I was able to demonstrate the patterns of deactivating/activating boxes in _index.js_ and that the boxes did activate and deactivate properly. Here, it may have been possible to have been more thorough - specifically by systematically testing all sequences of clicks and that boxes activated and deactivated in appropriate patterns. Since I had already verified, in the tests of _RoomBox_ that the individual fields activated/deactivated/_et cetera_ appropriately, I did not have to repeat that portion of the test at the _index.js_ level.