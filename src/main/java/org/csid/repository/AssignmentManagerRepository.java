package org.csid.repository;

import org.csid.domain.AssignmentManager;
import org.csid.domain.AssignmentModule;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

/**
 * Spring Data JPA repository for the AssignmentManager entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AssignmentManagerRepository extends JpaRepository<AssignmentManager, Long> {
    @Query("select distinct assignment_manager from AssignmentManager assignment_manager left join fetch assignment_manager.managers")
    List<AssignmentManager> findAllWithEagerRelationships();

    @Query("select assignment_manager from AssignmentManager assignment_manager left join fetch assignment_manager.managers where assignment_manager.id =:id")
    AssignmentManager findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select assignment_manager from AssignmentManager assignment_manager left join fetch assignment_manager.managers where assignment_manager.schoolYear.startDate<=:date and assignment_manager.schoolYear.endDate>=:date")
    List<AssignmentManager> findAllByCurrentSchoolYear(@Param("date") LocalDate date);

}
