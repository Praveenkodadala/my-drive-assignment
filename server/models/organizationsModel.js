const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Organization = new Schema({
    orgName: {
        type: String,
        required: true
    },
    orgLogo: {
        type: String
    },
    orgLogoKey: {
        type: String
    },
    orgHqAddress: {
        type: String,
        required: true
    },
    orgHqCity: {
        type: String,
        required: true
    },
    orgHqState: {
        type: String,
        required: true
    },
    orgHqCountry: {
        type: String,
        required: true
    },
    orgHqZip: {
        type: String,
        required: true
    },
    orgTelephone: {
        type: String,
        required: true
    },
    orgEmail: {
        type: String,
        required: true
    },
    orgWebSite: {
        type: String,
        required: true
    },
    orgType: { type: String }, // subscriber, customer organizations
    orgTypeId: [{
        type: Schema.Types.ObjectId, ref: 'organizationTypes'
    }],
    products: [{ type: String }], //dummy column for keep data in this key
    productLimit:{
        type: Number,    //the limit for the number of products for a subscriber org
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    customerOrgs: [
        { type: Schema.Types.ObjectId, ref: 'organizations' },
    ],
    parentOrg: { type: Schema.Types.ObjectId, ref: 'organizations' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'users' },
    createdOn: { type: Date, default: Date.now },
    log: [{
        updatedBy: { type: Schema.Types.ObjectId, ref: 'users' },
        updatedOn: { type: Date, default: Date.now }
    }],
    docExpireNotificationBefore1: { type: Number },
    docExpireNotificationBefore2: { type: Number },
    status: { type: Boolean }
});

module.exports = mongoose.model("organizations", Organization);
