# Problem B

In this exercise, you will practice using ES6 `class` syntax and _arrow functions_ to re-implement the Task List application from the previous exercise using a _component_-based architecture.

To complete the exercise, follow the instructions below to edit the **`js/index.js`** file and add in the required code. Note that you should ___not___ edit the HTML file!

You can see the results of your work by opening up the included `index.html` file in a browser. Remember to refresh the page after you update your code, and to check for any errors in the Developer console. (_Warning_: because you're using ES6 syntax, this exercise will not work in Internet Explorer or other older browsers).

1. Define a class **`Task`** that represents a single task in a to-do list. Include:

    - a constructor that takes as a parameter a string description of the task. The constructor should initialize a **`description`** attribute for the task's description and a **`complete`** attribute for whether the task is finished.
  
    - a **`render()`** method that _returns_ a DOM element representing the object. This element should be a `<li>` whose content is the `description` of the `Task`, and has the `font-strike` CSS class to cross it out if `complete`.

    You can test your class by _temporarily_ instantiating it (with the `new` keyword, passing it a description string) and calling its `render()` method, then appending the returned element to the DOM (e.g., to `#app`).

2. Modify the `Task` class to give it the ability to "cross off" a task. Add a **`toggleFinished()`** method that "toggles" the object's `complete` attribute  (from false to true and vice versa).

    Then modify the Task's `render()` method to add a click listener to the `<li>`. When the element is clicked, call the `toggleFinished()` method and also toggle the `font-strike` class on the element. _Note_: use an arrow function for the anonymous callback function!

    (`toggleFinished()` is kept separate so that other classes can modify this object, but the render method still needs to handle the appearance change).

    You can test your modification by clicking on the rendered Task.

3. Define a class **`TaskList`** that represents a list of Tasks. Include:

    - a constructor that takes in an array of `Task` objects and uses that to initialize an attribute **`tasks`**.
    
    - an **`addTask()`** method that takes in a _string_ description of a task, and uses that to instantiate a new `Task` object which is added to the list. 

    - a **`render()`** method that _returns_ an `<ol>` DOM element containing a rendering of each `Task` in the list.

    You can test your class by _temporarily_ instantiating it (with the `new` keyword, passing it an array of `Task` objects) and calling its `render()` method, then appending the returned element to the DOM (e.g., to `#app).

4. Define a class **`AddTaskForm`** that represents a form for adding tasks to the list. Your class should include a **`render()`** method that returns a `<form>` DOM element. The `<form>` should include as children:

    - an `<input>` element with classes `form-control` and `mb-3`. The input should have a `placeholder` attribute of `"What else do you have to do?"` (use the `setAttribute()` method, since the `placeholder` attribute isn't build into the DOM spec!)

    - a `<button>` element with classes `btn` and `btn-primary`. The button should read `"Add task to list"`.

    Again, you can test your class by instantiating it and appending it to the DOM.

5. Define a class **`App`** that will represent the entire application. Include:

    - an attribute **`parentElement`** representing the DOM element containing this app, and an attribute **`taskList`** representing the `TaskList` to render. Both attributes should be passed in as constructor parameters.

    - a **`render()`** method that adds the rendered `taskList` attribute to the `parentElement`. It should instantiate a new `AddTaskForm` and add that to the `parentElement` as well.

        Optionally, to make the form match the previous exercise, include a subheading:
        `<p class="lead">Things I have to do</p>`

6. Instantiate a new `App` object, passing it the `#app` DOM element as the parent and a new `TaskList` containing two tasks: `"Complete problemA"` (marked as complete), and `"Complete problemB"` (not marked as complete).

    Call the `render()` method on your `App` object to make it appear! This is _not_ temporary, and is your full app being shown.

7. Add the ability for the app to add new tasks to the list (e.g., through the form). Modify the `App` class to give it an additional method **`addTaskToList()`**. This method should take as a parameter a string description of a task, and should call the `taskList` attribute's `addTask()` to add a new task with that description.

    Once a new task is added, this method should clear the contents of the `parentElement` and then call `render()`, allowing the `App` to be "re-rendered" with the new item included.

    (You can test this by _temporarily_ calling `addTaskToList()` on your instantiated `App`)

8. Finally, you need to make it so that the when the form is submitted, it is able to call the `addTaskToList()` method on the `App`. However, the `AddTaskForm` is a **self-contained component**; it has no knowledge of the `App` class that created it. Thus it will need to be _told_ about the `addTaskToList()` method&mdash;since functions are values, you can pass that function as a parameter to the `AddTaskForm`!

    Add a constructor to the `AddTaskForm` class that takes as a parameter a _callback function_ that is the function to execute when the form is submitted. Assign this parameter to a **`submitCallback`** attribute.

    In the form's `render()` method, add a listener to the `<button>` so that when the button is clicked, you call the `submitCallback` attribute as a function, passing it the `value` of the `<input>`.

    - Remember to call `preventDefault()` on the callback's `event` parameter to avoid submitting the form.

    - You will need to use an arrow function so that you have the correct `this` reference!
    
    Since the `AddTaskForm` constructor takes a parameter, you will need to almost modify the `App` class so that you pass it the `addTaskToList` method as a callback when you instantiate the form in the `render()` method. 
    
    - **HOWEVER**, the `addTaskToList()` method needs to be called on the `App` so that it has the correct `this`; when you call the `submitCallback` in the form, it is being called _on the form_. Thus you will need to use another arrow function to "bind" the `App` as the `this` variable to the `addTaskToList()` function: 
    
        Use a _concise_ arrow function to create an anonymous callback function that takes in a string description and calls the `addTaskToList()` method, passing in that description. This anonymous callback function (which has a bound `this`) is what you should pass as a parameter to the `AddTaskForm` constructor.

    If it all goes well, you should now be able to add new tasks to the list by entering them in the form and clicking the button! 


## Testing
This exercise includes a test suite to verify that your classes have the correct attributes and methods. Note that this test is simply to help you verify your results; it will not ensure that your code follows the required syntactical approach.

You can run the test suite using

```bash
jest problemB
```
