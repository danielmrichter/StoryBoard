# StoryBoard

## Description

_Duration: 2 Weeks_

StoryBoard is an app that helps you tell stories about telling stories. Using user friendly drag and drop features, creatives can design, organize, and share the story of them creating a creative piece.

This was a solo project built for [Prime Digital Acadamy](https://www.primeacademy.io/).

## Technologies Used

React  
Node.JS  
Express  
Redux  
Redux-Saga  
PostGreSQL  
Chakra-UI  
Amazon S3

## Approach

This was a complicated project to approach. First, I had to figure out the drag and drop functionality. I did a spike into various libraries, and what would be best for this project. Most of the common ones that are used don't support a non-compacted layout. What I mean by that, is that they want to squish things into a neat list with things touching. I wanted the flexibility to allow users to put something anywhere on the page. Other options included more canvas oriented options, but that is incredibly storage heavy, and very limiting to their own ecosystem.

So, eventually I settled on [React-Grid-Layout](https://www.npmjs.com/package/react-grid-layout) for its flexibility, and providing the features I wanted.

From there, it was one foot in front of the other until I ran out of time to build the things I wanted to build. With the drag and drop figured out, I could build out database relational diagrams: (https://dbdesigner.page.link/yZm5Fv8PeGYjhW8H9)

Then, it was research into UI Kits. There are a lot of great options these days, with the popular one being [Material-UI](https://mui.com/material-ui/). I ended up choosing [Chakra-UI](https://v2.chakra-ui.com/) because of the aesthetics. It looked and felt more like a desktop app, and had enough of the tools to make it work. It ended up missing a few, including Floating Action Buttons, which I wanted to use in a few places, so I ended up having to build those myself.

The biggest challenge throughout all of this was definitely maintaining a strong user experience. I'm still not completely satisified with the experience, but given I'm a developer and not a UX designer, it's fine. With that being said, I didn't want it to be too unwieldy and unusable. So, I spent a lot of time playing with the app and using it myself, and redisigning elements many times in order to make them more usable.

## Getting Started

### Prerequisites

Node (Min. Version 18),
An AWS S3 Account, and bucket configured to accept ACLs,
A [TMDB API Key](https://developer.themoviedb.org/docs/getting-started),
PostGreSQL

### Installation

After downloading this repo, navigate to the downloaded folder in your terminal. Run this command to install the dependencies:

```
$ ~ npm install
```

Then, in PostGreSQL, execute the queries in database.sql to create the necessary tables.

Now, you can start the server and build the client. In seperate tabs of your terminal:

```
$ ~ npm run client
```

and

```
$ ~ npm run server
```

Navigate to http://localhost:5173 to interact with the app.

## Developer Notes

Given the opportunity to revisit these projects, I have a few features I'd like to finish building.

1. The ability to upload project files and finished files for projects. The complicated part is figuring out how the user experience would work for this, so I'm not 100% sure.
2. The ability to toggle visibilty for a project. When your project isn't done, a user can change if others accounts are allowed to view it.
3. Change the workflow to instead have a user edit an in progress view. So, instead of them directly editing the public/finished side, they'll instead be creating a to-be-published version of their project.
4. Better user experience. Right now, the user experience is ok. But, given the opportunity, I would love to collaborate with someone with a background in UX to make the app a bit better to use.
