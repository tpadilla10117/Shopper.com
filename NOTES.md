<!-- For Notes within the build: -->
    - create a new db with `createdb <NAME_OF_DB>`

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
        - (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
        - Parse incoming request bodies in a middleware before your handlers, available under the req.body property.

    - morgan:
        - (https://www.npmjs.com/package/morgan)
        - HTTP request logger middleware for node.js

    - cors:
        - (https://www.npmjs.com/package/cors)
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