<!-- For Notes within the build: -->
    - create a new db with `createdb <NAME_OF_DB>`

<!-- Stack: -->
    - Frontend: SCSS, React.js, Redux, HTML5, Node.js
    - Backend: PostgreSQL

<!-- React: -->
    - <React.StrictMode> : 
        - (https://reactjs.org/docs/strict-mode.html)
        - Tool for highlighting potential problems in an application.  Doesn't render visible UI.  Activates additional checks and warnings for its descendants.
        - Checks are run in development mode only; don't impact production
        - E.g. detecting unexpected side effects, identifying components with unsafe lifecycles, warning about deprecated findDOMNode usage, etc.

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


<!-- DOM methods: -->
    - window.scrollTo() :
        - (https://www.w3schools.com/jsref/met_win_scrollto.asp)
        - The scrollTo() method scrolls the document to specified coordinates


<!-- Redux: -->
    - slice :
        - a slice is a collection of Reduc reducer logic and actions for a single feature

    - createAsyncThunk :
        - a 'thunk' (middleware) that handles action types and dipatches right actions based on a returned promise.