const Userdb = require('../model/model');

// create and save new user
exports.create = (req, res) => {
    //  validate request
    if(!req.body){
        return res.status(400).send({message: 'Content can not be empty!'});
     };

    // new user
    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status,
    })

    //  save user in the db
    user
        .save()
        .then((data) => {
            res.redirect('/add-user')
        })
        .catch((err)=>{
            res.status(500).send({
                message:
                err.message ||
                "Some error occured while creating a create operation"
            });
        });
};

// retrieve and return all user/retrive and return a single user
// Retrieve all users or a single user
exports.find = (req, res) => {
    if (req.query.id) {
      // If the request query parameter 'id' is present, retrieve a single user by ID
      const id = req.query.id;
      Userdb.findById(id)
        .then(user => {
          if (!user) {
            res.status(404).send({ message: 'User not found' });
          } else {
            res.send(user);
          }
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || 'Error occurred while retrieving user'
          });
        });
    } else {
      // If the request query parameter 'id' is not present, retrieve all users
      Userdb.find()
        .then(users => {
          res.send(users);
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || 'Error occurred while retrieving users'
          });
        });
    }
  };
  
//  update a new identified user by user id 
exports.update = (req, res) => {
    const id = req.params.id;
    const updates = req.body;
  
    Userdb.findByIdAndUpdate(id, updates, { new: true })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: `User not found with ID ${id}`,
          });
        }
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            `Error updating user with ID ${id}`,
        });
      });
  };

//  delete a user with specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: `User not found with ID ${id}`,
        });
      }
      res.send({
        message: 'User deleted successfully!',
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error deleting user with ID ${id}`,
      });
    });
};

