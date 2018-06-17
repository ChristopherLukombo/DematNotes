package org.csid.repository;

import org.csid.domain.AssignmentModule;
import org.csid.domain.SchoolYear;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

/**
 * Spring Data JPA repository for the AssignmentModule entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AssignmentModuleRepository extends JpaRepository<AssignmentModule, Long> {
    @Query("select distinct assignment_module from AssignmentModule assignment_module left join fetch assignment_module.teachers left join fetch assignment_module.modules")
    List<AssignmentModule> findAllWithEagerRelationships();

    @Query("select assignment_module from AssignmentModule assignment_module left join fetch assignment_module.teachers left join fetch assignment_module.modules where assignment_module.id =:id")
    AssignmentModule findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select assignment_module from AssignmentModule assignment_module left join fetch assignment_module.teachers left join fetch assignment_module.modules where assignment_module.schoolYear.startDate<=:date and assignment_module.schoolYear.endDate>=:date")
    List<AssignmentModule> findAllByCurrentSchoolYear(@Param("date") LocalDate date);

}
