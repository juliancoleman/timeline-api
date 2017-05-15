### Get a user

method: `GET`

  path: `/api/v1/users/{userId}`

auth: `true`

example response:

```js
{
  "emailAddress": String,
  "id": Number,
  "firstName": String,
  "lastName": String,
  "campus": String,
  "emailAddress": String,
  "phoneNumber": String,
  "emergencyContactName": String,
  "emergencyContactNumber": String,
  "emergencyContactRelationship": String,
  "allergies": String,
  "barcode_number": Number,
  "createdAt": Date,
  "updatedAt": Date,
  "deletedAt": null,
  "roles": [
    {
      "name": String,
      "userId": Number,
      "updated_at": Date,
      "created_at": Date,
      "id": Number
    }
  ]
}
```
