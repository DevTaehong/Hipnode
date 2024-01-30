# HIPNODE

Hipnode is an innovative social media platform featuring posts, podcasts, meetups, interviews, and other interactive functionalities.

This is the Capstone project from JS Mastery Masterclass Experience. The project was engineered over three months using a professional UI design created using Figma.

## Features

- **Posts**: Create and engage with posts. Share your thoughts, experiences, and ideas with a wider community.

  [<img src="public/readme/home.png" alt="Homepage" width="500" height="300">](https://youtu.be/psQsIe4ZzzY "Hipnode - Social Media Platform - Homepage. Create, Read, Update and Delete a Post")

- **Podcasts**: Explore a variety of podcasts on diverse topics or host your own.

  <img src="public/readme/podcast.png" alt="Homepage" width="500" height="300" >

- **Meetups**: Organize and participate in meetups to connect with people sharing similar interests.

  <img src="public/readme/meetups.png" alt="Homepage" width="500" height="300">

- **Interviews**: Discover interviews with a range of personalities, providing insights and inspiration.

  <img src="public/readme/interviews.png" alt="Homepage" width="500" height="300">

- **Groups**: Join groups related to your own interests, share posts and other content.

  <img src="public/readme/group.png" alt="Homepage" width="500" height="300">

- **Live Chat**: Engage in real-time conversations, share instant feedback, and build connections through our interactive live chat feature.

  <img src="public/readme/livechat.png" alt="Homepage" width="500" height="300">

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **React**: Library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript.
- **Prisma**: ORM for database operations.
- **Tailwind CSS**: Utility-first CSS framework.
- **Supabase**: Open-source alternative to Firebase.
- **Framer Motion**: Animation library for React.
- **Lexical**: Extensible text editor framework.
- **Radix UI**: Component library for building UI.
- **Other Utilities**: Including emoji support, audio recording, geolocation, etc.
- **Development Tools**: ESLint, Prettier for code linting and formatting.
- **Faker.js**: For generating fake data in development/testing.
- **Resend**: For emailing.

## Setup Guide

### Prerequisites

- Node.js (Refer to
  for installation)
- npm (Comes with Node.js)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/JSM-Masterclass-Experience/Cohort5_AlgoAlliance_Hipnode.git

   ```

2. **Navigate to the project directory:**

   ```
   cd Cohort5_AlgoAlliance_Hipnode
   ```

3. **Install dependencies :**

   ```
   npm install

   ```

4. **Ensure you have the following Environmental Variables :**

   ```
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<clerk_publishable_key>
   CLERK_SECRET_KEY=<clerk_secret_key>

   # Clerk URLs
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

   # Direct URL and Database URL
   DIRECT_URL=<direct_url>
   DATABASE_URL=<database_url>

   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=<supabase_url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<supabase_anon_key>

   # Webhook Secret
   WEBHOOK_SECRET=<webhook_secret>

   # Ably API Key
   NEXT_PUBLIC_ABLY_API_KEY=<ably_api_key>

   # Geolocation API Key
   GEOLOCATION_API=<geolocation_api>

   # Google Maps API Key
   GOOGLE_MAPS_API_KEY=<google_maps_api_key>

   # Resend API Key
   RESEND_API_KEY=<resend_api_key>

   ```

5. **Running the Application :**

   ```
    npm run dev
   ```

6. **Install dependencies :**

   ```
   npm install

   ```

7. **Run the Application :**

   ```
   Navigate to http://localhost:3000 in your browser to view the project.

   ```

## Authors

### Glen McCallum - Software Developer

[GitHub Profile](https://github.com/glenmac90)

### Alexander Mc Lachlan - Software Developer

[GitHub Profile](https://github.com/AlexDjangoX)

### Tye Stanley - Software Developer

[GitHub Profile](https://github.com/TyeStanley)

### Taehong Min - Software Developer

[GitHub Profile](https://github.com/devTaehong)

## License

This project is licensed under the [MIT] License.
