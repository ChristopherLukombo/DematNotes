package org.csid.repository;

import org.csid.domain.YearPeriod;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the YearPeriod entity.
 */
@SuppressWarnings("unused")
@Repository
public interface YearPeriodRepository extends JpaRepository<YearPeriod, Long> {

}
