### Update a user

method: `POST`

path: `/api/v1/users/{userId}`

auth: `true`

sample body:

```js
{
  "first_name": String
}
```
example response:

```js
{
  "first_name": String,
  "updated_at": Date
}
```
