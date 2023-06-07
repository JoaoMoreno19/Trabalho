const prisma = require("./prisma"); 

const findUserByEmail = (email) => {
    return Prisma.user.findUnique({ 
        where: email, 
    });
};

const saveUser = (user) => { 
    return prisma.user.create({
        data: user,
    })
}

module.exports = { 
    findUserByEmail,
    saveUser,
};