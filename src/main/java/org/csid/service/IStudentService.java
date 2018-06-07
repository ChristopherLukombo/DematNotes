package org.csid.service;

import java.util.List;

import org.csid.service.dto.ClassroomDTO;
import org.springframework.stereotype.Service;

@Service
public interface IStudentService {
	
	public List<ClassroomDTO> findClassroomForTeacher(final Long idTeacher, final Long idSchool);
	
}
