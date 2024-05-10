import { TestBed } from '@angular/core/testing';

import { StudentFolderServiceService } from './student-folder-service.service';

describe('StudentFolderServiceService', () => {
  let service: StudentFolderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentFolderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
