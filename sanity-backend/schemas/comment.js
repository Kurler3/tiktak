// IN SANITY EACH FIELD IN THE SCHEMA WILL BE AN OBJECT

export default {
    // SCHEMA NAME
    name: "comment",
    // SCHEMA TITLE
    title: 'Comment',
    // SCHEMA TYPE
    type: 'document',
    fields: [
        // POSTED BY
        {   
            name: 'postedBy',
            title: 'Posted By',
            // CUSTOM TYPE
            type: 'postedBy',
        },
        // COMMENT
        {
            name: 'comment',
            title: 'Comment',
            type: 'string',
        },
    ]
};