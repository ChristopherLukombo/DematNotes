package org.csid.repository;

import org.csid.domain.SchoolReport;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SchoolReport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SchoolReportRepository extends JpaRepository<SchoolReport, Long> {

    @Query(value = "select * from school_report inner join year_period on school_report.year_period_id=year_period.id where student_id=:idStudent order by creation_date desc,end_date desc,school_report.id desc  limit 1;", nativeQuery = true)
    SchoolReport getSchoolReportByStudentWhereYearPeriodMax(@Param("idStudent") Long idStudent);
}
