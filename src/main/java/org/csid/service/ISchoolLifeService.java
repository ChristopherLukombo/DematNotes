package org.csid.service;

import org.csid.service.dto.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.Map;

@Service
public interface ISchoolLifeService {

    /**
     * Returns the absences of a student according to accountCode User
     * @param accountCode
     * @return the list of entities
     */
    List<AbsenceDTO> getAbsences(final Long accountCode) throws Exception;

    /**
     * Returns the delays of a student according to accountCode User
     * @param accountCode
     * @return the list of entities
     */
    List<DelayStudentDTO> getDelayStudents(final Long accountCode) throws Exception;

    /**
     * Returns the modules of a Teacher link to the classroom
     * @param accountCode
     * @param idClassroom
     * @return the list of entities
     */
    List<ModuleDTO> getModules(final Long accountCode, final Long idClassroom) throws Exception;

    /**
     * Saves Absences of students in a module according to accountCode User
     * @return Absence
     */
    AbsenceDTO saveAbsencesModules(AbsenceSearchDTO absenceSearchDTO) throws Exception;

    void store(MultipartFile file, Long idStudent);

    List<DocumentDTO> getAllFiles(final Long idStudent);

    Map<String,File> getFile(final Long idDocument);

    Boolean deleteFile(final Long idDocument);

}
