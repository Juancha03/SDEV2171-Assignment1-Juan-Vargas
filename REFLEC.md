
## Reflection Prompt

Include a short reflection addressing the following questions.
> **All reflection questions must be answered** to be eligible for full marks.
>
> Each response should be approximately **2 to 4 sentences** and should reference specific parts of your project where appropriate.
>
> **Honest reflections** about challenges, mistakes, or confusion are encouraged and **will not negatively impact your grade**.

- Describe how your application handles user authentication. Where is the authentication state stored and how is it accessed across the app?
- Explain how your registration and login flows work. Which components or files handle these processes and how is user feedback provided?
- If you implemented session persistence, describe how your application restores the user session when the app starts. If you did not implement it, explain that choice and describe how the app starts in an unauthenticated state.
- Explain how you access protected backend endpoints. Where do you attach the authentication token and how does your app handle invalid or expired tokens?
- Describe one challenge you encountered while implementing authentication, session management, or protected API access. Explain how you resolved the issue.
- Choose one commit from your Git history that represents meaningful progress in this assignment. Include the commit message and explain what was implemented in that commit.

***ENTER YOUR RESPONSE TO THE REFLECTION PROMPT HERE***
1. User Authentication

I used React Context to handle authentication in my app. The user information and token are stored in AuthContext.tsx. This makes it easier to access the authentication information from different screens without having to pass it around manually.

2. Registration and Login

I created two separate screens for registration and login called register.tsx and login.tsx. These screens take the information entered by the user and send it to the backend. If something goes wrong or the user enters incorrect information, an error message is displayed.

3. Session Persistence

I did not implement session persistence because I wanted to focus on the main requirements of the assignment. When the app is restarted, the user has to log in again to access their sleep entries.

4. Protected Backend Endpoints

I used EntriesContext.tsx to handle getting and creating sleep entries. The token is included in the Authorization header when making requests to the backend. If the backend returns a 401 error, the user is logged out and needs to sign in again.

5. Implementation Challenge

One of the problems I ran into was that my statistics screen stopped working after connecting the app to the new backend. I realized that I was still using the old endpoint and that the new backend had different field names. I fixed this by connecting the statistics screen to EntriesContext.tsx and changing how I accessed the sleep information.

6. Meaningful Commit

Commit message: Create EntriesContext.tsx

I chose this commit because it was an important part of getting my app connected to the new backend. It helped me manage sleep entries in one place and share them between different screens. It also allowed me to update the list when a new sleep entry was added without making another request to get all the entries.