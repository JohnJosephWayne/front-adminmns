interface userRole {
  name: string;
}

export class User {

  id: number | undefined;
  email: string | undefined;
  lastname: string | undefined;
  firstname: string | undefined;
  role: userRole | undefined;
}
