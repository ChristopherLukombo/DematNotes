package org.csid.repository;

import org.csid.domain.SchoolReport;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SchoolReport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SchoolReportRepository extends JpaRepository<SchoolReport, Long> {

}
