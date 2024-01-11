// https://learn.microsoft.com/en-us/azure/developer/github/deploy-with-visual-studio

/*
  prevent scrollbar page layout shift
    - write to index.css
*/

/*
  how to handle filters & lists being remembered?
    - write to useProvideGlobally in AppContextProvider.jsx
    - should you change state structure of checklist?
*/

/*
  change state management of checklists
    - could create a hook 
        - which returns an object 
            - where each field points to 
                - a list of all items (array)
                - and then a list of checked items (set)
        - what do you pass to custom hook?
    - don't need to create a custom hook
    - if done so, json result can just return data instead of an object with x number of properties
*/
