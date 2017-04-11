### Create a user

method: `POST`

path: `/users`

auth: `false`

sample body:

```js
{
	"first_name": String,
	"last_name": String,
	"campus": String,
	"home_address": String,
	"email_address": String,
	"phone_number": String,
	"emergency_contact_name": String,
	"emergency_contact_number": String,
	"emergency_contact_relationship": String,
	"allergies": String,
  "barcode_number": Number,
	"password": String,
	"confirm_password": String
}
```

example response:

```js
{
	"first_name": String,
	"last_name": String,
	"campus": String,
	"home_address": String,
	"email_address": String,
	"phone_number": String,
	"emergency_contact_name": String,
	"emergency_contact_number": String,
	"emergency_contact_relationship": String,
	"allergies": String,
  "barcode_number": Number,
  "updated_at": Date,
  "created_at": Date,
  "id": Number,
  "token": String
}
```
