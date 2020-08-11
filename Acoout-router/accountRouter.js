const express = require('express');

// database access using knex
const db = require('../data/dbConfig.js'); // db is the connection to the database

const router = express.Router();

router.get('/', (req, res) => {
    // respond with a list of posts fir the database
    db.select('*')
        .from('accounts')
        .then(account => {
            res.status(200).json({account});
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err.message})
        });
});

router.get('/:id', (req, res) => {
    const{id} = req.params
    db.select('*')
        .from('accounts')
        .where({ id })
        .first()
        .then(account=>{
            if(account){
                res.status(200).json(account)
            }else{
                res.status(400).json({ message: "can not found Id"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "Can not process get request"})
        })
});

router.post('/', (req, res) => {
    const account = req.body;
    db('accounts')
        .insert(account)
        .returning("id")
        .then(ids => {
            if(ids){
                res.status(201).json({account});
            }else if (!account.name){
                res.status(404).json({message: "Need to improve account name "})
            }  
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err.message})
        });
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    const accountId = req.params.id;
    // where id = id
    db('accounts')
    .where({id: accountId})
    .update(changes)
    .then( count => {
        if(count){
            res.status(200).json({message: 'upddated sucessfully'});
        }else {
            res.status(404).json({message: 'Id not found'});
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err.message})
    })

});

router.delete('/:id', (req, res) => {
    const remove = req.body;
    const accountId = req.params.id;
    db('accounts')
    .where({id: accountId})
    .del()
    .then( count => {
        if(count){
            res.status(201).json({message: "Successful delete accout"})
        }else{
            res.status(400).json({message: " Can not found Id"})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "Processing error"})
    })
});

module.exports = router;