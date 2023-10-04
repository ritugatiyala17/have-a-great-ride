# Bike Rentals

RideABike is an application catering users who want to go around the city on a two-wheeler. 
Check it out here - https://have-a-great-ride.vercel.app/
Deployed on Vercel

### Roles

1. Manager
2. User

### Types of lists

1. Bikes
2. Users

### Actions the roles can undertake

1. Manager
    1. CRUD on users list and managers list
        1. All types of filters on users based on who has reserved
            1. Filter
                1. Type of bike reserved
                    1. Model
                    2. Color
                    3. Location
                    4. Rating average
                    5. Price range per hour/day
            2. Date/period of time filter
            3. Extra(can be extended): 
                1. Based on ratings given
                2. Based on the number of bookings
        2. Date/period of time wise filter on reserved/available based on bikes
    2. CRUD on bikes
        1. All types of filters on bikes based on properties
            1. Model
            2. Color
            3. Location
            4. Rating average
            5. Price range per hour/day
        2. Reserved/ Available
        3. Date/ Period of time Revered/Available
        4. Filter
            1. Type of bike reserved
                1. Model
                2. Color
                3. Location
                4. Rating average
                5. Extra(can be extended) - Price range per hour/day
2. Users
    1. Create an account
    2. Login, Signup, Logout
    3. Actions on the bikes
        1. View bikes list
            1. Filters based on properties of bikes
                1. Model
                2. Color
                3. Location
                4. Rating average
                5. Extra(can be extended) - Price range per hour/day
            2. Date/period of time filter on reserved/available 
        2. Extra(can be extended) - Reserve a bike for specific period of time
            1. Any date
            2. Any hour 
        3. Cancel a Reservation
        4. Rate a bike once the booking is completed from 1-5
        5. Extra:
            1. Payments page for bike reservation
    4. View history of bike reservation 
    5. Extra(can be extended) - Repeat a bike reservation by selecting dates

### Views

1) Homepage - User lands here to filter on the homepage and find bikes next.

    <img width="960" alt="homepage" src="https://user-images.githubusercontent.com/44567597/205427356-069c4716-a4b1-41df-8a4b-57323f37067a.png">



2) Bikes List

    <img width="960" alt="bikes-list-manager" src="https://user-images.githubusercontent.com/44567597/205427446-54eca76e-257a-4b0b-a36d-5bcf1f625e44.png">



    <img width="960" alt="bikes-list-2" src="https://user-images.githubusercontent.com/44567597/205427424-96cb062e-ec03-4b5b-9745-2d2fe55122f8.png">



3) Bike Card with all possible actions. Manager can book, cancel and edit bike and also view bookings for this bike.

    <img width="258" alt="bike-card" src="https://user-images.githubusercontent.com/44567597/205427423-68560905-43ba-4e23-8403-1cef7014bd55.png">



4) Bookings on a bike

    <img width="960" alt="specific-bike-bookings-list" src="https://user-images.githubusercontent.com/44567597/205427420-45c30b34-e5ce-4ca9-8548-8b0aa9d57e87.png">



5) Add new bikes from the bikesList page.

    <img width="960" alt="add-bike" src="https://user-images.githubusercontent.com/44567597/205427438-742b60ff-bd64-4a5f-b617-aefd83c648a5.png">



6) Bikes List Rating Filter

    <img width="960" alt="bikes-list-rating-filter" src="https://user-images.githubusercontent.com/44567597/205427444-773535d3-65b7-4a55-baca-269cd00091e1.png">



7) List of all bookings on the platform- can be viewed by managers only.

    <img width="960" alt="bookings-list-all-manager" src="https://user-images.githubusercontent.com/44567597/205427425-94fd7f4a-433b-4af1-9eb0-23cd36c6210f.png">



8) User can rate a completed booking only from 1-5.

    <img width="960" alt="rate-bike-on-completed-booking" src="https://user-images.githubusercontent.com/44567597/205428615-dde7182d-c11f-403c-94c1-4e53704e0bfb.png">




9) Main Filter

    <img width="439" alt="main-filter" src="https://user-images.githubusercontent.com/44567597/205428586-60995d72-903b-491c-b069-d73ea198a2f1.png">



10) User Profile dropdown for Profile, Login and logout. User profile is still WIP. 

    <img width="330" alt="user-profile-dropdown" src="https://user-images.githubusercontent.com/44567597/205427443-f6d0fe0a-12ed-44ae-a421-42bd2f615d67.png">



11) Managers can view all users(users/managers) on the platform.

    <img width="960" alt="users-list-manager" src="https://user-images.githubusercontent.com/44567597/205427426-7376b8f0-a15a-4d36-bb59-f1dd97b5ce02.png">



12) Edit Bike 

    <img width="960" alt="edit-bike" src="https://user-images.githubusercontent.com/44567597/205427427-eda49203-6812-47c8-8fc2-33905ef23a83.png">



13) Actions available on Users

    <img width="960" alt="user-actions" src="https://user-images.githubusercontent.com/44567597/205426788-0b342597-0033-456f-bf57-067183f18d99.png">



14) Login Screen

    <img width="960" alt="login-user" src="https://user-images.githubusercontent.com/44567597/205428908-8114cdf5-294f-4e1f-a899-415cf7cdbdce.png">



15) Login Screen on error

    <img width="960" alt="login-user-error" src="https://user-images.githubusercontent.com/44567597/205428911-b970c28d-2ddc-483a-98ec-60509fcea75f.png">



16) Singup Screen

    <img width="960" alt="signup-user" src="https://user-images.githubusercontent.com/44567597/205428914-bfefb845-fbbb-435b-ab9b-955c472abf9a.png">



## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```
