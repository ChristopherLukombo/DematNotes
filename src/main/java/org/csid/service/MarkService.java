package org.csid.service;

import java.util.List;

import org.csid.service.dto.ClassroomDTO;
import org.csid.service.dto.SchoolDTO;
import org.csid.service.dto.StudentDTO;
import org.csid.service.dto.UserDTO;
import org.csid.service.persistent.ChartData;
import org.springframework.stereotype.Service;

@Service
public interface MarkService {

	/**
	 * Return schools by idUser
	 * @param idUser 
	 * @return list of schools
	 */
	public List<SchoolDTO> getSchoolsByCurrentUserTeacher(final Long idUser);

	public List<ClassroomDTO> getClassroomsByCurrentUserTeacher(final Long idUser, final Long idSchool);
	
	public List<UserDTO> getStudentsUserByCurrentUserTeacher(final Long idUser, final Long idSchool, Long idClassroom); 
	
	public StudentDTO getStudentByIdUser(Long idUser);

	public UserDTO getUserByIdUser(Long idUser);
	
	public List<ChartData> getData(final Long idSchool, final Long idClassroom);
	
}
