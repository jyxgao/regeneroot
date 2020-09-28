## Server Routes Documentation

### API Routes
1. #### Get all lots ordered by most recent
    > GET /api/lots

2. #### Get all lots owned by user
    Log in with user Id to get lots owned by that user
    > GET /api/lots/owned

3. #### Get all lots leased by user
    Log in with user Id to get lots leased by that user
    > GET /api/lots/leased

4. ### Get lot by lot Id
    > GET /api/lots/${lotId}

<p>&nbsp;</p>

### CRUD API Routes
1. #### Create lot
    Create new lot
    > POST /api/lots

2. #### Update lot
    #### * This route is partially functional *

    Update with lot Id
    > POST /api/lots/${lotId}

3. #### Delete lot
    Login and delete by lot Id.

   *This route permanently deletes record*
    > POST /api/lots/${lotId}/delete

<p>&nbsp;</p>

### Search Query Routes
1. #### Search by city with city name
    > GET /api/lots/search?city=${langley}
    
2. #### Search by country with country name
    > GET /api/lots/search?country=${canada}

3. #### Search by minimum lot size
    Lot size in square feet (integer)
    > GET /api/lots/search?minimum_size=${1000}

4. #### Search by maximum lot size
    Lot size in square feet (integer)
    > GET /api/lots/search?maximum_size=${1000}

5. #### Chaining multiple queries    
    > GET /api/lots/search?city=${city}&maximum_size=${1000}

<p>&nbsp;</p>

### User Routes

1. #### Login
    Login with a userId (integer), sets cookie session 
    > GET  /users/login/${userId}

2. #### Logout
    Logout and remove cookie session
    > POST /users/logout

3. #### Get user name and email
    When logged in session get user info with:
    > GET /users/me

<p>&nbsp;</p>
