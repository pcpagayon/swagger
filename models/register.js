import { async } from "rxjs/internal/scheduler/async";

export async function insert(pg, name, address, password) {
    return pg.rows(
        'INSERT INTO users(name, address, password) VALUES($1, $2, $3) RETURNING id',
        name, address, password
    )
}

export async function retrieve(pg, id) {
    return pg.rows(
        'SELECT id, name, address, password FROM users WHERE id = $1',
        id
    )
}

export async function retrieveAll(pg) {
    return pg.rows(
        `SELECT id, name, address, password FROM users`
    )
}

export async function update(pg, name, address, password, id){
    return pg.rows(
        'UPDATE users SET name = $1, address$1, password$1 WHERE id = $1', id,
        name, address, password
    )
}