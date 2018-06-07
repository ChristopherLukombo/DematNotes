package org.csid.repository;

import java.time.ZonedDateTime;
import java.util.List;

import org.csid.domain.Intervention;
import org.csid.domain.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data JPA repository for the Intervention entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InterventionRepository extends JpaRepository<Intervention, Long> {
	
	public List<Intervention> findAllByTeacher(Teacher teacher);
	
	@Query("select intervention from Intervention intervention where intervention.startDate>= :dateBefore")
	public List<Intervention> findInterventionByPeriod(@Param("dateBefore") ZonedDateTime z);
}
