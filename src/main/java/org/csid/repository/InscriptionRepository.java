package org.csid.repository;

import org.csid.domain.Inscription;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

/**
 * Spring Data JPA repository for the Inscription entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InscriptionRepository extends JpaRepository<Inscription, Long> {
    @Query("select distinct inscription from Inscription inscription left join fetch inscription.students")
    List<Inscription> findAllWithEagerRelationships();

    @Query("select inscription from Inscription inscription left join fetch inscription.students where inscription.id =:id")
    Inscription findOneWithEagerRelationships(@Param("id") Long id);

    // TODO  and assignment_module.schoolYear.endDate<=:date
    @Query("select inscription from Inscription inscription left join fetch inscription.students where inscription.schoolYear.startDate<=:date and inscription.schoolYear.endDate<=:date")
    List<Inscription> findAllByCurrentSchoolYear(@Param("date") LocalDate date);

}
