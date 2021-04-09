export const demoWorkspaceDb = {
  workspace: {
    id: "9VxN5dbt8",
    name: "My Workspace",
    createdAt: 1591508732865,
    updatedAt: 1591508732865
  },
  collections: [
    {
      id: "j7mzSbVcb",
      workspaceId: "9VxN5dbt8",
      name: "People",
      description: "",
      props: [
        {
          id: "f1",
          type: "line",
          label: "Firstname"
        },
        {
          id: "f2",
          type: "line",
          label: "Lastname"
        },
        {
          id: "f3",
          type: "line",
          label: "Phone number"
        },
      ],
      titleProp: "f1",
      defaultView: "Ui1VO-haWv",
      createdAt: 1591546431900,
      updatedAt: 1591546431900
    }
  ],
  views: [
    {
      id: "Ui1VO-haWv",
      collectionId: "j7mzSbVcb",
      name: "",
      type: "list",
      props: ["f1", "f2", "f3"],
      options: {
        groupBy: null
      },
      createdAt: 1591546431899,
      updatedAt: 1591546431899
    },
  ],
  items: [
    {
      id: "CXJCQ_X6S",
      collectionId: "j7mzSbVcb",
      props: {
        f1: "SomeRandomName",
        f2: "SomeRandomSurname",
        f3: "0123456789"
      },
      createdAt: 1602788444644,
      updatedAt: 1602795923972
    },
    {
      id: "CXJCQ_X78",
      collectionId: "j7mzSbVcb",
      props: {
        f1: "jfggptpy6",
        f2: "SomeRandomSurname",
        f3: "0123456789"
      },
      createdAt: 1602788444644,
      updatedAt: 1602795923972
    },
  ]
};
