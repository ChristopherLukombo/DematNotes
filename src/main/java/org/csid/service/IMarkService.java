package org.csid.service;

import org.csid.service.dto.*;
import org.csid.domain.non.persistant.ChartData;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IMarkService {

    /**
     * Returns schools by idUser
     * @param idUser
     * @return list of schools
     */
    List<SchoolDTO> getSchoolsByCurrentTeacher(final Long idUser) throws Exception;

    /**
     * Returns classrooms for Teacher
     * @param idUser
     * @param idSchool
     * @return list of entities
     */
    List<ClassroomDTO> getClassroomsByCurrentTeacher(final Long idUser, final Long idSchool) throws Exception;

    /**
     * Returns the students according to the teacher
     * @param userId
     * @param schoolId
     * @param classroomId
     * @return StudentsList
     * @throws Exception
     */
    StudentsList getStudentsByTeacher(final Long userId, final Long schoolId, final Long classroomId) throws Exception;

    /**
     * Returns students for teacher
     * @param idUser
     * @param idSchool
     * @param idClassroom
     * @return list of entities
     */
    List<UserDTO> getStudentsByCurrentTeacher(final Long idUser, final Long idSchool, Long idClassroom) throws Exception;

    /**
     * Returns student by idUser
     * @param idUser
     * @return entity
     */
    StudentDTO getStudentByIdUser(Long idUser) throws Exception;

    /**
     * @param idUser
     * @return list of entities
     */
    UserDTO getUserByIdUser(Long idUser) throws Exception;

    /**
     * Returns a list of chartdata
     * @param idSchool
     * @param idClassroom
     * @return list of entities
     */
    List<ChartData> getData(final Long idSchool, final Long idClassroom) throws Exception;

    /**
     * Returns Modules with coefficieny by teacher
     * @param userId
     * @param schoolId
     * @param classroomId
     * @return
     * @throws Exception
     */
    ModulesList getModules(final Long userId, final Long schoolId, final Long classroomId) throws Exception;

    /**
     * Saves evaluations by students
     * @param marksListDTO
     * @return Boolean
     */
    MarksListDTO saveEvaluations(MarksListDTO marksListDTO) throws Exception;

}
