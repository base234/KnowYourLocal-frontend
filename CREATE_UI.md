Analyse the project structure and discover how things are structured. The views are in the pages folder. Every view placed over a layout (from layouts folder) which is just as base container for roles. Currently, we have only customer role. Thus you can find customers views in customer folder. We didn't had a much progress right now, but you can make mentioned pages with routes and dummy cards and so on for displays. Use tailiwind css wherever possible. Since, there are possibilties that tailwindcss won't be able to solve every problem, for that you can use css.

First, let's start by creating a sidebar. The sidebar should be on the left and it will be expandable and contractable but not hidden. When the sidebar is not in expanded mode, it must show only the icons and are hoverable by tooltips that fades in and fades out on hover in and out of icons. Also, the menu with sub menu's must show a flyout box that will contain the submenu on hover. Must show with smooth animation with enter and exit on hover in and out. Those tooltips won't be visible while the sidebar is in expanded mode. The content will is flexible according to the sidebar.

The topmost of the sidebar will contain logo and the app name. The bottom most will contain the upgrade or subscripton banner and progress bar shows the status of exhausted credits. In middle part, it must be scrollable menu. The menu should have an icon followed with texts. A menu can have a sub menus. The menu with submenu must have ChevronRight icon (lucide.dev or react-lucide icons) right most part of the menu. It must have smooth animation for showing and hiding.

Just below the sidebar logo branding, there will be button "Create Local". On clicking the button, it will open the Modal (use SmartModal component in components folder and inside it add steps next and previous) that will contain the local creation just like onboarding screen.

The sidebar menus are as follows:
=======================================================
[Logo] and App Name
--------------------------
button: New Local
--------------------------
- Dashboard
- My Locals
- Quick Find
- Favourites
- Other      +
 - Sub menu 1
 - Sub menu 2
 - Sub menu 3
--------------------------
- Help and Support
- Quick Guide
--------------------------
heading: Recent Locals
- [random-colored-dot] Visit to a Taj Mahal an...
- [random-colored-dot] Roving around new loca...
- [random-colored-dot] Coffee place around city

There should a navbar bar on content screen and it must be flexible with sidebar. It should be sticky and always stay on top. On left it will show the name of the current view and on right most it will show notifications and profile icon with initials. It must have a dropdown in click.

Keep the brand intact as possible with compact and sleek UI with great intutive and smothness.
