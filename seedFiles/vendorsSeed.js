const mongoose = require('mongoose');
const Vendor = require('../models/vendor');

mongoose.connect('mongodb+srv://brijesh:G5rSBQ5vkSH1mV3N@cluster0.ozbvkso.mongodb.net/invoiceDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

    const seedVendors = [
        {
            name: 'Ivory1',
            email: 'nigam0@gmail.com',
            phoneNumber: '9911229919',
            additionalPhoneNumber: '8299277394',
            gstNumber: 'S487SFLIVPCMV462FA10LKC',
            address: '11/39 Satyamev Eminence,Science City Road,Ahemdabad',
        },
        {
            name: 'Ivory2',
            email: 'nigam1@gmail.com',
            phoneNumber: '9911229919',
            additionalPhoneNumber: '8299277394',
            gstNumber: 'S487SFLIVPCMV462FA10LKC',
            address: '11/39 Satyamev Eminence,Science City Road,Ahemdabad',
        },
        {
            name: 'Ivory3',
            email: 'nigam2@gmail.com',
            phoneNumber: '9911229919',
            additionalPhoneNumber: '8299277394',
            gstNumber: 'S487SFLIVPCMV462FA10LKC',
            address: '11/39 Satyamev Eminence,Science City Road,Ahemdabad',
        },
        
    ]

Vendor.insertMany(seedVendors)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })