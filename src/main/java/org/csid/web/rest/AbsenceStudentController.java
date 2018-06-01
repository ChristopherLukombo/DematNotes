package org.csid.web.rest;

import java.util.List;

import org.csid.service.IAbsenceStudentService;
import org.csid.service.dto.AbsenceDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AbsenceStudentController {
	@Autowired
	private IAbsenceStudentService absenceStudentService;
	
	@RequestMapping(value = "/absencesStudent/{id}", method = RequestMethod.GET)
	public List<AbsenceDTO> getAbsencesByStudent(@PathVariable final Long id) {
		return absenceStudentService.getAbsencesByStudent(id);
	}
}
