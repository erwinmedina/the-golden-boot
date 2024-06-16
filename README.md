# The Golden Boot

## Getting Started:
- Currently working on finding a place to host this application. Please hold. Thank you.

## Application Description:
The idea of The Golden Boot is to have easy access to top tier european soccer/football leagues. Interested in knowing who's leading the table in Germany, England, Spain? Boom. You want to know what the last matchday looked like ? Boom. You want to filter by your favorite team and see who they're playing next? Boom. 

The Golden Boot is the name of the award, awarded to the leading goalscorer for a particular competition. 

The Golden Boot is a revised version of FootballDeets, an earlier verison of this project designed by me. Utilizing the same API, I've designed The Golden Boot with a bit more functionality. Within the pre-design work, I kept mobile friendly in the forefront - ensuring that this project would not simply be a computer only design but also available on mobile.

## What This Application Solves:
Sometimes when I'm looking for quick information like which games are coming up (or past games) for a specific team (such as Liverpool), this application comes in handy. Another use case is when I forget what the French league name is (or any other league) and I quickly want to see who's leading that table or what the top 10 goal scorers are.. I can also use this application! It's somewhat easier to use than googling "French league top 10 goal scorers" just to be met with a result that doesn't provide that exact information. I wanted to create an application that eases confusion and just simplifies the process! I hope this helps you as much as it helps me :)

<br>

| Page | Image |
| ---- | ----- |
| HomePage Cover | ![HomePage](https://i.imgur.com/US6IDFM.jpeg)
| HomePage Details | ![HomePageDeets](https://i.imgur.com/S8YPVwc.png)
| Matches Page | ![MatchesPage](https://i.imgur.com/s5noWoq.png)
| Teams Page | ![TeamsPage](https://i.imgur.com/JQ3HHZ8.png)
| Standings Page (Scorers and Winners) | ![ScorersAndWinners](https://i.imgur.com/yMANZk5.png)
| Standings Page (Table) | ![StandingsTable](https://i.imgur.com/4ejx9OL.png)

## Technology Used:
- HTML/CSS/Bootstrap
- Javascript / ReactJS
- Express
- Redis Caching
- API [Football-Data.Org]

## Icebox Items:
- Find a new hosting website.
- Add a legend to the Standings Page.
- Add additional sorting options for Matches and Team pages.
    - Sort by date [asc or desc]
    - and others..
- Fix the wiki issue of having both team articles open at the same time.
- Add additional functionality that would retain users for longer periods of time.
- Add a map of where each stadium is located. Or other cool info.

## Completed Tasks
- Implemented Redis Caching to reduce API strain.
- Utilized Express to make API calls from the backend, instead of front end. Avoiding COR issues.
- Adjust API call to display correct info on Table Standings when clicking different seasons.