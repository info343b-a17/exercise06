//problem config
const JS_FILE_PATH = 'problemB/js/index.js';

//my custom matchers
const styleMatchers = require('../lib/style-matchers.js');
expect.extend(styleMatchers);

/** Begin tests **/

describe('Source code is valid', () => {
  test('JavaScript lints without errors', async () => {
    expect([JS_FILE_PATH]).toHaveNoEsLintErrors({
      rules:{
        'prefer-arrow-callback': ['error'] //requires arrow functions!
      }
    });
  })
});

describe('The class-based to-do list', () => { 
    let solution; //define at global scope for unit testing functions
    
    beforeAll(() => { 
      //The DOM to work with
      document.documentElement.innerHTML = '<div id="app">';
    
      //load JavaScript libraries separately, just in case they used it
      $ = require('jquery'); //jQuery for convenience
      solution = require('../'+JS_FILE_PATH); //actually load the JavaScript file!    
    });

    describe('Task class', () => {
      let sampleTask, sampleIncomplete, task$;

      test('has correct attributes', () => {
        sampleTask = new solution.Task('sampleTask', true);
        sampleIncomplete = new solution.Task('sampleIncomplete', false);        

        expect(sampleTask.description).toEqual('sampleTask');
        expect(sampleTask.complete).toBeTruthy();
        expect(sampleIncomplete.complete).toBeFalsy();
      })

      test('renders correctly', () => {
        task$ = $(sampleTask.render()); //render as element
        expect(task$.is('li')); //right type        
        expect(task$.text()).toEqual('sampleTask');
        expect(task$.hasClass('font-strike')).toBe(true);
        expect($(sampleIncomplete).hasClass('font-strike')).toBe(false);
      })

      test('can toggle finished', () => {
        sampleTask.toggleFinished();
        expect(sampleTask.complete).toBe(false); //changes with direct input
        sampleTask.toggleFinished(); //swap back for next test
        expect(sampleTask.complete).toBe(true); //changes with direct input
        
        task$.click(); //click DOM
        expect(sampleTask.complete).toBe(false); //should be false now (not done)
        expect(task$.hasClass('font-strike')).toBe(false);
      })
    });

    describe('TaskList class', () => {
      let sampleTaskList;

      test('has correct attributes', () => {
        sampleTaskList = new solution.TaskList([ //instantiate with test tasks
          new solution.Task('sampleTask', true),
          new solution.Task('sampleSecond', false)
        ])

        expect(sampleTaskList.tasks.length).toBe(2); //has 2 items
        expect(sampleTaskList.tasks[0] instanceof solution.Task).toBe(true); //first is a Task
      })

      test('can add a new task', () => {
        sampleTaskList.addTask('new task');
        expect(sampleTaskList.tasks.length).toBe(3);
        expect(sampleTaskList.tasks[2] instanceof solution.Task).toBe(true); //new item is a task
        expect(sampleTaskList.tasks[2].description).toEqual('new task'); //what we added
        expect(sampleTaskList.tasks[2].complete).toBeFalsy(); //what we added
        expect(sampleTaskList.tasks[0].description).toEqual('sampleTask'); //didn't change old
      })

      test('renders correctly', () => {
        let taskList$ = $(sampleTaskList.render()); //render as element
        expect(taskList$.is('ol')); //right type
        expect(taskList$.children('li').length).toBe(3); //has kids
        expect(taskList$.children('li:first').text()).toEqual('sampleTask'); //and they are right
      })
    })

    describe('AddTaskForm class', () => {
      let sampleForm;

      test('renders correctly', () => {
        sampleForm = new solution.AddTaskForm();
        let form$ = $(sampleForm.render());
        expect(form$.is('form'));

        expect(form$.children('input').length).toBe(1);
        expect(form$.children('input').attr('placeholder')).toEqual("What else do you have to do?");

        expect(form$.children('button').length).toBeGreaterThanOrEqual(1); //just in case
        expect(form$.children('button').text()).toEqual('Add task to list');
      })

      test('executes give callback function on submit', () => {
        const callback = jest.fn((d) => d); //mock

        sampleForm = new solution.AddTaskForm(callback); //make version with callback
        expect(sampleForm.submitCallback).toBe(callback); //handles constructor

        let form$ = $(sampleForm.render());
        form$.children('input').val('test input');
        form$.children('button').click(); //click the button
        expect(callback).toHaveBeenCalledWith('test input'); //callback executed with typed value
      });
    })

    describe('App class', () => {
      let sampleApp, container;

      test('renders correctly', () => {
        let sampleTaskList = new solution.TaskList([ //instantiate with test tasks
          new solution.Task('sampleTask', true),
          new solution.Task('sampleSecond', false)
        ]);

        container = document.createElement('div');
        sampleApp = new solution.App(container, sampleTaskList);
        sampleApp.render(); //and render!

        expect($(container).find('ol').length).toBe(1); //contains list
        expect($(container).find('li').length).toBe(2); //contains items
        expect($(container).find('form').length).toBe(1); //contains form
      })
 
      test('is rendered on the web page', () => {
        let domApp = $('#app')
        expect(domApp.find('ol').length).toBe(1);
        expect(domApp.find('form').length).toBe(1);
      })
 
      test('can add a new Tasks directly', () => {
        sampleApp.addTaskToList('app added task');
        expect(sampleApp.taskList.tasks.length).toBe(3);
        expect(sampleApp.taskList.tasks[2].description).toEqual('app added task');
        
        expect($(container).find('li').length).toBe(3); //rerenders
      });

      test('can add new Tasks through the form', () => {
        $('input').val('form-added task');
        $('button').click(); //submit
        expect($('#app li').length).toBe(3); //now has 3 items
        expect($('#app li:last').text()).toEqual('form-added task');
      });      
    })
});
