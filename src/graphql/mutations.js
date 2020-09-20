/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
      content
      createdAt
      updatedAt
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
      content
      createdAt
      updatedAt
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
      content
      createdAt
      updatedAt
    }
  }
`;
export const createLike = /* GraphQL */ `
  mutation CreateLike(
    $input: CreateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    createLike(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
    }
  }
`;
export const updateLike = /* GraphQL */ `
  mutation UpdateLike(
    $input: UpdateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    updateLike(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
    }
  }
`;
export const deleteLike = /* GraphQL */ `
  mutation DeleteLike(
    $input: DeleteLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    deleteLike(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
    }
  }
`;
export const createReview = /* GraphQL */ `
  mutation CreateReview(
    $input: CreateReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    createReview(input: $input, condition: $condition) {
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
          user {
            id
            nickname
            createdAt
            updatedAt
          }
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
          user {
            id
            nickname
            createdAt
            updatedAt
          }
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      dummy
      updatedAt
    }
  }
`;
export const updateReview = /* GraphQL */ `
  mutation UpdateReview(
    $input: UpdateReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    updateReview(input: $input, condition: $condition) {
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
          user {
            id
            nickname
            createdAt
            updatedAt
          }
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
          user {
            id
            nickname
            createdAt
            updatedAt
          }
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      dummy
      updatedAt
    }
  }
`;
export const deleteReview = /* GraphQL */ `
  mutation DeleteReview(
    $input: DeleteReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    deleteReview(input: $input, condition: $condition) {
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
          user {
            id
            nickname
            createdAt
            updatedAt
          }
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
          user {
            id
            nickname
            createdAt
            updatedAt
          }
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      dummy
      updatedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
          follower {
            id
            nickname
            createdAt
            updatedAt
          }
          following {
            id
            nickname
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      followings {
        items {
          followerID
          followingID
          follower {
            id
            nickname
            createdAt
            updatedAt
          }
          following {
            id
            nickname
            createdAt
            updatedAt
          }
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
          follower {
            id
            nickname
            createdAt
            updatedAt
          }
          following {
            id
            nickname
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      followings {
        items {
          followerID
          followingID
          follower {
            id
            nickname
            createdAt
            updatedAt
          }
          following {
            id
            nickname
            createdAt
            updatedAt
          }
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
          follower {
            id
            nickname
            createdAt
            updatedAt
          }
          following {
            id
            nickname
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      followings {
        items {
          followerID
          followingID
          follower {
            id
            nickname
            createdAt
            updatedAt
          }
          following {
            id
            nickname
            createdAt
            updatedAt
          }
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
export const createFriend = /* GraphQL */ `
  mutation CreateFriend(
    $input: CreateFriendInput!
    $condition: ModelFriendConditionInput
  ) {
    createFriend(input: $input, condition: $condition) {
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
      following {
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
      createdAt
      updatedAt
    }
  }
`;
export const updateFriend = /* GraphQL */ `
  mutation UpdateFriend(
    $input: UpdateFriendInput!
    $condition: ModelFriendConditionInput
  ) {
    updateFriend(input: $input, condition: $condition) {
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
      following {
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
      createdAt
      updatedAt
    }
  }
`;
export const deleteFriend = /* GraphQL */ `
  mutation DeleteFriend(
    $input: DeleteFriendInput!
    $condition: ModelFriendConditionInput
  ) {
    deleteFriend(input: $input, condition: $condition) {
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
      following {
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
      createdAt
      updatedAt
    }
  }
`;
