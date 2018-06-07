package org.csid.web.rest;

import java.util.List;

import org.csid.service.MarkService;
import org.csid.service.dto.ClassroomDTO;
import org.csid.service.dto.SchoolDTO;
import org.csid.service.dto.StudentDTO;
import org.csid.service.dto.UserDTO;
import org.csid.service.persistent.ChartData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MarkController {
	@Autowired
	private MarkService markService;

	@RequestMapping(value = "/marks/displaySchools/{idUser}", method = RequestMethod.GET)
	public List<SchoolDTO> getSchoolsByCurrentUserTeacher(@PathVariable final Long idUser) {
		return markService.getSchoolsByCurrentUserTeacher(idUser);
	}

	@RequestMapping(value = "/marks/displayClassrooms/{idUser}/{idSchool}", method = RequestMethod.GET)
	public List<ClassroomDTO> getClassroomsByCurrentUserTeacher(@PathVariable final Long idUser, @PathVariable final Long idSchool) {
		return markService.getClassroomsByCurrentUserTeacher(idUser, idSchool);
	}

	@RequestMapping(value = "/marks/displayStudents/{idUser}/{idSchool}/{idClassroom}", method = RequestMethod.GET)
	public List<UserDTO> getStudentsUserByCurrentUserTeacher(@PathVariable final Long idUser, @PathVariable final Long idSchool, @PathVariable final Long idClassroom) {
		return markService.getStudentsUserByCurrentUserTeacher(idUser, idSchool, idClassroom);
	}

	@RequestMapping(value = "/marks/getStudentUser/{idUser}", method = RequestMethod.GET)
	public StudentDTO getStudentByIdUser(@PathVariable final Long idUser) {
		return markService.getStudentByIdUser(idUser);
	}

	@RequestMapping(value = "/marks/getUser/{idUser}", method = RequestMethod.GET)
	public UserDTO getUserByIdUser(@PathVariable final Long idUser) {
		return markService.getUserByIdUser(idUser);
	}
	
	@RequestMapping(value = "/marks/getData/{idSchool}/{idClassroom}", method = RequestMethod.GET)
	public List<ChartData> getData(@PathVariable final Long idSchool, @PathVariable final Long idClassroom) {
		return markService.getData(idSchool, idClassroom);
	}
}
