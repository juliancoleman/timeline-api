### Get a user's camps

method: `GET`

path: `/users/{userId}/camps`

auth: `true`

example response:

```js
[
  {
    "id": Number,
    "type": String,
    "campus": String,
    "createdAt": Date,
    "updatedAt": Date,
    "deletedAt": null,
    "enrollment": Number,
    "leader": []
  }
]
```
