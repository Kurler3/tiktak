export default {
    name: 'postedBy',
    title: 'Posted By',
    // REFERENCE TYPE SCHEMAS CONNECTED 2 DOCUMENTS
    type: 'reference',
    // REFERES TO USERS
    to: [{type: 'user'}]
}