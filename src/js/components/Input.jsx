import React, { useEffect, useState } from "react";

export const Input = () => {
    const [input, setInput] = useState("");
    const [valores, setValores] = useState([]);

    const eliminarValor = async (id) => {
        await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE"
        });

        getLista(); 
    };

    const getLista = async () => {
    const response = await fetch("https://playground.4geeks.com/todo/users/julio");
    if (!response.ok) {
        await crearUser();
        return;
    }
    const data = await response.json();
    setValores(data.todos || []);
};

    const crearUser = async () => {
        const response = await fetch("https://playground.4geeks.com/todo/users/julio", {
            method: "POST"
        });
        const data = await response.json();
        console.log("Usuario creado:", data);
    };
    const crearTarea = async (texto) => {
        const nuevaTarea = {
            label: texto,
            done: false
        };

        await fetch("https://playground.4geeks.com/todo/todos/julio", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevaTarea)
        });

        getLista(); 
    };

    const eliminarTodo = async () => {
    await fetch("https://playground.4geeks.com/todo/users/julio", {
        method: "DELETE"
    });

    setValores([]);
    crearUser();
};

    useEffect(() => {
        getLista();
    }, []);


    return (
        <div className="container mt-5">
            <h1 className="text-center">Lista</h1>
            <ul className="list-group">
                <li className="list-group-item">
                    <input
                        type="text"
                        onChange={(e) => setInput(e.target.value)}
                        className="form-control"
                        placeholder="Introducir Texto"
                        aria-label="Username"
                        aria-describedby="addon-wrapping"
                        value={input}
                        onKeyUp={(e) => {
                            if (e.key === "Enter" && input.trim() !== "") {
                                crearTarea(input);
                                setInput("");
                            }
                        }}
                    />
                </li>

                {valores.length === 0 ? (
                    <li className="list-group-item text-muted text-center">
                        No hay busquedas, añadir busquedas
                    </li>
                ) : (
                    valores.map((t) => (
                        <li key={t.id} className="list-group-item d-flex justify-content-between align-items-center tarea-hover">
                            {t.label}
                            <button
                                className="btn btn-danger btn-sm btn-eliminar"
                                onClick={() => eliminarValor(t.id)}
                            >
                                Eliminar
                            </button>
                        </li>
                    ))
                )}
            </ul>
            <p className="mt-3">Veces buscadas: {valores.length}</p>
            <button className="btn btn-warning mt-3" onClick={eliminarTodo}>
                Limpiar todas las tareas
            </button>
        </div>
    );
};