# check-and-go

## Task
The Time Out team loves to socialize, some of us are also really fussy! In order to spend less
time deciding where to go we’d like a program that decides for us. All members of the team will
want both food and drink so if a member of staff cannot eat anything, or no drinks are served
that they like, the team will not visit the venue.

### The​ ​Input
There are two JSON feeds, one of which is a list of the team members with what they do drink
and do not eat, the other feed contains venues with the food and drink options for that venue.
The person using the app needs to be able to enter which team members will be attending.

Sample​ ​Input:
https://gist.github.com/benjambles/ea36b76bc5d8ff09a51def54f6ebd0cb

Users list stored in `users.json`.
Venues list stored in `venues.json`.

### The​ ​Output
The output should display which places are safe to go to, and if applicable why the team should
avoid the other places.

Sample​ ​Output:
```
Places to go:
  ● The Diner
  ● The cambridge
  ● The spice of life
Places to avoid:
  ● Loch Fine
    ○ There is nothing for Ben to eat
    ○ There is nothing for Far to drink
```

## Starting up
To start, run: `npm start`.

## Dependencies
Application requires node.js >= 6.4.0
