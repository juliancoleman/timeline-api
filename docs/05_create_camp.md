### Create a camp

method: `POST`

path: `/camps`

auth: `true`

sample body:

```js
{
  "type": String,
  "campus": String
}
```

example response:

```js
{
  "type": String,
  "campus": String,
  "updated_at": Date,
  "created_at": Date,
  "id": Number
}
```
