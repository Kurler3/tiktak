export interface GoogleDecodedToken {
    name: string;
    picture: string;
    // UNIQUE ID
    sub: string;
}

export interface IPostedBy {
    _id: string;
    userName: string;
    _type: string;
    image: string;
}

// USER
export interface IUser {
    image: string;
    userName: string;
    _id: string;
    _type: string;
}

// COMMENT
export interface Comment {
    comment: string;
    _key: string;
    postedBy: {
      _ref: string;
    }
}

// VIDEO 
export interface Video {
    _id: string;
    caption: string;
    video: {
        asset: {
            _id: string;
            url: string;
        };
    };
    postedBy: IPostedBy;
    likes: {
        postedBy: IPostedBy;
    }[];
    comments?: comment[];
    userId: string;
}