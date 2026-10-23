# Assignment 2: State and Dynamic Data

## Reflection Prompt

Include a short reflection addressing the following questions.  
> **All reflection questions must be answered** to be eligible for full marks.
> 
> Each response should be approximately **2 to 4 sentences** and should reference specific parts of your project where appropriate.
> 
> **Honest reflections** about challenges, mistakes, or confusion are encouraged and **will not negatively impact your grade**.

 - Describe how your application fetches sleep data from the backend. Identify the screen and the hook or function where the fetch logic is implemented.
 - Explain how you handled form validation on the **Sleep Log Entry** screen. Which component or file contains the validation logic and how does the user receive feedback when the form is submitted?
 - Describe how sleep entries are rendered dynamically in either the **Sleep Log List** screen or the **Sleep Statistics** screen. Which state variables and components are involved?
 - Describe one challenge you encountered while implementing state management, data fetching, or statistics calculations. Explain how you resolved the issue.
 - Choose one commit from your Git history that represents meaningful progress in this assignment. Include the commit message and explain what was implemented in that commit.

***ENTER YOUR RESPONSE TO THE REFLECTION PROMPT HERE***

I got the sleep data from the backend in sleep-log-list.tsx and statistics.tsx. I used useEffect so the getSleepEntries function runs when the page opens. The function uses fetch() and saves the backend data into sleepEntries.

I added the form validation in sleep-log.tsx inside the handleSubmit function. It checks if the fields are empty, if the date and times are in the right format, and if the quality is between 1 and 5. If something is wrong, an error message shows on the screen. If it works, the user gets a success alert and the form clears.

I used FlatList in sleep-log-list.tsx to show the sleep entries from the backend. The entries are stored in the sleepEntries state variable, and renderItem creates a card for each entry. The cards show the date, bedtime, wake time, and sleep quality.

One problem I had was getting the Android emulator to connect to the backend. At first, the entries would not load because I was not using the right address for the emulator. I fixed it by using 10.0.2.2, keeping the backend terminal running, and adding android:usesCleartextTraffic="true" in AndroidManifest.xml.

One important commit I made was Added sleep log list screen that gets entries from the backend. In that commit, I added the new Sleep Log List page and made it fetch the sleep entries from the backend. I also used FlatList to display the entries on the screen.

