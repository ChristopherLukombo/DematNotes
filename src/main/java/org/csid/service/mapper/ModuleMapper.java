package org.csid.service.mapper;

import org.csid.domain.*;
import org.csid.service.dto.ModuleDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Module and its DTO ModuleDTO.
 */
@Mapper(componentModel = "spring", uses = {CourseMapper.class, SchoolMapper.class})
public interface ModuleMapper extends EntityMapper<ModuleDTO, Module> {

    @Mapping(source = "course.id", target = "courseId")
    @Mapping(source = "school.id", target = "schoolId")
    ModuleDTO toDto(Module module);

    @Mapping(source = "courseId", target = "course")
    @Mapping(source = "schoolId", target = "school")
    Module toEntity(ModuleDTO moduleDTO);

    default Module fromId(Long id) {
        if (id == null) {
            return null;
        }
        Module module = new Module();
        module.setId(id);
        return module;
    }
}
