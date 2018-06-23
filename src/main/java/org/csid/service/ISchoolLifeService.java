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

    /**
     * Upload a file for student according to accountCode
     * @param file
     * @param accountCode
     */
    void store(MultipartFile file, Long accountCode) throws Exception;

    /**
     * Returns a list of all Files uploaded
     * @param accountCode
     * @return list of entities
     * @throws Exception
     */
    List<DocumentDTO> getAllFiles(final Long accountCode) throws Exception;

    /**
     * Returns a Map which contains type of file and the file
     * @param idDocument
     * @return Map<String,File>
     */
    Map<String,File> getFile(final Long idDocument) throws Exception;

    /**
     * Delete File and return true if it's deleting
     * @param idDocument
     * @return Boolean
     * @throws Exception
     */
    Boolean deleteFile(final Long idDocument) throws Exception;

}
