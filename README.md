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

This was a complicated project to approach.

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

