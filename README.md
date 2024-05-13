<p align="center">
  <a href="https://clerk.com?utm_source=github&utm_medium=clerk_docs" target="_blank" rel="noopener noreferrer">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="./public/light-logo.png">
      <img alt="Clerk Logo for light background" src="./public/dark-logo.png" height="64">
    </picture>
  </a>
  <br />
</p>
<div align="center">
  <h1>
    Clerk and Next.js App Router Quickstart 
  </h1>  
  <a href="https://www.npmjs.com/package/@clerk/clerk-js">
    <img alt="Downloads" src="https://img.shields.io/npm/dm/@clerk/clerk-js" />
  </a>
  <a href="https://discord.com/invite/b5rXHjAg7A">
    <img alt="Discord" src="https://img.shields.io/discord/856971667393609759?color=7389D8&label&logo=discord&logoColor=ffffff" />
  </a>
  <a href="https://twitter.com/clerkdev">
    <img alt="Twitter" src="https://img.shields.io/twitter/url.svg?label=%40clerkdev&style=social&url=https%3A%2F%2Ftwitter.com%2Fclerkdev" />
  </a> 
  <br />
  <br />
  <img alt="Clerk Hero Image" src="./public/hero.png">
</div>

## Introduction

Clerk is a developer-first authentication and user management solution. It provides pre-built React components and hooks for sign-in, sign-up, user profile, and organization management. Clerk is designed to be easy to use and customize, and can be dropped into any React or Next.js application.

After following the quickstart you'll have learned how to:

- Install `@clerk/nextjs`
- Setup your environment keys
- Wrap your Next.js app in `<ClerkProvider />`
- Limit access to authenticated users using Next.js middleware
- Embed the `<UserButton />`

## Deploy

Easily deploy the template to Vercel with the button below. You will need to set the required environment variables in the Vercel dashboard.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fclerkinc%2Fclerk-nextjs-app-quickstart&env=NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,CLERK_SECRET_KEY&envDescription=Clerk%20API%20keys&envLink=https%3A%2F%2Fclerk.com%2Fdocs%2Fquickstart%2Fnextjs&redirect-url=https%3A%2F%2Fclerk.com%2Fdocs%2Fquickstart%2Fnextjs)

## Running the template

```bash
git clone https://github.com/clerkinc/clerk-nextjs-app-quickstart
```

To run the example locally, you need to:

1. Sign up for a Clerk account at [https://clerk.com](https://dashboard.clerk.com/sign-up?utm_source=DevRel&utm_medium=docs&utm_campaign=templates&utm_content=10-24-2023&utm_term=clerk-nextjs-app-quickstart).

2. Go to the [Clerk dashboard](https://dashboard.clerk.com?utm_source=DevRel&utm_medium=docs&utm_campaign=templates&utm_content=10-24-2023&utm_term=clerk-nextjs-app-quickstart) and create an application.

3. Set the required Clerk environment variables as shown in [the example `env` file](./.env.local.example).

4. `npm install` the required dependencies.

5. `npm run dev` to launch the development server.

6. Once the (http://localhost:3000/) is running, a very basic page should pop up, with a sign in button at the top, then with the custom flow Sign Up form below. The Home page will be displayed beneath that, in the body.

7. The code for the custom sign Up flow is in sign-up\[[...sign-up]]\page.tsx.

8. The code for the custom oauth flow is in oauth\oauthSignIn folder.

9. If you sign up an account with the custom flow form, it will go smoothly, send a code to your email, and complete sign up. A user will then be created in the dashboard. If there is a user in the Clerk dashboard, the signIn.authenticateWithRedirect goes smoothly, and it will connect the social connection to the user and sign the user in.

10. If you click on the Google, Facebook, or Apple ID icons to sign up, it will either immediately go to "404 not found" due to the authenticateWithRedirect, or redirect to the external oauth, then when you give permission, it will redirect to "404 not found" after this, and no user is created in the Clerk Dashboard. However, I find that there is a connection created with the oauth provider.

11. If you switch the signUp.authenticateWithRedirect to signIn.authenticateWithRedirect, it should sign in no problems, if there is a user already created with that email.
