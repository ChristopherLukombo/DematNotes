package org.csid.service;

import org.csid.domain.*;
import org.csid.service.dto.*;
import org.springframework.stereotype.Service;

import java.io.File;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Set;

@Service
public interface ISchoolReportService {

    /**
     * Generate School Report in pdf and returns it
     * @return File : School Report Generated
     */
    byte[] generateSchoolReport(final Long accountCode) throws Exception;

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

    /**
     * Returns average total for a student
     * @param accountCode
     * @return String
     */
    double getAverageFromEvaluation(final Long accountCode);

    /**
     * Find yearPeriod for a schoolReport
     * @param periodDate
     * @param school
     * @param classroom
     * @return YearPeriod
     */
    YearPeriod findYearPeriodForSchoolReport(LocalDate periodDate, School school, Classroom classroom);

    /**
     * Returns average for evaluation according a yearPeriod
     * @param accountCode
     * @param start
     * @param end
     * @return
     */
    double getAverageFromEvaluationByStudentAndPeriod(final Long accountCode, ZonedDateTime start, ZonedDateTime end) throws Exception;

    /**
     * Returns SchoolReportList for a student
     * @param accountCode
     * @return entity
     */
    SchoolReportList getSchoolReportsByStudent(Long accountCode);
}
