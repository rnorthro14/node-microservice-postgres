/**
 * In a production environment, you would want to put your 
 * configuration details in a separate file with restrictive
 * permissions that is not accessible from version control.
 */


// Creates a pool of connections to avoid opening a new client for each query
const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'user_admin',
  host: 'localhost',
  database: 'users_api',
  password: 'password',
  port: 5433,
});

// gets all users
const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
          console.log('ERROR message ' + error)
        throw error;
      }
      response.status(200).json(results.rows);
    })
  };

  // gets single user by id
  const getUserById = (request, response) => {
    const id = parseInt(request.params.id);
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    })
};

// creates a new user
const createUser = (request, response) => {
    const { name, email } = request.body;
  
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${result.insertId}`);
    })
  };

// updates a user by id
const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).send(`User modified with ID: ${id}`);
      }
    )
  };

  // deletes user by id
  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    });
  }

  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }