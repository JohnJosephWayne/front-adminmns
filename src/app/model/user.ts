interface userRole {
  name: string;
}

export class User {

  email: string | undefined;
  lastname: string | undefined;
  firstname: string | undefined;
  role: userRole | undefined;
}
