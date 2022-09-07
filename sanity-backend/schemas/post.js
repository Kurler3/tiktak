export default {
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        // CAPTION
      {
        name: 'caption',
        title: 'Caption',
        type: 'string',
      },
    //   VIDEO 
      {
        name: 'video',
        title: 'Video',
        type: 'file',
        options: {
          hotspot: true,
        },
      },
    //   CREATED BY 
      {
        name: 'userId',
        title: 'UserId',
        type: 'string',
      },
    //   POSTED BY REFERENCE
      {
        name: 'postedBy',
        title: 'PostedBy',
        type: 'postedBy',
      },
    //   ARRAY OF REFERENCES TO USERS
      {
        name: 'likes',
        title: 'Likes',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [{ type: 'user' }],
          },
        ],
      },
    //   ARRAY OF COMMENTS
      {
        name: 'comments',
        title: 'Comments',
        type: 'array',
        of: [{ type: 'comment' }],
      },
    //   TOPIC
      {
        name: 'topic',
        title: 'Topic',
        type: 'string',
      },
    ],
  };