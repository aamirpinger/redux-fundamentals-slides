(function () {
    API = {}
  
    function fail () {
      return Math.floor(Math.random()*4) === 3
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
        done: true,
      },
      {
        id: generateId(),
        name: 'Finalize Presentation',
        done: false,
      },
      {
        id: generateId(),
        name: 'Morning walk',
        done: false,
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
  
    API.saveTask = function (name) {
      return new Promise((res, rej) => {
        setTimeout(() => {
          const task = {
            id: generateId(),
            name: name,
            done: false,
          }
          tasks = tasks.concat([task]);
          fail() ? rej(task) : res(task);
        }, 300)
      })
    }
  
    API.saveMovie = function (name) {
      return new Promise((res, rej) => {
        setTimeout(() => {
          const movie = {
            id: generateId(),
            name: name,
            done: false
          }
          movies = movies.concat([movie]);
          fail() ? rej(movie) : res(movie);
        }, 300)
      })
    }
  
    API.deleteMovie = function (id) {
      return new Promise((res, rej) => {
        setTimeout(() => {
          movies = movies.filter((movie) => movie.id !== id);
          fail() ? rej(): res(movies);
        }, 300)
      });
    }
  
    API.deleteTask = function (id) {
      return new Promise((res, rej) => {
        setTimeout(() => {
          tasks = tasks.filter((task) => task.id !== id);
          fail() ? rej(): res(tasks);
        }, 300)
      });
    }
  
    API.toggleTask = function (id) {
      return new Promise((res, rej) => {
        setTimeout(() => {
          tasks = tasks.map((task) => task.id !== id ? task :
            Object.assign({}, task, {done: !task.done})
          );
  
          fail() ? rej(): res(tasks);
        }, 300)
      });
    }

    API.toggleMovie = function (id) {
      return new Promise((res, rej) => {
        setTimeout(() => {
          movies = movies.map((movie) => movie.id !== id ? movie :
            Object.assign({}, movie, {done: !movie.done})
          );
  
          fail() ? rej(): res(movies);
        }, 300)
      });
    }
  })()
