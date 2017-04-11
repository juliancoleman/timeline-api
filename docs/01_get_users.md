### Get all users

method: `GET`

path: `/users`

auth: `true`

example response:

```js
{
  "users": [
    {
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
      "deletedAt": null
    }
  ],
  "paginationData": {
    "page": Number,
    "pageSize": Number,
    "rowCount": Number,
    "pageCount": Number
  }
}
```
