import { MongoClient } from "mongodb";
import { uri } from "./db.config.js"

const client = new MongoClient(uri);
const database = client.db('sample_mflix');
const txs = database.collection('user-transaction');

export const getTransaction = async (req, res) => {
    const { status } = req.query || {};
    const options = {
        sort: { "date": 1 },
    };
    const query = {
        $or: []
    }
    if(status){
        status.split(',').forEach(eachStatus => {
            query['$or'].push({status: eachStatus.toUpperCase()})
        })
    }
    
    const tx = await txs.find(query, options).toArray();
    res.json(tx);
}

export const getTransactionById = async (req, res) => {
    const { id } = req.query || {};

    const query = {id};
    
    const tx = await txs.findOne(query);
    res.json(tx);
}

