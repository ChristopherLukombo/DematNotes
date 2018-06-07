package org.csid.repository;

import java.util.List;

import org.csid.domain.Evaluation;
import org.csid.domain.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data JPA repository for the Evaluation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {

	public List<Evaluation> findAllByStudent(Student s);
	
}
