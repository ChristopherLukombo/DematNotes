package org.csid.service.mapper;

import org.csid.domain.*;
import org.csid.service.dto.SchoolYearDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SchoolYear and its DTO SchoolYearDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SchoolYearMapper extends EntityMapper<SchoolYearDTO, SchoolYear> {



    default SchoolYear fromId(Long id) {
        if (id == null) {
            return null;
        }
        SchoolYear schoolYear = new SchoolYear();
        schoolYear.setId(id);
        return schoolYear;
    }
}
