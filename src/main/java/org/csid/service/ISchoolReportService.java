package org.csid.service;

import org.csid.domain.Evaluation;
import org.csid.domain.Manager;
import org.csid.domain.User;
import org.csid.service.dto.*;
import org.springframework.stereotype.Service;

import java.io.File;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Service
public interface ISchoolReportService {

    /**
     * Generate School Report in pdf and returns it
     * @return File : School Report Generated
     */
    File generateSchoolReport(final Long accountCode) throws Exception;

    /**
     * Returns schools for a manager according to accountCode
     * @param accountCode
     * @return list of entities
     */
    List<SchoolDTO> getSchoolsByManager(Long accountCode) throws Exception;

    /**
     * Returns classrooms for a manager according to accountCode
     * @param accountCode
     * @param idSchool
     * @return list of entities
     */
    List<ClassroomDTO> getClassroomsByManager(Long accountCode, Long idSchool) throws Exception;

    /**
     * Returns students for a manager according to accountCode
     * @param accountCode
     * @param idSchool
     * @param idClassroom
     * @return list of entities
     */
    List<UserDTO> getStudentsByManager(Long accountCode, Long idSchool, Long idClassroom) throws Exception;

    /**
     * Returns student for a manager according to accountCode
     * @param accountCode
     * @return entity
     */
    UserDTO getStudentByManager(Long accountCode) throws Exception;

    /**
     * Saves a schoolReport
     * @param schoolReportDTO
     * @return entity
     */
    SchoolReportDTO saveSchoolReport(SchoolReportDTO schoolReportDTO) throws Exception;

    /**
     * Returns evaluations of a Student
     * @param accountCode
     * @return list of entities
     */
    Set<EvaluationDTO> getEvaluationsByStudent(final Long accountCode);

    /**
     * Returns manager according of User
     * @param userDTO
     * @return ManagerDTO
     */
    ManagerDTO findByUser(UserDTO userDTO) throws Exception;

}
