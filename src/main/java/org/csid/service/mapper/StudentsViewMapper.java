package org.csid.service.mapper;

import org.csid.domain.non.persistant.StudentsView;
import org.csid.service.dto.StudentsList;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface StudentsViewMapper {

    StudentsList mapToDTO(StudentsView studentsView);
}
