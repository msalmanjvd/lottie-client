import { gql } from "@apollo/client";

// all animations query
export const GetUser = {
  query: gql`
    query GetUser($email: String) {
      getUser(email: $email) {
        id
        firstName
      }
    }
  `,
};

// all animations query
export const AllAnimations = {
  query: gql`
    query getAllAnimations {
      getAllAnimations {
        id
        title
        createdAt
        fileUrl
        user {
          firstName
        }
      }
    }
  `,
};

// user animations
export const UserAnimations = {
  query: gql`
    query getAnimationByUserId($userId: ID) {
      getAnimationByUserId(userId: $userId) {
        title
        id
        fileUrl
        createdAt
        user {
          firstName
        }
      }
    }
  `,
};

// saech animation with tags
export const SearchAnimations = {
  query: gql`
    query GetAnimationByTag($tag: String) {
      getAnimationByTag(tag: $tag) {
        title
        id
        createdAt
        fileUrl
        user {
          firstName
        }
      }
    }
  `,
};

export const AnimationById = {
  query: gql`
    query getAnimationById($id: ID) {
      getAnimationById(id: $id) {
        title
        id
        fileUrl
        createdAt
        user {
          firstName
        }
        tags {
          name
        }
      }
    }
  `,
};
