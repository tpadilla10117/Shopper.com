<!-- Documentation for /layout/nav/Nav.jsx: -->

    - Description:
        - A UI component that is responsible for rendering navigation.

    - Dependencies:
        - Nested Components: <SidebarModal>, <SlidingSidebar2>

    - Nested Components:
        - <SidebarModal /> (/layout/sidebarModal/SidebarModal.jsx):
            - Props: 
                - active -> Requires a boolean value to be used as a toggler to toggle the component itself.
                    - e.g. const [isSidebarVisible, setIsSidebarVisible ] = useState(false);

                - children -> Ideally for nested content within the modal itself
                    - e.g. A nested component like <SlidingSidebar2>


            - <SlidingSidebar2 /> (/layout/slidingSidebar2/SlidingSidebar2.jsx):
                - Props: 
                    - isSideBarVisible -> Requires a boolean value to be used as a toggler to toggle the component itself.
                        - e.g. const [isSidebarVisible, setIsSidebarVisible ] = useState(false);

                    - showSidebar -> A toggler function that relies on the isSideBarVisible state.  If implemented, changes the parent className 'slidingsidebar2' to 'slidingsidebar2 active' to toggle SCSS styles.