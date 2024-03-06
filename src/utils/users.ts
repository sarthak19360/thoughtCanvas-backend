type User = {
  userId: number;
  userName: string;
  password: string;
};

let users: User[] = [
  {
    userId: 1,
    userName: "Sarthak",
    password: "sarry123",
  },
  {
    userId: 2,
    userName: "Hritik",
    password: "hriti123",
  },
];

export { User };
export default users;
