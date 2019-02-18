





/*
function addTaskToDom(t) {
  const ul = document.getElementById("task-list")
  const li = document.createElement("li")
  const a = document.createElement("a")
  li.setAttribute("id", t.id)
  a.setAttribute("href", "#")

  // Two ways to assigning event listner
  //a.setAttribute("onclick","toggle_task('" + t.id + "')")
  a.addEventListener("click", () => toggle_task(t.id))

  const item = document.createTextNode(t.name)

  a.appendChild(item)
  li.appendChild(a)
  ul.appendChild(li)

  a.style.textDecoration = (t.done) && "line-through"
  const rmvBtn = document.createElement("button")
  const btnText = document.createTextNode("x")
  rmvBtn.appendChild(btnText)
  rmvBtn.setAttribute("onclick", "deleteTask('" + t.id + "')")
  li.appendChild(rmvBtn)
}

function addMovieToDom(m) {
  const ul = document.getElementById("movie-list")
  const li = document.createElement("li")
  const a = document.createElement("a")
  li.setAttribute("id", m.id)
  a.setAttribute("href", "#")

  // Two ways to assigning event listner
  //a.setAttribute("onclick","toggle_movie('" + m.id + "')")
  a.addEventListener("click", () => toggle_movie(m.id))

  const item = document.createTextNode(m.name)
  a.appendChild(item)
  li.appendChild(a)
  ul.appendChild(li)

  a.style.textDecoration = (m.done) && "line-through"

  const rmvBtn = document.createElement("button")
  const btnText = document.createTextNode("x")
  rmvBtn.appendChild(btnText)
  rmvBtn.setAttribute("onclick", "deleteMovie('" + m.id + "')")
  li.appendChild(rmvBtn)

}
*/