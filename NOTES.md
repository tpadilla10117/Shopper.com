<!-- For Notes within the build: -->
    - create a new db with `createdb <NAME_OF_DB>`
    - 1) Need to be in psql terminal -> to drop a db, use DROP DATABASE "e-commerce_nodejs_template";

<!-- Stack: -->
    - Frontend: SCSS, React.js, Redux, HTML5, Node.js, Stripe
    - Backend: PostgreSQL

<!-- CSS Preprocessors: -->
     - CSS preprocessors: A scripting language that extends CSS by allowing developers to write code in one language and then compile it into CSS.

     - Compilers: converts programmer's procedural language program (source code) into the machine language code (object code).  This object code can be then saved and run later.
    
    - Interpreter: Converts the procedural language one statement at a time into machine code just before it is executed.  No object code is saved. e.g. standard version of BASIC

    - SASS ('Syntactically Awesome Style Sheets'): an extension of CSS that enables you to use things like variables, nested rules, inline imports and more. It also helps to keep things organised and allows you to create style sheets faster. (Additional explanations at: https://www.creativebloq.com/web-design/what-is-sass-111517618 or see documentation at https://sass-lang.com/documentation)

<!-- Middleware: -->
    - body-parser:
        - (https://www.npmjs.com/package/body-parser)
        - Parse incoming request bodies in a middleware before your handlers, available under the req.body property.

    - morgan:
        - (https://www.npmjs.com/package/morgan)
        - HTTP request logger middleware for node.js

    - cors:
        - (https://www.npmjs.com/package/cors)
        - (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
        - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

<!-- React: -->
    - <React.StrictMode> : 
        - (https://reactjs.org/docs/strict-mode.html)
        - Tool for highlighting potential problems in an application.  Doesn't render visible UI.  Activates additional checks and warnings for its descendants.
        - Checks are run in development mode only; don't impact production
        - E.g. detecting unexpected side effects, identifying components with unsafe lifecycles, warning about deprecated findDOMNode usage, etc.

    React Hook Notes (https://www.freecodecamp.org/news/react-hooks-cheatsheet/):

    - useState Hook:
        - The useState hook allows us to create state variables in a React function component.  State allows us to access and update certain values in our components over time.  When we create a state variable, we must provide it a default value (which can be any data type).

    - useEffect Hook:
        - useEffect lets us perform side effects in function components.  Side effects are when we need to reach into the outside world. Such as fetching data from an API or working with the DOM.  Side effects are actions that can change our component state in an unpredictable fashion (that have caused 'side effects').

        - useEffect accepts a callback function (called the 'effect' function), which will by default run every time the component re-renders.
        - useEffect lets us unsubscribe from listeners that we might have created by returning a function at the end.
        - We want to unsubscribe from certain events, such as an event listener, because when the component unmounts (i.e. the user goes to a different page), React may attempt to update state that no longer exists, causing an error.

    - useRef Hook:
        - Refs are a special attribute that are available on all React components. They allow us to create a reference to a given element / component when the component mounts.  useRef allows us to easily use React refs. They are helpful when we want to directly interact with an element, such as to clear its value or focus it, as with an input.

<!-- react-transition-group: -->
    - (https://reactcommunity.org/react-transition-group/)
    - Exposes simple components useful for defining entering and exiting transitions.  It exposes transition stages, manages classes and group elements and manipulates the DOM, making the implementation of actual visual transitions much easier

    - <CSSTransition> :
        - (https://reactcommunity.org/react-transition-group/css-transition)
        - transition component used if using CSS transitions or animations.  built upon the <Transition/> component
        - CSSTransition applies a pair of class names during the appear, enter, and exit states of the transition. The first class is applied and then a second *-active class in order to activate the CSS transition. After the transition, matching *-done class names are applied to persist the transition state.

<!-- react-router-dom: -->
    - useLocation() :
        - (https://v5.reactrouter.com/web/api/Hooks/uselocation)
        - this hook returns the location object that represents the current URL. Think of like a useState that returns a new location wherever the URL changed (e.g. triggering a new page view)

    - <BrowserRouter> :
        - (https://v5.reactrouter.com/web/api/BrowserRouter)
        - A <Router> that used HTML5 history API to keep your UI in sunc with the URL

    - <NavLink> : 
        -(https://v5.reactrouter.com/web/api/NavLink)
        - A special version of the <Link> (declarative, accessible navugation in application) that adds styling attributes to the rendered element when it matches the current url


<!-- DOM methods: -->
    - window.scrollTo() :
        - (https://www.w3schools.com/jsref/met_win_scrollto.asp)
        - The scrollTo() method scrolls the document to specified coordinates


<!-- Redux: -->
    - slice :
        - a slice is a collection of Reduc reducer logic and actions for a single feature

    - thunk :
        - (https://redux.js.org/tutorials/essentials/part-5-async-logic)
        - Middleware in redux that sits between an action being dispatched and the action reaching the reducers.  Redux thunk is a middleware that lets you call action creators that return a function instead of an action object.  That function receives the store's dispatch method, which is then used to dispatch regular synchronous actions inside the function's body once the asynchronous operations have been completed.

    - createAsyncThunk :
        - a 'thunk' (middleware) that handles action types and dipatches right actions based on a returned promise.

<!-- Open Graph Protocol: -->
    - Open Graph meta tags: Open Graph meta tags are snippets of code that control how URLs are displayed when shared on social media. They’re part of Facebook’s Open Graph protocol and are also used by other social media sites, including LinkedIn and Twitter (if Twitter Cards are absent). You can find them in the <head> section of a webpage. Any tags with og: before a property name are Open Graph tags.

        - Resources:
            - (https://ahrefs.com/blog/open-graph-meta-tags/)
            - (https://developers.facebook.com/docs/sharing/webmasters/) - Official Documentation
            - (https://ogp.me/) - Documentation
            - (https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup) - Twitter Documentation
        
        - Validators:
            - Twitter: (https://cards-dev.twitter.com/validator)
            - Facebook: (https://developers.facebook.com/tools/debug/)
            - Linkedin: (https://www.linkedin.com/post-inspector/inspect/)

<!-- Manifest.json: -->
    - manifest.json:
        - The manifest.json is a simple JSON file in your website that tells the browser about your website on user's mobile device or desktop. Having a manifest is required by Chrome to show the Add to Home Screen prompt.  When user installs or bookmark your web application to the homescreen or adds it to an application launcher, manifest.json provides to the browser so that it can treat your website the name, icons, etc.

        - (https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json)

        - (https://hackthestuff.com/article/what-is-manifest-json-file-and-how-it-is-useful#:~:text=The%20manifest.,Add%20to%20Home%20Screen%20prompt.&text=json%20provides%20to%20the%20browser,the%20name%2C%20icons%2C%20etc.)

<!-- WebHook Process For Deployed Apps (Stripe) -->
    - 1) go to your Stripe Dashboard -> Developers -> Webhooks -> Add endpoint
    - 2) Paste in your endpoint from backend
    - 3) Look at options, can select events to Listen to on backend
    - 4) Copy POST request and paste into project

<!-- WebHook Process For Local Environments using Stripe CLI  (https://github.com/stripe/stripe-cli) -->


<!-- REDIS -->
    - To run a redis server, use command `redis-server`

    - To confirm if Redis is running, user the command `redis-cli ping` -> if its running it should respond with "PONG"

    - Connect to your Redis server by running the command `redis-cli -h localhost -p 6379`

    - To TEST setting a KEY: redis-cli SET mykey "Hello World"

    -> Then retrieve it by typing: GET mykey

    - To return all keys, use -> KEYS *

    - To delete all keys from ALL DATABASES, use -> FLUSHALL

    - To delete all keys from the currently selected DB -> FLUSHDB

    - Check if the data is stored in Redis by running the command GET <key>, where <key> is the original URL of the request.

    - For example, if the original URL is /products, you would run the command GET /products.
    
    - If the data is stored in Redis, it should return a string that represents the cached data.
    
    - If the data is not stored in Redis, it should return nil.



<!-- API  -->
    - If change primary endpoint '/', need to update stripecheckoutsession in stripeCheckout.js

<!-- SQL QUERIES in DB ADAPTERS -->
    - 1) The e.g. const {rows: [product] } is client-side code that represents our request to query the product table
    - 2) Insert data into the table with 'INSERT INTO'
    - 3) Specify which table you want to access.  In the example, we have 'products' table
    - 4) Specify which columns you want to access in your table. In the example we have (id, title, description...image)
    - 5) the VALUES $1, $2...etc are placeholders to specify values of each column
    - 6) We make sure to add an argument to define the placeholder's value.  This is indicated with the brackets after the ``
        - e.g. `INSERT INTO ... RETURNING *`, [id, title, description...items]

    - e.g. Sample Query:
            const { rows: [product] } = await client.query(`
                INSERT INTO products(id, title, description, price, category, subcategory, productid, image)
                VALUES($1,$2,$3,$4,$5,$6,$7, $8)
                RETURNING *
        `, [id, title, description, price, category, subcategory, productid, image]);


<!-- Stripe API LifeCycles & DOCS: -->
    - 1) Checkout Lifecycle (https://stripe.com/docs/payments/checkout/how-checkout-works):

        - Then need to handle a checkout.session.completed event

    - 2) Fulfill Orders With Checkout (https://stripe.com/docs/payments/checkout/fulfill-orders):

        - Now that you have the basic structure and security in place to make sure any event you process came from Stripe, you can handle the checkout.session.completed event. This event includes the Checkout Session object, which contains details about your customer and their payment.

        - 1) Create a Webhook endpoint
        - 2) Install and set up the Stripe CLI
        - 3) Test your webhook locally
            e.g. testing a payment intent: (https://stripe.com/docs/api/payment_intents/object)

            e.g. testing a checkout session and getting its object: (https://stripe.com/docs/api/checkout/sessions)

        - 4) Deploy your webhook endpoint

        **ORDER: Trigger session -> if complete, use webhook to push data into DB & redirect to success page

<!-- Client.side Routing: -->
    - (https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writing-manually)

    - Summary: When you load a typical React-app, the initial request fetches an html document with essentially just a script tag inside of it and nothing else.

    - React Router uses client-side routing.  With client-side routing, which is what React Router provides, things are less simple. At first, the client does not have any JavaScript code loaded yet. So the very first request will always be to the server. That will then return a page that contains the needed script tags to load React and React Router, etc. Only when those scripts have loaded does phase 2 start. In phase 2, when the user clicks on the 'About us' navigation link, for example, the URL is changed locally only to http://example.com/about (made possible by the History API), but no request to the server is made. Instead, React Router does its thing on the client-side, determines which React view to render, and renders it. Assuming your about page does not need to make any REST calls, it's done already. You have transitioned from Home to About Us without any server request having fired.

    - So basically when you click a link, some JavaScript runs that manipulates the URL in the address bar, without causing a page refresh, which in turn causes React Router to perform a page transition on the client-side.

    - But now consider what happens if you copy-paste the URL in the address bar and e-mail it to a friend. Your friend has not loaded your website yet. In other words, she is still in phase 1. No React Router is running on her machine yet. So her browser will make a server request to http://example.com/about.

    - And this is where your trouble starts. Until now, you could get away with just placing a static HTML at the webroot of your server. But that would give 404 errors for all other URLs when requested from the server. Those same URLs work fine on the client-side, because there React Router is doing the routing for you, but they fail on the server-side unless you make your server understand them.

<!-- Solutions to React Client-Side Rendering Issue: -->
    - Catch-all:
    - With this approach, you do use the Browser History, but just set up a catch-all on the server that sends /* to index.html, effectively giving you much the same situation as with Hash History. You do have clean URLs however and you could improve upon this scheme later without having to invalidate all your user's favorites.

    - Downsides:
        More complex to set up
        Still no good SEO

<!-- Server Side Rendering (SSR) -->
    - From initial request, user gets all the content they want to see on-screen
    - As you'll see below, even when we use SSR, that does not mean we are suddenly not using React on the client-side anymore, but rather we still use React in the browser -> we differ loading of the React application to be further along in the process

    - SSR Flow in React:
        - 1) User enters the URL (e.g. ourApp.com) into the address bar of their browser and clicks 'enter'
        - 2) An initial request is made to your server (in my case, it's my express web-server)
        - 3) The server immediately loads up all of the code for the React application in memory, so it loads the react application
        - 4) The server fetches any required data (e.g. list of comments)
        - 5) The server will take the data in step four and render the React application
        - 6) It will take all of the HTML that is generated by the React application and ship it down to your users
        - 7) User sees the html content (*all of the starting content on the screen)
        - 8) The html file says the browser needs bundle.js, so the bundle.js file is fetched
        - 9) The request to retrieve the bundle.js is received
        - 10) The bundle.js file is received, and the React application boots up
        - 11) React application makes followup requests for data
        - 12) The server receives requests from the React application
        - 13) The server sends back JSON data
        - 14) The React App renders onto the screen!

<!-- Renderer Server: -->
    - View Layer: Take Data, Produce HTML
        - Benefit: Since we have an express API built in the Data Layer for Business Logic, I can replace my React SSR piece (Renderer Server) with an Angular app, ember app, or whatever framework I want.  We are Decoupling it from the business logic

            - Easier time scaling the app in the future

<!-- Unused code: -->
    - API calls in Redux with Thunks:
     /* const FAKESTORE_API_URL = "https://fakestoreapi.com/"; */

  /* Logic to request products from fakestoreapi.com : */
      /* const productRequest = () => {
          return axios.get(FAKESTORE_API_URL + "products?limit=5")
          .then(res => {
            const reqProducts = res.data;
            setProducts(reqProducts);
          })
      }; */

     /*  useEffect(() => {
        productRequest();
      }, [])  */

      /* async function getAllProducts() {
        try {
          const { data } = await axios.get('/api/products');
          return data;
        } catch (error) {
          throw error;
        }
      }; */


<!-- Misc Big Fixes: -->
- CSS Visual Malfunction for Nested Routing: (https://stackoverflow.com/questions/67379219/css-not-working-for-nested-routing-in-react-js)
    - Solution: Use absolute paths (beginning with /) for all assets in your index.html file. As index.html is a static file, when you load it on a route as /products/productId, the relative path points to /products/style.css, where file is not found.

<!-- Design System Notes: -->
- Buttons:
    - CTA: 
        - width: 200px
        - padding: 20px;
        - background-color: $background-primary
        
    - Primary:


<!-- TODO: List: -->
- frontend/src/ui/components:
    - slidebarModal/SlidingSidebarModal.jsx:
        - TODO: Need to ensure modal content is focusable and tab presses do not exit the mobile
        - TODO: Ensure upon modal close, tab focus goes back to the button that launched it
        - TODO: Styles for the nested elements
            - Optimize: Animation for sliding in/out
        

    - desktopNav/DesktopNav.jsx:
        - TODO: Follow the hubspot guide at (https://blog.hubspot.com/website/accessible-drop-down-menus) to make mega menu & links accessible

        - TODO: Styles on the megamenu

- backend/api:

- backend/db: