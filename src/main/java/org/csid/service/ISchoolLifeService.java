package org.csid.service;

import org.csid.service.dto.AbsenceDTO;
import org.csid.service.dto.DelayStudentDTO;
import org.csid.service.dto.DocumentDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.Map;

@Service
public interface ISchoolLifeService {

    List<AbsenceDTO> getAbsencesByStudent(final Long idStudent);

    List<DelayStudentDTO> getDelayStudentsByStudent(final Long idStudent);

    void store(MultipartFile file, Long idStudent);

    List<DocumentDTO> getAllFiles(final Long idStudent);

    Map<String,File> getFile(final Long idDocument);

    Boolean deleteFile(final Long idDocument);

}
