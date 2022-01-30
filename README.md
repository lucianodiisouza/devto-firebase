# DevTo clone
This is a educational purpose only small clone of DevTo website (dev.to) using firebase (BaaS) as Backend.

## screenshots
![screenshot recorded](https://github.com/lucianodiisouza/devto-firebase/blob/main/public/screen_record.gif?raw=true)

## you can: 
- authenticate a user using a Google Account
- create posts
- read posts
- heart / unheart posts
- use MD (markdown) to create posts with rich text content
- upload image files to use inside a post

## production version
you can access the production version using `https://devto-firebase-deploy.vercel.app/`

## stack
- nextJS
- react-hook-form
- firebase
- lodash (kebabCase and debounce)
- react-hot-toast
- react-markdown
- 👑 we are using `typescript` here!

## can i run it on localhost machine? 
The short answer: `yes` <br />

The long answer: 
* clone the repo
* install dependencies typing `yarn` on terminal
* rename `FIREBASE_SAMPLE.ts` to `firebase.ts`
* replace the `firebaseConfig` variables with the your own firebase project.
* run the project typing `yarn dev` on terminal
* open `localhost:3000` and enjoy it!

## I want to contribute, what i can do?
Feel free to send a pull-request with your ideas.

enjoy =)
