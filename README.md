# Hipnode
> Hipnode, a premium Social Media Forum Web App, redefines digital interaction by offering a suite of powerful functionalities. Seamlessly navigating the platform begins with a user-friendly Sign Up & Sign In process, complemented by in-depth surveys for a tailored onboarding experience. The Homepage serves as the hub, featuring a dynamic home feed, detailed post views, and dedicated creation pages. Hipnode goes beyond traditional social media by introducing specialized sections for Meetups, encouraging connections based on shared interests.
> Live demo [_here_](https://hipnode-devtaehong.vercel.app/). 

## Table of Contents
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Setup](#setup)
* [Team](#team)
* [Contact](#contact)
<!-- * [License](#license) -->


## Technologies Used
- **Next.js**
- **React**
- **TypeScript**
- **Prisma**
- **Tailwind CSS**
- **Supabase**
- **Framer Motion**
- **Lexical**
- **Shadcn/ui**



## Features
1. Sign Up & Sign in - Complete authentication and survey
2. Homepage - Consisting of a home feed, post details, and creation pages
3. Meetups - Display all available meetups
4. Groups-Displayallcontentwithingroups
5. Podcasts - Display all podcasts with a podcast details page
6. Profile - Show all posts, meetups, and podcasts for a specific user
7. Live Chat - Engage in real-time conversations, share instant feedback, and build connections through our interactive live chat feature.
8. Live Notifications - Display notifications in real-time using web sockets



## Setup
1. **Install dependencies:**

   ```
   npm install
   ```

2. **Ensure you have the following Environmental Variables:**

   ```
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<clerk_publishable_key>
   CLERK_SECRET_KEY=<clerk_secret_key>
   WEBHOOK_SECRET=<webhook_secret>
   
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
   
   # Ably API Key
   NEXT_PUBLIC_ABLY_API_KEY=<ably_api_key>
  
   # Google Maps API Key
   GOOGLE_MAPS_API_KEY=<google_maps_api_key>
   
   # Resend API Key
   RESEND_API_KEY=<resend_api_key>
   ```

3. **Running the Application :**

   ```
    npm run dev
   ```


## Team
- [Glen McCallum](https://github.com/glenmac90) - Software Developer

- [Alexander Mc Lachlan](https://github.com/AlexDjangoX) - Software Developer

- [Tye Stanley](https://github.com/TyeStanley) - Software Developer


## Contact
Created by [@devtaehong](https://taehongmin.vercel.app/) - feel free to contact me!


<!-- Optional -->
<!-- ## License -->
<!-- This project is open source and available under the [... License](). -->

<!-- You don't have to include all sections - just the one's relevant to your project -->
