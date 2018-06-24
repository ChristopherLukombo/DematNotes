package org.csid.repository;

import org.csid.domain.AssignmentYearPeriod;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the AssignmentYearPeriod entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AssignmentYearPeriodRepository extends JpaRepository<AssignmentYearPeriod, Long> {
    @Query("select distinct assignment_year_period from AssignmentYearPeriod assignment_year_period left join fetch assignment_year_period.yearPeriods left join fetch assignment_year_period.classrooms")
    List<AssignmentYearPeriod> findAllWithEagerRelationships();

    @Query("select assignment_year_period from AssignmentYearPeriod assignment_year_period left join fetch assignment_year_period.yearPeriods left join fetch assignment_year_period.classrooms where assignment_year_period.id =:id")
    AssignmentYearPeriod findOneWithEagerRelationships(@Param("id") Long id);

}
