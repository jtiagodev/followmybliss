# blissrecruitment app

## Running the application

```
npm install
npm run start
```

NOTE: Requires NodeJS installed (https://nodejs.org/en/)

## Functional Requirements

- [ ] FREQ-01-001: loading screen while the server health is checked
- [ ] FREQ-01-002: server health is checked via the appropriate endpoint
- [ ] FREQ-01-003: server health is OK then the application should proceed to the “List Screen”
- [ ] FREQ-01-004: server health is NOT OK then the application should display a “Retry Action” widget
- [ ] FREQ-02-001: show the List Screen in two cases: loading screen managed to contact and check the server health **ASSUMPTION: and if server health is OK**
- [ ] FREQ-02-002: show the List Screen in two cases: app was opened with an URL with the format http://HOST:PORT/questions?question_filter=FILTER
- [ ] FREQ-02-003: query parameter which should be used to fill the search box and trigger the search functionality
- [ ] FREQ-02-004: If the question_filter parameter is missing the user should simply be placed at the listing
- [ ] FREQ-02-005: If the question_filter parameter is present but has an empty value the user should be placed at the filter variant with no input inserted but with the input box focused.
- [ ] FREQ-02-006: front-end application must fetch list data from the appropriate endpoint
- [ ] FREQ-02-007: app should fetch 10 records at a time
- [ ] FREQ-02-009: There is no sorting functionality. The list will follow the order returned from the API.
- [ ] FREQ-02-010: app should start loading 10 additional records if the user shows intent to browse additional records **ASSUMPTION: intent through clicking a button**
- [ ] FREQ-02-011: app should present a search box at the top of the list that allows the user to filter the results. 
- [ ] FREQ-02-012: Results should be shown on the same screen as a list
- [ ] FREQ-02-013: Searching implies hitting the appropriate endpoint and this variation must comply with the 2 requirements defined above.
- [ ] FREQ-02-014: If a search result is being shown (empty or not) the user must be allowed to share this with other users via the “Share Screen” **ASSUMPTION: intent of sharing through clicking a button**
- [ ] FREQ-02-015: (Share Feature) app must send an appropriate URL that, when opened, drives the user to the appropriate screen.
- [ ] FREQ-02-016: app must present a dismiss button to get out of the Search variant.
- [ ] FREQ-02-017: Each list element is selectable and whenever the user selects one record the app must show the “Detail Screen”.
- [ ] FREQ-03-001: front-end application must show the detail screen in two cases: A row was selected in “List Screen” **ASSUMPTION: user navigates to URL with question_id parameter**
- [ ] FREQ-03-002: front-end application must show the detail screen in two cases: The application was opened with the detail screen URL from outside the app:
- [ ] FREQ-03-003: The “Detail Screen” must allow the user to navigate back to the listing.  **ASSUMPTION: intent of navigation through clicking a button**
- [ ] FREQ-03-004: The “Detail Screen” must convey all the information of the object using appropriate visualization widgets.
- [ ] FREQ-03-005: The “Detail Screen” must allow the user to share this content with other users via the “Share Screen”. **ASSUMPTION: intent of sharing through clicking a button**
- [ ] FREQ-03-006: The app must send an appropriate URL that, when opened, drives the user to the appropriate screen. **ASSUMPTION: send the appropriate link to the webservice**
- [ ] FREQ-03-007: The “Detail Screen” must allow the user to vote on a particular answer via the use of a button.
- [ ] FREQ-03-008: (Vote Button) should trigger an appropriate call to the API endpoint devoted to updating Questions **NOTE: Reflect this on Frontend aswell**
- [ ] FREQ-04-001: This screen must allow the users to share this content with others via email. 
- [ ] FREQ-05-001: The app must monitor connectivity with the Internet and show an appropriate screen whenever the connection is lost. 
- [ ] FREQ-05-002: This screen should remain visible as long as the device has no connection to the Internet. When a connection is regained then the user should be at the state where it was before.

## Live Demo

Base URL: https://jtiagodev.github.io/followmybliss/#/
Sample Route: https://jtiagodev.github.io/followmybliss/#/questions?question_id=QUESTION_ID