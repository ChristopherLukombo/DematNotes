package org.csid.repository;

import java.util.List;

import org.csid.domain.Absence;
import org.csid.domain.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data JPA repository for the Absence entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AbsenceRepository extends JpaRepository<Absence, Long> {
	
	public List<Absence> findAllByStudent(Student student);
	
}
