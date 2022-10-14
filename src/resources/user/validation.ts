import joi from 'joi';

 const create = joi.object({
    email : joi.string().email().required(),
    password : joi.string().required(),
    name: joi.string().required(),
    role: joi.string().required(),

});

const update = joi.object({
    email : joi.string().email().required(),
    password : joi.string().required(),
    name: joi.string().required(),
    role: joi.string().required(),
});

const login = joi.object({
    email : joi.string().required(),
    password : joi.string().required()
})

export default { create, update, login };