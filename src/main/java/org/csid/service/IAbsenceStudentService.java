package org.csid.service;

import java.util.List;

import org.csid.service.dto.AbsenceDTO;
import org.springframework.stereotype.Service;
@Service
public interface IAbsenceStudentService {

	/**
	 * Return Absences for idStudent
	 * @param idStudent to search
	 * @return the list of entities
	 */
	public List<AbsenceDTO> getAbsencesByStudent(final Long idStudent);
}
