package org.csid.service.mapper;

import org.csid.domain.*;
import org.csid.service.dto.AssignmentManagerDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity AssignmentManager and its DTO AssignmentManagerDTO.
 */
@Mapper(componentModel = "spring", uses = {SchoolYearMapper.class, SchoolMapper.class, ManagerMapper.class})
public interface AssignmentManagerMapper extends EntityMapper<AssignmentManagerDTO, AssignmentManager> {

    @Mapping(source = "schoolYear.id", target = "schoolYearId")
    @Mapping(source = "school.id", target = "schoolId")
    AssignmentManagerDTO toDto(AssignmentManager assignmentManager);

    @Mapping(source = "schoolYearId", target = "schoolYear")
    @Mapping(source = "schoolId", target = "school")
    AssignmentManager toEntity(AssignmentManagerDTO assignmentManagerDTO);

    default AssignmentManager fromId(Long id) {
        if (id == null) {
            return null;
        }
        AssignmentManager assignmentManager = new AssignmentManager();
        assignmentManager.setId(id);
        return assignmentManager;
    }
}
