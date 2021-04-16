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
      properties: [
        {
          id: "f1",
          type: "line",
          name: "Firstname"
        },
        {
          id: "f2",
          type: "line",
          name: "Lastname"
        },
        {
          id: "f3",
          type: "line",
          name: "Phone number"
        },
      ],
      titleProperty: "f1",
      defaultView: "Ui1VO-haWv",
      createdAt: 1591546431900,
      updatedAt: 1591546431900
    }
  ],
  views: [
    {
      id: "Ui1VO-haWv",
      collectionId: "j7mzSbVcb",
      name: "List",
      type: "list",
      properties: ["f1", "f2", "f3"],
      options: {
        groupBy: null
      },
      createdAt: 1591546431899,
      updatedAt: 1591546431899
    },
    {
      id: "Ui1VO-haWv",
      collectionId: "j7mzSbVcb",
      name: "List 2",
      type: "list",
      properties: ["f1", "f2", "f3"],
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
      properties: {
        f1: "SomeName",
        f2: "SomeSurname",
        f3: "0123456789"
      },
      createdAt: 1602788444644,
      updatedAt: 1602795923972
    },
    {
      id: "CXJCQ_X78",
      collectionId: "j7mzSbVcb",
      properties: {
        f1: "John",
        f2: "Doe",
        f3: "879944648"
      },
      createdAt: 1602788444644,
      updatedAt: 1602795923972
    },
  ]
};
