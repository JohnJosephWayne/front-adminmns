import {StudentModel} from "./studentModel";

export interface AbsenceModel {
  id: number|null;
  validity: boolean|null;
  creationDate: string;
  start: string;
  end: string;
  studentAbsence: StudentModel;
}
