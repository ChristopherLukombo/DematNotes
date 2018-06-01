package org.csid.web.rest;

import java.util.List;

import org.csid.service.IStudentService;
import org.csid.service.dto.UserDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class StudentController {
	@Autowired
	private IStudentService studentService;

	private final Logger log = LoggerFactory.getLogger(InscriptionModuleResource.class);

	@RequestMapping(value = "/students/classroom/{idschool}/{idClassroom}/{idSchoolYear}", method = RequestMethod.GET)
	public List<UserDTO> findStudentByClassroom(@PathVariable final Long idschool, @PathVariable final Long idClassroom, @PathVariable final Long idSchoolYear) {
		log.info("info");
		return this.studentService.findStudentByClassroom(idschool, idClassroom, idSchoolYear);
	}
}
