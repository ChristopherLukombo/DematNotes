package org.csid.repository;

import org.csid.domain.DelayStudent;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.time.ZonedDateTime;
import java.util.List;

/**
 * Spring Data JPA repository for the DelayStudent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DelayStudentRepository extends JpaRepository<DelayStudent, Long> {
    @Query("select distinct delay_student from DelayStudent delay_student left join fetch delay_student.students")
    List<DelayStudent> findAllWithEagerRelationships();

    @Query("select delay_student from DelayStudent delay_student left join fetch delay_student.students where delay_student.id =:id")
    DelayStudent findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select delayStudent from DelayStudent delayStudent left join fetch delayStudent.students where delayStudent.startDate>=:startZoneDateTime and delayStudent.endDate<=:endZoneDateTime")
    List<DelayStudent> findAllAbsencesByPeriod(@Param("startZoneDateTime") ZonedDateTime startZoneDateTime, @Param("endZoneDateTime") ZonedDateTime endZoneDateTime);

}
