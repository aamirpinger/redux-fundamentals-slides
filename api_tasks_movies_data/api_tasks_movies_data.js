(function () {
    window.API = {}
  
    function fail () {
      return Math.floor(Math.random()*(5-1)) === 3
    }
  
    function generateId () {
        return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
    }
  
    var movies = [
      {
        id: generateId(),
        name: 'God Father',
        done: false
      },
      {
        id: generateId(),
        name: 'Changing Lanes',
        done: true
      },
      {
        id: generateId(),
        name: 'Johnny English - Strikes Again',
        done: true
      },
    ];
    var tasks = [
      {
        id: generateId(),
        name: 'Car Service',
        complete: true,
      },
      {
        id: generateId(),
        name: 'Finalizing Presentation',
        complete: false,
      },
      {
        id: generateId(),
        name: 'Morning walk',
        complete: false,
      }
    ];
  
    API.fetchMovies = function () {
      return new Promise((res, rej) => {
        setTimeout(function () {
          res(movies)
        }, 2000)
      })
    }
  
    API.fetchTasks = function () {
      return new Promise((res, rej) => {
        setTimeout(function () {
          res(tasks)
        }, 2000)
      })
    }
  
    API.saveTodo = function (name) {
      return new Promise((res, rej) => {
        setTimeout(() => {
          const todo = {
            id: generateId(),
            name: name,
            complete: false,
          }
          tasks = tasks.concat([todo]);
          fail() ? rej(todo) : res(todo);
        }, 300)
      })
    }
  
    API.saveGoal = function (name) {
      return new Promise((res, rej) => {
        setTimeout(() => {
          const goal = {
            id: generateId(),
            name: name,
          }
          movies = movies.concat([goal]);
          fail() ? rej(goal) : res(goal);
        }, 300)
      })
    }
  
    API.deleteGoal = function (id) {
      return new Promise((res, rej) => {
        setTimeout(() => {
          movies = movies.filter((goal) => goal.id !== id);
          fail() ? rej(): res(movies);
        }, 300)
      });
    }
  
    API.deleteTodo = function (id) {
      return new Promise((res, rej) => {
        setTimeout(() => {
          tasks = tasks.filter((todo) => todo.id !== id);
          fail() ? rej(): res(tasks);
        }, 300)
      });
    }
  
    API.saveTodoToggle = function (id) {
      return new Promise((res, rej) => {
        setTimeout(() => {
          tasks = tasks.map((todo) => todo.id !== id ? todo :
            Object.assign({}, todo, {complete: !todo.complete})
          );
  
          fail() ? rej(): res(tasks);
        }, 300)
      });
    }
  })()