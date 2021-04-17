const hello = {
  id: 123,
  name: "folder1",
  subfolder: [
    {
      id: 2,
      name: "folder2",
    },
    {
      id: 3,
      name: "folder3",
    },
  ],
  files: [
    {
      id: 101,
      name: File1.txt,
    },
    {
      id: 102,
      name: File2.xml,
    },
  ],
};

const kkk = {
  id: 123,
  name: Folder1,
  subfolders: [
    {
      id: 2,
      name: Folder2,
    },
    {
      id: 2,
      name: Folder2,
    },
  ],
  files: [
    {
      id: 101,
      name: File1.txt,
    },
    {
      id: 102,
      name: File2.xml,
    },
  ],
};

const data = {
  id: "root",
  name: "Parent",
  children: [
    {
      id: "1",
      name: "Folder 1",
      type: "folder",
    },
    {
      id: "2",
      name: "Folder 2",
      type: "folder",
      children: [
        {
          id: "3",
          name: "File.txt",
          type: "file",
        },
      ],
    },
  ],
};
