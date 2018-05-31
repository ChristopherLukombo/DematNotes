package org.csid.repository;

import org.csid.domain.DelayStudent;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the DelayStudent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DelayStudentRepository extends JpaRepository<DelayStudent, Long> {

}
