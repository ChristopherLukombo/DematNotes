package org.csid.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.csid.domain.Absence;
import org.csid.domain.Student;
import org.csid.repository.AbsenceRepository;
import org.csid.repository.StudentRepository;
import org.csid.service.IAbsenceStudentService;
import org.csid.service.dto.AbsenceDTO;
import org.csid.service.mapper.AbsenceMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("IAbsenceStudentService")
@Transactional
public class AbsenceStudentServiceImpl implements IAbsenceStudentService {
	@Autowired
	private AbsenceRepository  absenceRepository;
	
	@Autowired
	private AbsenceMapper absenceMapper;
	
	@Autowired
	private StudentRepository studentRepository; 
	
	/**
	 * Return Absences for idStudent
	 * @param idStudent to search
	 * @return the list of entities
	 */
	@Override
	public List<AbsenceDTO> getAbsencesByStudent(final Long idStudent) {
		final Student s = studentRepository.findOne(idStudent);
		final List<Absence> absences = absenceRepository.findAllByStudent(s);
		
		return absences.stream().map(a -> absenceMapper.toDto(a)).collect(Collectors.toList());
	}
}
