export interface Absence {
  push(absence: Absence): unknown;

  validity: boolean;

}
