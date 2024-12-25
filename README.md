# Barber Booking App

## Completed

- [x] Configure supabase
- [x] Configure tailwind
- [x] Add auth using supabase
- [x] Make a reusable form component for the auth forms
- [x] Make a reusable modal
- [x] Create a theme provider
- [x] Create a Navigation bar
- [x] Make a user dashboard with different pages the user can access
- [x] Create user profile page with personal info
- [x] Create a reservation page using a stepper form to select the barber, service, date and time
  - [x] Create a select component to select a barber
  - [x] Create a select component to select a service
  - [x] Create a calendar component to select a date and time
  - [x] Create a button to submit the reservation

## In Progress

- [] Create an admin dashboard
  - [x] Create a table to display the users
  - [ ] Create a function to allow admins to add a user to the barbers table
- [ ] Create a page for users to view their reservations

## To Do

- [ ] Create a page for barbers to view their reservations
  - [ ] Create a table to display the reservations
  - [ ] Create a function to allow barbers to confirm a reservation

## Project setup

- Create a `.env.local` file and add the following variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

DB_PASSWORD=
```

- Grab your supabase url and anon key from your supabase dashboard
- Install the dependencies with `npm install`
- Run `npm run dev`
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
