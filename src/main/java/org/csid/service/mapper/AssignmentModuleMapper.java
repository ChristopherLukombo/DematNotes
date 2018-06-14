package org.csid.service.mapper;

import org.csid.domain.*;
import org.csid.service.dto.AssignmentModuleDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity AssignmentModule and its DTO AssignmentModuleDTO.
 */
@Mapper(componentModel = "spring", uses = {ClassroomMapper.class, SchoolMapper.class, SchoolYearMapper.class, TeacherMapper.class, ModuleMapper.class})
public interface AssignmentModuleMapper extends EntityMapper<AssignmentModuleDTO, AssignmentModule> {

    @Mapping(source = "classroom.id", target = "classroomId")
    @Mapping(source = "school.id", target = "schoolId")
    @Mapping(source = "schoolYear.id", target = "schoolYearId")
    AssignmentModuleDTO toDto(AssignmentModule assignmentModule);

    @Mapping(source = "classroomId", target = "classroom")
    @Mapping(source = "schoolId", target = "school")
    @Mapping(source = "schoolYearId", target = "schoolYear")
    AssignmentModule toEntity(AssignmentModuleDTO assignmentModuleDTO);

    default AssignmentModule fromId(Long id) {
        if (id == null) {
            return null;
        }
        AssignmentModule assignmentModule = new AssignmentModule();
        assignmentModule.setId(id);
        return assignmentModule;
    }
}
