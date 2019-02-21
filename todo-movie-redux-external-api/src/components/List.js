import React from 'react'

function List(props) {
    return (
        <ol>
            {props.items.map((rec) => (
                <li key={rec.id}>
                    <a 
                        href="#" 
                        onClick={() => props.toggle(rec.id)}
                        style={{textDecoration : (rec.done) ? "line-through" : "none" }}
                    >
                        {rec.name}
                    </a>
                    <button onClick={() => props.delete(rec)}>
                        x
                    </button>
                </li>
            ))}
        </ol>
    )
}

export default List