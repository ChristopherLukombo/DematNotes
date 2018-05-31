package org.csid.service.mapper;

import org.csid.domain.*;
import org.csid.service.dto.SchoolReportDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SchoolReport and its DTO SchoolReportDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SchoolReportMapper extends EntityMapper<SchoolReportDTO, SchoolReport> {


    @Mapping(target = "evaluations", ignore = true)
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
