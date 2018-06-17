package org.csid.repository;

import org.csid.domain.Absence;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.time.ZonedDateTime;
import java.util.List;

/**
 * Spring Data JPA repository for the Absence entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AbsenceRepository extends JpaRepository<Absence, Long> {
    @Query("select distinct absence from Absence absence left join fetch absence.students")
    List<Absence> findAllWithEagerRelationships();

    @Query("select absence from Absence absence left join fetch absence.students where absence.id =:id")
    Absence findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select absence from Absence absence left join fetch absence.students where absence.startDate>=:startZoneDateTime and absence.startDate<=:endZoneDateTime")
    List<Absence> findAllAbsencesByPeriod(@Param("startZoneDateTime") ZonedDateTime startZoneDateTime, @Param("endZoneDateTime") ZonedDateTime endZoneDateTime);

}
