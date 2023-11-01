export const postData = {
  id: 8,

  heading:
    "Solio amicitia tempore praesentium defungo coniuratio decimus vulgo urbs averto.",

  content:
    "Cupiditate sto saepe cresco caries anser comprehendo dolorem textus labore. Totus alias cicuta thymum arto damno arma textor. Vero apostolus antea vomica aer.",

  authorId: 8,

  createdAt: "2023-01-24T06:32:43.284Z",

  updatedAt: "2023-11-01T18:22:58.901Z",

  isEdited: false,

  viewCount: 2,

  image: "https://loremflickr.com/640/480/nature?lock=180664846516224",

  groupId: null,

  author: {
    id: 8,

    clerkId: "70494683-e704-4725-8468-1369fb82fe6b",

    name: "Malika.Zemlak58",

    username: "Rafael_Collier",

    email: "Shane.McGlynn1@gmail.com",

    password: "3shX91JIgFHkG91",

    role: "USER",

    bio: "Videlicet sodalitas ustilo confugo civis.",

    picture: "https://avatars.githubusercontent.com/u/47617693",

    location: "Florida",

    createdAt: "2023-06-26T01:35:49.215Z",

    updatedAt: "2023-11-01T13:27:20.735Z",
  },

  comments: [
    {
      id: 25,

      content:
        "Utroque caterva utique circumvenio supra cotidie arma tener adiuvo vestigium.",

      authorId: 8,

      postId: 8,

      parentId: null,

      createdAt: "2023-04-22T02:25:19.155Z",

      updatedAt: "2023-11-01T14:50:21.593Z",

      isEdited: true,

      author: {
        id: 8,

        clerkId: "70494683-e704-4725-8468-1369fb82fe6b",

        name: "Malika.Zemlak58",

        username: "Rafael_Collier",

        email: "Shane.McGlynn1@gmail.com",

        password: "3shX91JIgFHkG91",

        role: "USER",

        bio: "Videlicet sodalitas ustilo confugo civis.",

        picture: "https://avatars.githubusercontent.com/u/47617693",

        location: "Florida",

        createdAt: "2023-06-26T01:35:49.215Z",

        updatedAt: "2023-11-01T13:27:20.735Z",
      },

      likes: [
        {
          id: 23,

          userId: 8,

          postId: null,

          commentId: 25,

          liked: false,
        },
      ],

      parent: null,

      replies: [
        {
          id: 28,

          content: "Suffragium ocer communis voluntarius.",

          authorId: 8,

          postId: 8,

          parentId: 25,

          createdAt: "2022-11-04T06:24:35.684Z",

          updatedAt: "2023-11-01T00:59:12.812Z",

          isEdited: false,
        },
      ],
    },

    {
      id: 28,

      content: "Suffragium ocer communis voluntarius.",

      authorId: 8,

      postId: 8,

      parentId: 25,

      createdAt: "2022-11-04T06:24:35.684Z",

      updatedAt: "2023-11-01T00:59:12.812Z",

      isEdited: false,

      author: {
        id: 8,

        clerkId: "70494683-e704-4725-8468-1369fb82fe6b",

        name: "Malika.Zemlak58",

        username: "Rafael_Collier",

        email: "Shane.McGlynn1@gmail.com",

        password: "3shX91JIgFHkG91",

        role: "USER",

        bio: "Videlicet sodalitas ustilo confugo civis.",

        picture: "https://avatars.githubusercontent.com/u/47617693",

        location: "Florida",

        createdAt: "2023-06-26T01:35:49.215Z",

        updatedAt: "2023-11-01T13:27:20.735Z",
      },

      likes: [
        {
          id: 26,

          userId: 8,

          postId: null,

          commentId: 28,

          liked: true,
        },
      ],

      parent: {
        id: 25,

        content:
          "Utroque caterva utique circumvenio supra cotidie arma tener adiuvo vestigium.",

        authorId: 8,

        postId: 8,

        parentId: null,

        createdAt: "2023-04-22T02:25:19.155Z",

        updatedAt: "2023-11-01T14:50:21.593Z",

        isEdited: true,
      },

      replies: [],
    },
  ],

  likes: [],

  group: null,

  tags: [
    {
      id: 17,

      postId: 8,

      tagId: 1,

      tag: { id: 1, name: "dev" },
    },
  ],
};
