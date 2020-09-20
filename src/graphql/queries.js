/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getLike = /* GraphQL */ `
  query GetLike($reviewID: ID!, $userID: ID!) {
    getLike(reviewID: $reviewID, userID: $userID) {
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
export const listLikes = /* GraphQL */ `
  query ListLikes(
    $reviewID: ID
    $userID: ModelIDKeyConditionInput
    $filter: ModelLikeFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listLikes(
      reviewID: $reviewID
      userID: $userID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
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
  }
`;
export const getReview = /* GraphQL */ `
  query GetReview($id: ID!) {
    getReview(id: $id) {
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
      dummy
      updatedAt
    }
  }
`;
export const listReviews = /* GraphQL */ `
  query ListReviews(
    $filter: ModelReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReviews(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        user {
          id
          nickname
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
          nextToken
        }
        comments {
          nextToken
        }
        createdAt
        dummy
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getFriend = /* GraphQL */ `
  query GetFriend($followerID: ID!, $followingID: ID!) {
    getFriend(followerID: $followerID, followingID: $followingID) {
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
export const listFriends = /* GraphQL */ `
  query ListFriends(
    $followerID: ID
    $followingID: ModelIDKeyConditionInput
    $filter: ModelFriendFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listFriends(
      followerID: $followerID
      followingID: $followingID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
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
  }
`;
export const getReviewsOrderByCreatedAt = /* GraphQL */ `
  query GetReviewsOrderByCreatedAt(
    $dummy: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getReviewsOrderByCreatedAt(
      dummy: $dummy
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        user {
          id
          nickname
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
          nextToken
        }
        comments {
          nextToken
        }
        createdAt
        dummy
        updatedAt
      }
      nextToken
    }
  }
`;
export const getReviewsByUser = /* GraphQL */ `
  query GetReviewsByUser(
    $userID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getReviewsByUser(
      userID: $userID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        user {
          id
          nickname
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
          nextToken
        }
        comments {
          nextToken
        }
        createdAt
        dummy
        updatedAt
      }
      nextToken
    }
  }
`;
