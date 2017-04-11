### Add user to camp

method: `POST`

path: `/users/{userId}/camps`

auth: `true`

sample body:

```js
{
  "camp_id": Number,
  "role": String
}
```

example response:

```js
{
  "id": Number,
  "type": String,
  "campus": String,
  "createdAt": Date,
  "updatedAt": Date,
  "deletedAt": null,
  "enrollment": Number,
  "roles": [
    {
      "id": Number,
      "userId": Number,
      "name": String,
      "createdAt": Date,
      "updatedAt": Date,
      "deletedAt": null
    }
  ]
}
```
