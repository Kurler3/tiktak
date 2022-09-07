// IN SANITY EACH FIELD IN THE SCHEMA WILL BE AN OBJECT
export default {
    // SCHEMA NAME
    name: "user",
    // SCHEMA TITLE
    title: 'User',
    // SCHEMA TYPE
    type: 'document',
    fields: [
        // USERNAME
        {   
            name: 'userName',
            title: 'User Name',
            type: 'string',
        },
        // PROFILE IMAGE
        {
            name: 'image',
            title: 'Image',
            type: 'string',
        },
    ]
};