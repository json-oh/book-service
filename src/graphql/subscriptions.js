/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      reviewID
      userID
      user {
        id
        nickname
        profileImage {
          identityID
          key
        }
        followers {
          nextToken
        }
        followings {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      reviewID
      userID
      user {
        id
        nickname
        profileImage {
          identityID
          key
        }
        followers {
          nextToken
        }
        followings {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      reviewID
      userID
      user {
        id
        nickname
        profileImage {
          identityID
          key
        }
        followers {
          nextToken
        }
        followings {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLike = /* GraphQL */ `
  subscription OnCreateLike {
    onCreateLike {
      reviewID
      userID
      user {
        id
        nickname
        profileImage {
          identityID
          key
        }
        followers {
          nextToken
        }
        followings {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLike = /* GraphQL */ `
  subscription OnUpdateLike {
    onUpdateLike {
      reviewID
      userID
      user {
        id
        nickname
        profileImage {
          identityID
          key
        }
        followers {
          nextToken
        }
        followings {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLike = /* GraphQL */ `
  subscription OnDeleteLike {
    onDeleteLike {
      reviewID
      userID
      user {
        id
        nickname
        profileImage {
          identityID
          key
        }
        followers {
          nextToken
        }
        followings {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateReview = /* GraphQL */ `
  subscription OnCreateReview {
    onCreateReview {
      id
      userID
      user {
        id
        nickname
        profileImage {
          identityID
          key
        }
        followers {
          nextToken
        }
        followings {
          nextToken
        }
        createdAt
        updatedAt
      }
      book {
        authors
        categories
        description
        id
        language
        list_price
        page_count
        published_date
        publisher
        retail_price
        thumbnail_link
        title
      }
      image {
        identityID
        key
      }
      content
      likes {
        items {
          reviewID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      comments {
        items {
          id
          reviewID
          userID
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateReview = /* GraphQL */ `
  subscription OnUpdateReview {
    onUpdateReview {
      id
      userID
      user {
        id
        nickname
        profileImage {
          identityID
          key
        }
        followers {
          nextToken
        }
        followings {
          nextToken
        }
        createdAt
        updatedAt
      }
      book {
        authors
        categories
        description
        id
        language
        list_price
        page_count
        published_date
        publisher
        retail_price
        thumbnail_link
        title
      }
      image {
        identityID
        key
      }
      content
      likes {
        items {
          reviewID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      comments {
        items {
          id
          reviewID
          userID
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteReview = /* GraphQL */ `
  subscription OnDeleteReview {
    onDeleteReview {
      id
      userID
      user {
        id
        nickname
        profileImage {
          identityID
          key
        }
        followers {
          nextToken
        }
        followings {
          nextToken
        }
        createdAt
        updatedAt
      }
      book {
        authors
        categories
        description
        id
        language
        list_price
        page_count
        published_date
        publisher
        retail_price
        thumbnail_link
        title
      }
      image {
        identityID
        key
      }
      content
      likes {
        items {
          reviewID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      comments {
        items {
          id
          reviewID
          userID
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      nickname
      profileImage {
        identityID
        key
      }
      followers {
        items {
          followerID
          followingID
          createdAt
          updatedAt
        }
        nextToken
      }
      followings {
        items {
          followerID
          followingID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      nickname
      profileImage {
        identityID
        key
      }
      followers {
        items {
          followerID
          followingID
          createdAt
          updatedAt
        }
        nextToken
      }
      followings {
        items {
          followerID
          followingID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      nickname
      profileImage {
        identityID
        key
      }
      followers {
        items {
          followerID
          followingID
          createdAt
          updatedAt
        }
        nextToken
      }
      followings {
        items {
          followerID
          followingID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateFriend = /* GraphQL */ `
  subscription OnCreateFriend {
    onCreateFriend {
      followerID
      followingID
      follower {
        id
        nickname
        profileImage {
          identityID
          key
        }
        followers {
          nextToken
        }
        followings {
          nextToken
        }
        createdAt
        updatedAt
      }
      following {
        id
        nickname
        profileImage {
          identityID
          key
        }
        followers {
          nextToken
        }
        followings {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFriend = /* GraphQL */ `
  subscription OnUpdateFriend {
    onUpdateFriend {
      followerID
      followingID
      follower {
        id
        nickname
        profileImage {
          identityID
          key
        }
        followers {
          nextToken
        }
        followings {
          nextToken
        }
        createdAt
        updatedAt
      }
      following {
        id
        nickname
        profileImage {
          identityID
          key
        }
        followers {
          nextToken
        }
        followings {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFriend = /* GraphQL */ `
  subscription OnDeleteFriend {
    onDeleteFriend {
      followerID
      followingID
      follower {
        id
        nickname
        profileImage {
          identityID
          key
        }
        followers {
          nextToken
        }
        followings {
          nextToken
        }
        createdAt
        updatedAt
      }
      following {
        id
        nickname
        profileImage {
          identityID
          key
        }
        followers {
          nextToken
        }
        followings {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
