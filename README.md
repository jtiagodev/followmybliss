# blissrecruitment app

## Running the application

```
npm install
npm run start
```

NOTE: Requires NodeJS installed (https://nodejs.org/en/)

## Functional Requirements

- [X] FREQ-01-001: loading screen while the server health is checked
- [X] FREQ-01-002: server health is checked via the appropriate endpoint
- [X] FREQ-01-003: server health is OK then the application should proceed to the “List Screen”
- [X] FREQ-01-004: server health is NOT OK then the application should display a “Retry Action” widget
- [X] FREQ-02-001: show the List Screen in two cases: loading screen managed to contact and check the server health **ASSUMPTION: and if server health is OK**
- [X] FREQ-02-002: show the List Screen in two cases: app was opened with an URL with the format http://HOST:PORT/questions?question_filter=FILTER
- [X] FREQ-02-003: query parameter which should be used to fill the search box and trigger the search functionality
- [X] FREQ-02-004: If the question_filter parameter is missing the user should simply be placed at the listing
- [X] FREQ-02-005: If the question_filter parameter is present but has an empty value the user should be placed at the filter variant with no input inserted but with the input box focused.
- [X] FREQ-02-006: front-end application must fetch list data from the appropriate endpoint
- [X] FREQ-02-007: app should fetch 10 records at a time
- [X] FREQ-02-009: There is no sorting functionality. The list will follow the order returned from the API.
- [X] FREQ-02-010: app should start loading 10 additional records if the user shows intent to browse additional records **ASSUMPTION: intent through clicking More Questions button**
- [X] FREQ-02-011: app should present a search box at the top of the list that allows the user to filter the results. **ASSUMPTION: this happens on Search Variant, when question_filter is present**
- [X] FREQ-02-012: Results should be shown on the same screen as a list
- [X] FREQ-02-013: Searching implies hitting the appropriate endpoint and this variation must comply with the 2 requirements defined above.
- [X] FREQ-02-014: If a search result is being shown (empty or not) the user must be allowed to share this with other users via the “Share Screen” **ASSUMPTION: intent of sharing through clicking Share button**
- [X] FREQ-02-015: (Share Feature) app must send an appropriate URL that, when opened, drives the user to the appropriate screen.
- [X] FREQ-02-016: app must present a dismiss button to get out of the Search variant.
- [X] FREQ-02-017: Each list element is selectable and whenever the user selects one record the app must show the “Detail Screen”.
- [X] FREQ-03-001: front-end application must show the detail screen in two cases: A row was selected in “List Screen” **ASSUMPTION: user navigates to URL with question_id parameter present**
- [X] FREQ-03-002: front-end application must show the detail screen in two cases: The application was opened with the detail screen URL from outside the app:
- [X] FREQ-03-003: The “Detail Screen” must allow the user to navigate back to the listing.  **ASSUMPTION: through clicking Back button**
- [X] FREQ-03-004: The “Detail Screen” must convey all the information of the object using appropriate visualization widgets.
- [X] FREQ-03-005: The “Detail Screen” must allow the user to share this content with other users via the “Share Screen”. **ASSUMPTION:through clicking Share button**
- [X] FREQ-03-006: The app must send an appropriate URL that, when opened, drives the user to the appropriate screen.
- [X] FREQ-03-007: The “Detail Screen” must allow the user to vote on a particular answer via the use of a button.
- [X] FREQ-03-008: (Vote Button) should trigger an appropriate call to the API endpoint devoted to updating Questions
- [X] FREQ-04-001: This screen must allow the users to share this content with others via email. **ASSUMPTION: through the share webservice**
- [X] FREQ-05-001: The app must monitor connectivity with the Internet and show an appropriate screen whenever the connection is lost. 
- [X] FREQ-05-002: This screen should remain visible as long as the device has no connection to the Internet. When a connection is regained then the user should be at the state where it was before. CAVEAT: Needs Redux or a withConnectionCheck HOC on every screen to work on every screen

- [X] Added: Not Found URL Screen