### Get an itinerary

method: `GET`

path: `/api/v1/itineraries/{itineraryId}`

auth: `true`

example response:

```js
{
  "id": Number,
  "campId": Number,
  "eventDate": Date,
  "location": String,
  "createdAt": Date,
  "updatedAt": Date,
  "deletedAt": null
},
```


### Get all itineraries

method: `GET`

path: `/api/v1/itineraries`

auth: `true`

example response:

```js
[
  {
    "id": Number,
    "campId": Number,
    "eventDate": Date,
    "location": String,
    "createdAt": Date,
    "updatedAt": Date,
    "deletedAt": null
  },
  {
    "id": Number,
    "campId": Number,
    "eventDate": Date,
    "location": String,
    "createdAt": Date,
    "updatedAt": Date,
    "deletedAt": null
  }
]
```
