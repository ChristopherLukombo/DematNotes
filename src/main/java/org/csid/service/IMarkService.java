package org.csid.service;

import org.csid.service.dto.*;
import org.csid.service.non.persistent.ChartData;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IMarkService {

    /**
     * Return schools by idUser
     * @param idUser
     * @return list of schools
     */
    List<SchoolDTO> getSchoolsByCurrentTeacher(final Long idUser);

    List<ClassroomDTO> getClassroomsByCurrentTeacher(final Long idUser, final Long idSchool);

    List<UserDTO> getStudentsByCurrentTeacher(final Long idUser, final Long idSchool, Long idClassroom);

    StudentDTO getStudentByIdUser(Long idUser);

    UserDTO getUserByIdUser(Long idUser);

    List<ChartData> getData(final Long idSchool, final Long idClassroom);

    List<ModuleDTO> getModules(final Long idUser);

}
