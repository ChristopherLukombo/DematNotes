package org.csid.service.mapper;

import org.csid.domain.*;
import org.csid.service.dto.SchoolReportDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SchoolReport and its DTO SchoolReportDTO.
 */
@Mapper(componentModel = "spring", uses = {YearPeriodMapper.class, StudentMapper.class, ManagerMapper.class})
public interface SchoolReportMapper extends EntityMapper<SchoolReportDTO, SchoolReport> {

    @Mapping(source = "yearPeriod.id", target = "yearPeriodId")
    @Mapping(source = "student.id", target = "studentId")
    @Mapping(source = "manager.id", target = "managerId")
    SchoolReportDTO toDto(SchoolReport schoolReport);

    @Mapping(target = "evaluations", ignore = true)
    @Mapping(source = "yearPeriodId", target = "yearPeriod")
    @Mapping(source = "studentId", target = "student")
    @Mapping(source = "managerId", target = "manager")
    SchoolReport toEntity(SchoolReportDTO schoolReportDTO);

    default SchoolReport fromId(Long id) {
        if (id == null) {
            return null;
        }
        SchoolReport schoolReport = new SchoolReport();
        schoolReport.setId(id);
        return schoolReport;
    }
}
