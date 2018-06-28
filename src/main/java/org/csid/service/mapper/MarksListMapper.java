package org.csid.service.mapper;

import org.csid.service.dto.MarksListDTO;
import org.csid.domain.non.persistant.MarksList;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MarksListMapper {

    MarksListDTO mapToDTO(MarksList marksList);

    MarksList mapToEntity(MarksListDTO marksListDTO);

}
