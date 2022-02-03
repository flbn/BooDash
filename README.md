# BooDash 
### General Instructions

Our task is to create an Full-Stack employee directory web app. For the sake of time and familiarity, the language I will be using is TypeScript. To do so, we will make use of relevant technologies:
- Back-end:
	- Node.js: Familiar, rich ecosystem, in-house technology
	- GraphQL: Easy to test, somewhat end-to-end Type Safety
	- MongoDB: Free! Easy to bootstrap
	- Heroku: Free! Easy deployment process, in-house technology as well
- Front-end:
	- React: Although I'm partial to Vue and Svelte, I have experience with React and would like to make use of the technologies used at PostLight. It also has a rich ecosystem and has been getting much easier to use alongside of TypeScript.
	- Apollo: I've never tried Apollo before but it seems to be the most popular GraphQL client for React so I thought I'd give it a go. 
	- TailwindCSS: React has a lot of js-in-css solutions (i.e. styled components, stiches, etc.) but for the sake of time and again, familiarity, I will opt for Tailwind.
	- Remix Icon: rather than import a node module, Remix has a rich ecosystem of icons that allows for easy-in-browser editing of the SVG's. 
	- Radix UI: I love what the Radix team does. They make accessible web primitives so as to allow full customizability when creating a design system. They work wonderfully with screen-readers!

### What would I do to improve this app?
For one, I think the codebase is kinda messy. Given more time, I would spend more of my focus on making the code readable. On that note, I also worked in daily sprints at a very fast pace: I didn't have time to document everything. I wish I had; so you all could see my thoughts alongside of my code. I should have also been more consistent with my component names, functions names, etc. 

Additionally, I would probably refactor to use another GraphQL client. Apollo has some abstractions that have made the API really tedious to work with. They've created problems for themselves, notably their caching API that other libraries like React Query were able to learn from and adapt. I would probably change to React Query or urql.

One big thing I would also add is client-side validation and tests. I simply just did not have enough time and felt that these weren't integral to the completion of the given instructions. 

Lastly, you'll see a lot of ``` any ``` types being used. I know, it defeats the purpose of choosing TypeScript but the developer experience of auto-completion and compile-time safety make it easier to use than JavaScript, in my opinion. It's also my first time using TypeScript with Next/React/Apollo. Given more time, I'd look through their respective types and other existing codebases.

### General Background

To begin, we should probably create an imaginary scenario for a company that needs an employee directory. Our company name will be Boo. Why? Well, there's an open-source icon library called 'Remix Icon' that has a cute little Ghost Icon that I will use for the logo. 

Boo is a talent agency that employs agents and managers to represent up and coming influencers and media talent. They're an international business, but mostly focused on the Los Angeles,  New York, and Miami markets. 

The company employs Talent Agents and Talent Managers, but they also have IT, HR, and marketing departments. Due to how fast the company is growing and the variety of employees they employ, the CEO tasked us with creating an employee directory that they can access online.

### Day One
** These steps do not include the steps taken to create the MongoDB collection. It's a simple shared cluster! **

To begin, we have to create our folder structure. 
``` mkdir BooDash; cd BoodDash; mkdir be fe; cd be```
With the following command we can use Google's TypeScript Style Guide to generate some useful boilerplate for us (tsconfig, prettier, eslint, nodejs types, etc.).

``` npx gts init ```

Afterwards, I made some configuration files for the environment variables that will be used in the development, testing, and production builds. Those can be found in the ``` src/config ``` folder. Additionally, I also set up some initial models for the structures I will be making use of. Those can be found in the ``` src/models ```  folder.  Thanks to the fake scenario I made up, it was relatively easy to think about what kind of models I'll need. TypeScript is perfectly suited to make models, especially since the mongoose library is compatible with TypeScript. 

With our models created, I then made use of the 'yup' library to create validation. These validators are placed in the ``` src/validation ```  folder. Most of what we need comes out of the box. but between Mongo and our custom interfaces, we'll have to extend yup's functionality. For the most part, I just added some custom logic to check if the value's that will be inputted exist inside of our enum types, as well as creating a validator to check if a value is an array, and one to validate that the object ID's are compatible with Mongo's ObjectID's.

*Phew*. That was a pretty long sprint. At this point, I got hungry and my dogs were getting a bit restless so I put my laptop down, made dinner, and walked the dogs. Before heading to bed, I wanted to at least get GraphQL up and running with some basic CRUD functionalities. 

Thanks to the hard-work we put in earlier, our models are well defined and we are mostly just translating those types to their GraphQL equivalents. Those can be found in the ``` src/graphql/types.ts ``` file. Normally, I would create a types folder and create a separate file each type, but our application is fairly small so we don't have to do so. The same goes for our schema, which is found in the ``` src/graphql/schema.ts ``` file. In fact, this single-file pattern is repeated for our queries and our mutations, which can be found in their respective files ``` src/graphql/query.ts ``` and ``` src/graphql/mutation.ts ```. This pattern changes when considering the resolvers for each query and mutation. Since I decided to keep all queries and mutations in a single file, I had to decouple each functions resolver. In the ``` src/graphql/resolver ``` folder you'll find the error handling for every request. For example, when a user log-ins, we have to ensure that the request passes the validation we wrote earlier, that the user exists in our database, and we must also assign that user a JSON Web Token so they can make authorized requests. Similarly, when a user wants to update or create a new employee, we must ensure that they are authorized to do so and that the request is updating the employee according to our validation rules. 

That sounds like a lot, but thanks to the extensive boilerplate we wrote it didn't take much work! It's nearly midnight now, so I'm going to call it a day. Tomorrow I plan on adding tests and sourcing data to upload a bunch of employees to Mongo. Additionally, I should add some filters to our queries and some pagination logic. GraphQL comes in handy here, since that's pretty much built into the language!


### Day Two
Today won't be nearly as long as yesterday. I have some neglected classwork to attend to, as well as having to run some errands. At the very least, I should get the things I mentioned I wanted to get done yesterday, today.

Before anything, I decided to add GraphQL Playground so I can mess around with queries and mutations in an easier fashion. I manually tested my queries and found that I was getting some errors from my validations. In specific, adding a new employee threw an error that I had to provide an id, since I required that in my yup validation. This was a clear mistake on my end, Mongo generates it's own Object Id's so I don't have to worry about that. So, I kept the id's in my types but removed it from my schema and validators, since I'll need them to query specific employee's. 

After cleaning these up, I needed to extend my manual tests and turn them into Unit tests. These tests can be found in the ``` src/tests ``` folder. I wrote a couple of tests for users trying to log in. All fields are required to sign in so any empty form field will be verified on the back-end, for logging in, we only accept username and password so those must also be provided. After writing these tests, I had to step away to get to some meetings for school and complete my homework. 

Having finished the rest of my responsibilities, I added the tests for creating and updating employees. To test, ``` npm test ```. You should see 16 passing tests!

I still have some more homework to do! Additionally, my parents arrive from the airport early in the morning so I think I'm going to call it quits for tonight. This would be an obvious choice for a more rational person, instead, I decided to at least get the front-end installed and get tailwind setup. So, I did that! ``` cd ..; npx create-next-app@latest --typescript ```. Next.js is awesome, plus it'll help bootstrap the process of making the web app.

I wanted to take the opportunity that I had sitting down to make this web-app to pick up something new, even though it's not exactly the latest thing. It's all just React at the end of the day. So, I decided to use Next.js as the front-end framework and Apollo Query as the GraphQL client. 

To add Tailwind, we'll run ```npm install -D tailwindcss postcss autoprefixer ``` and ``` npx tailwindcss init -p ```  to initialize our tailwind configuration. The rest of the steps can be found on Tailwind's [website](https://tailwindcss.com/docs/guides/create-react-app).

### Day Three

*sigh* It's Sunday. I picked up my parents from the airport and we just decided to spend the day catching up, ordering some take-out and watching TV. I may or may not touch the front-end later.

Update: It's later. My aunt asked if I could take my cousins out to teach them how to drive. I'm having a wonderfully lazy day and feeling like a good cousin so I just decided to not touch any code today.

### Day Four

Alright. TODAY IS THE DAY. Today is the day I work on the front-end! First, I drew up a quick mock-up for what I wanted the interface to look like. I just wanted to have a simple table with pagination. It's never as easy as you imagine, but if I keep it simple I can make good progress. 

I set up the Apollo client, which can be found at ``` /apollo-client.js"``` I went with the default set-up on the documentation, which is something I later regretted. Although caching is an important part of web performance, it was a pain in the ass to work around later. For instance, on every mutation I had to not only send the new POST to the back-end, I had to create hooks that updated the client-side AND the cache. I looked into this a little and found a lot of similar nagging on their GitHub discussions, with many suggestions saying that they ditched Apollo for these reasons and have been using React Query with no issues. *duly noted*.  After I set up my client, I went ahead and added my GraphQL schemas to the `/gql/` folder. At first, I just populated the page with my ``` GET_ALL_EMPLOYEES ``` query without pagination to fetch all of the employees to see how Apollo felt. I noticed right away that I would need their FireFox extension for a better Developer Experience. I was unable to view what the heck was going on with the cache without it. 

After I grabbed a list of employees, I wanted to make them look nicer so I made a bare bones table with no styling. I'd done a prior interview that required dynamically creating a table and serving the HTML from the server, so I actually felt quite at ease with this, even though it's not an HTML element I use all the time. Nice! We've got a simple table set up and it didn't take long. Looking good so far. Wait! Our auth! I forgot to implement a log-in and sign-up workflow. I figured I would just store the JSON Web Token in local storage since this assignment didn't require it in the first place, though I know it's not good practice. In fact, a project of mine got "hacked" from an XSS attack at a hackathon so I'm all too familiar with knowing NOT to do this. I started working on this when I realized that it was pretty much useless.

By this I mean, it's sort of pointless to demonstrate that I can do authorization/authentication if I'm using terrible practices. Normally, I would create a token, a refresh token, and a CSRF token on the server and send those through same-site and http-only cookies. Sounds easy, right? NO! This is a really tedious process and it requires a lot of attention. We care about our users security, so we can't overlook anything. I decided to go back and remove any trace of authorization from the backend and proceed with the front-end.

I had classwork to do so I took a break for a while. When I came back, I fleshed out the front-end. Some cards with an overview of our data (namely, the total number of employees and the sum of their salaries). I also added a search bar in the header. It's looking clean! The glassomorphic vibe is very 2018 -- I thought the gradients would make for a nice addition, given our interface wouldn't have much on it. 

Next, I added a dynamic route to view an employee's personal page. Next's router allows you to create dynamic routes with server rendered information. Perfect, we can just query a specific employee's ID and create their pages based on that unique identifier. 

I struggled a lot with the design of this page. There's not much going on, after all, we're only querying about 4-5 fields. Instead of adding more fields to the back-end, I added some buttons with links to my own personal information and  a hover card with a personal statement. Nice! It looks good.

I got tired here, but I was still in the flow -> Naturally, I wanted to set myself up for the following day so I created components to abstract the mess I made. The codebase was looking much cleaner. I also added some hooks to handle client state. These hooks just edited the client-side employee information. I put my laptop down and went to sleep watching Dickinson. 

### Day 5

I have a feeling today is the today I finish... I could see the finish-line! My hooks were set up and I just needed to clean some of the code up, send the updated information to the backend, add pagination, make the search bar functional, etc... Okay, maybe I underestimated what I had to do. First, I worked on syncing my state up with the mutations and the cache. I ran into a lot of trouble here (even in the finished build, the cache is not working properly). Apollo makes it difficult to mutate cached array results, I even thought about ditching cache entirely but guess what -- Apollo makes it hard to do that too. 

I wrestled with Apollo and got most of the caching to work! At this point, I looked over the feature requests and got overwhelmed. I decided to give the back-end another feature: sorting. With mongoose, it's relatively trivial to do so: just add some resolvers. My custom resolver receives a field name, sorts that field, paginates it, and returns the query. Nice. They work on the GraphQL playground, but let's test them on the front-end. I added some hooks and passed them down to the respective child components. I'm handling the global state through the ``` /src/index.tsx ``` file -> all children cascade from there.

So far, I've got pagination, sorting, editing, uploading, and deleting. Now, I just have to make the search bar! The search bar fetches the ``` GET_ALL_EMPLOYEES ``` query and references the cache to check if any new employees have been added. I guess I can thank Apollo for that! 

### Day 6

Deployment! I'm going to be using Heroku to deploy this app! It's relatively straight forward, given the docs and my previous experience. One thing I'm not looking forward to is resolving the CORS errors, if they come up. It's a massive headache..

*fast forward 2 hours* Yep, called it. I'm CORS error hell. For whatever reason, my local build can call the deployed back-end just fine but the deployed front-end receives a bunch of 'Same Origin Policy' errors, even though it's also in the whitelist. -__- No matter how many times I deploy things, I always end up here.  After a dozen or so more pushes to my private repository builds, I found out the error came from Apollo's fetch policies. I patched this up and BOOM! CORS errors resolved! I tested the final build a bit more and found a CSS bug on large screens. Once I patched this up, I submitted the final build!