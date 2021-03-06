# Instagram Clone API
Node JS Rest APIs for Instagram Application

#### `http://URL/api/auth/login`
### Method : POST
### Raw Data
* username => String
* password => String
### Response Codes
* StatusCode: 200 => Login Success
* StatusCode:: 400 => Valdation Error
* StatusCode: 404 => User Not Found
* StatusCode: 401 => Wrong Credentials
* StatusCOde: 500 => Server Error

#### `http://URL/api/auth/register`
### Method : POST
### Raw Data
* username => String
* password => String
* email => String
### Response Codes
* StatusCode: 200 => Registration Success
* StatusCode:: 400 => Valdation Error
* StatusCode: 409 => User already exists
* StatusCode: 408 => Username already exists
* StatusCOde: 500 => Server Error

#### `http://URL/api/user/search`
### Method : POST
### Raw Data
* username => String
### Response Codes
* StatusCode: 200 => User found
* StatusCode:: 404 => User not found
* StatusCode: 500 => Server Error

#### `http://URL/api/user/follow/:username`
### Method : PUT
### Raw Data
* username => String
### Params
* username => String
### Response Codes
* StatusCode: 200 => User followed
* StatusCode:: 403 => Already Followed
* StatusCode: 500 => Server Error

#### `http://URL/api/user/unfollow/:username`
### Method : PUT
### Raw Data
* username => String
### Params
* username => String
### Response Codes
* StatusCode: 200 => User unfollowed
* StatusCode:: 403 => Doesn't Follow
* StatusCode: 500 => Server Error

#### `http://URL/api/post/`
### Method : POST
### Raw Data
* userId => String
* caption => String
* image => String
### Response Codes
* StatusCode: 200 => Posted
* StatusCode: 500 => Server Error

#### `http://URL/api/post/delete/:id`
### Method : DELETE
### Raw Data
* userId => String
### Params
* postId
### Response Codes
* StatusCode: 200 => Post Deleted
* StatusCode: 403 => Can't Delete other user's post
* StatusCode: 500 => Server Error

#### `http://URL/api/post/like/:id`
### Method : PUT
### Raw Data
* userId => String
### Params
* postId
### Response Codes
* StatusCode: 200 => Liked/Disliked
* StatusCode: 500 => Server Error

#### `http://URL/api/post/allPosts/`
### Method : GET
### Raw Data
* userId => String
### Response Codes
* StatusCode: 500 => Server Error
