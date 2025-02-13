import mongoose, { Mongoose } from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId
const Schema = mongoose.Schema
import {Model} from 'mongoose'



const userSchema = new Schema({
    username: {type: String,required: true,unique: true},
    password: {type: String,required: true}
})

const tagsSchema = new Schema({
    title: {type: String,required: true,unique: true}
})

const contentSchema = new Schema({
    link: {type: String, required:true},
    type: {type:String, required:true},
    title: {type:String, required:true},
    tags: [{type: ObjectId, ref: 'tags'}],
    userId: {type:ObjectId, ref: 'users', required: true},
})

const linkSchema = new Schema({
    hash: {type: String, required:true},
    userId: {type: ObjectId, ref: 'users', required: true}
})


export const User = mongoose.model('users',userSchema)
export const Content = mongoose.model('contents',contentSchema)
export const Tags = mongoose.model('tags',tagsSchema)
export const Link = mongoose.model('links',linkSchema)

