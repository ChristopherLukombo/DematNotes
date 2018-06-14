package org.csid.service;

import org.csid.service.dto.AbsenceDTO;
import org.csid.service.dto.DelayStudentDTO;
import org.csid.service.dto.DocumentDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface ISchoolLifeService {

    List<AbsenceDTO> getAbsencesByStudent(final Long idStudent);

    List<DelayStudentDTO> getDelayStudentsByStudent(final Long idStudent);

    void store(MultipartFile file, Long idStudent);

    List<DocumentDTO> getAllFiles(final Long idStudent);

}
