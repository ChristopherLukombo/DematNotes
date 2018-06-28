package org.csid.service.mapper;

import org.csid.service.dto.ResultsDTO;
import org.csid.domain.non.persistant.Results;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ResultsMapper {

    @Mapping(target = "user", source = "user")
    @Mapping(target = "evaluations", source = "evaluations")
    ResultsDTO mapToDTO(Results results);

}
