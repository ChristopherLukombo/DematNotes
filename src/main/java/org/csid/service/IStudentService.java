package org.csid.service;

import java.util.List;

import org.csid.service.dto.ClassroomDTO;
import org.csid.service.dto.UserDTO;
import org.springframework.stereotype.Service;

@Service
public interface IStudentService {
	
	public List<UserDTO> findStudentByClassroom(final Long idSchool, final Long idClassroom, final Long idSchoolYear) ;
	
	public List<ClassroomDTO> findClassroomForTeacher(final Long idTeacher, final Long idSchool);
	
}
