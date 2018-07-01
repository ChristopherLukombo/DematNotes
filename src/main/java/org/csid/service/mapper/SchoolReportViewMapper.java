package org.csid.service.mapper;

import org.csid.domain.non.persistant.SchoolReportView;
import org.csid.service.dto.ModulesList;
import org.csid.service.dto.SchoolReportList;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

/**
 * Mapper for the entity SchoolReportView its DTO SchoolReportList.
 */
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SchoolReportViewMapper {

    SchoolReportList mapToDTO(SchoolReportView schoolReportView);
}

