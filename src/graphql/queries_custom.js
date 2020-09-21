export const getReview = /* GraphQL */ `
  query GetReview($id: ID!) {
    getReview(id: $id) {
      id
      user {
        id
        nickname
        profileImage {
          identityID
          key
        }
      }
      book {
        authors
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
          user {
            id
            nickname
          }
        }
        nextToken
      }
      comments {
        items {
          id
          user {
            id
            nickname
            profileImage {
              identityID
              key
            }
          }
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
        user {
          id
          nickname
          profileImage {
            identityID
            key
          }
        }
        book {
          authors
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
            user {
              id
              nickname
            }
          }
          nextToken
        }
        comments {
          items {
            id
            user {
              id
              nickname
              profileImage {
                identityID
                key
              }
            }
            content
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
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
        user {
          id
          nickname
          profileImage {
            identityID
            key
          }
        }
        book {
          authors
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
            user {
              id
              nickname
            }
          }
          nextToken
        }
        comments {
          items {
            id
            user {
              id
              nickname
              profileImage {
                identityID
                key
              }
            }
            content
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
