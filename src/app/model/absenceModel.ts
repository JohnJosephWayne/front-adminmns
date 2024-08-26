import {StudentModel} from "./studentModel";

export interface AbsenceModel {
  id: number|null;
  validity: boolean|null;
  creationDate: string;
  start: string;
  end: string;
  studentAbsence: StudentModel;
  absenceCause: AbsenceCause;
}

export interface AbsenceCause {
  id: number | null | undefined;
  name: String | undefined;
}
