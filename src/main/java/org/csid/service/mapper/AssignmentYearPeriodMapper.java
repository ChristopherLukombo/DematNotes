package org.csid.service.mapper;

import org.csid.domain.*;
import org.csid.service.dto.AssignmentYearPeriodDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity AssignmentYearPeriod and its DTO AssignmentYearPeriodDTO.
 */
@Mapper(componentModel = "spring", uses = {SchoolMapper.class, YearPeriodMapper.class, ClassroomMapper.class})
public interface AssignmentYearPeriodMapper extends EntityMapper<AssignmentYearPeriodDTO, AssignmentYearPeriod> {

    @Mapping(source = "school.id", target = "schoolId")
    AssignmentYearPeriodDTO toDto(AssignmentYearPeriod assignmentYearPeriod);

    @Mapping(source = "schoolId", target = "school")
    AssignmentYearPeriod toEntity(AssignmentYearPeriodDTO assignmentYearPeriodDTO);

    default AssignmentYearPeriod fromId(Long id) {
        if (id == null) {
            return null;
        }
        AssignmentYearPeriod assignmentYearPeriod = new AssignmentYearPeriod();
        assignmentYearPeriod.setId(id);
        return assignmentYearPeriod;
    }
}
